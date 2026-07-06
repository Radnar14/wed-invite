// ===============================================================
// GUESTLIST (REPRESENTATIVE → MEMBERS) CONFIGURATION
// ---------------------------------------------------------------
// A representative groups one or more members. Each row holds one
// person: the representative on the group's header row (column A),
// and each member on the rows beneath it (column C).
//
//   A: Representative | B: HC | C: Member | D: Status |
//   E: Confirmed At   | F: Update Count    | G: Email  | H: Message
//
// Status / Confirmed At are written next to EACH person's own row.
// Update Count / Email / Message live on the representative row only.
// ===============================================================
var GUESTLIST_SHEET = "GuestList";
var GL_COL_REP = 1; // A
var GL_COL_HC = 2; // B
var GL_COL_MEMBER = 3; // C
var GL_COL_STATUS = 4; // D
var GL_COL_CONFIRMED = 5; // E
var GL_COL_UPDATES = 6; // F (representative row only)
var GL_COL_EMAIL = 7; // G (representative row only)
var GL_COL_MESSAGE = 8; // H (representative row only)

// Allow one confirm + one update (2 submissions), then lock the group.
var GL_MAX_SUBMISSIONS = 2;

// Small helper so we stop repeating the ContentService boilerplate.
function jsonOut_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// Read the GuestList tab into an array of group objects. Each group
// keeps its representative + members along with the spreadsheet row
// of every person so we can write their status back later.
function readGuestListGroups_(glSheet) {
  if (!glSheet) {
    return [];
  }

  var values = glSheet.getDataRange().getValues();
  var groups = [];
  var current = null;

  for (var i = 1; i < values.length; i++) {
    var rep = String(values[i][GL_COL_REP - 1] || "").trim();
    var hc = values[i][GL_COL_HC - 1];
    var member = String(values[i][GL_COL_MEMBER - 1] || "").trim();
    var status = String(values[i][GL_COL_STATUS - 1] || "").trim();
    var rowIndex = i + 1;

    if (rep !== "") {
      // New group header row — the representative is also an attendee.
      current = {
        representative: rep,
        hc: Number(hc) || 1,
        repStatus: status,
        repRow: rowIndex,
        updateCount: Number(values[i][GL_COL_UPDATES - 1]) || 0,
        email: String(values[i][GL_COL_EMAIL - 1] || "").trim(),
        message: String(values[i][GL_COL_MESSAGE - 1] || "").trim(),
        members: []
      };
      groups.push(current);
    } else if (current && member !== "") {
      // Continuation row — a member belonging to the current group.
      current.members.push({
        name: member,
        status: status,
        row: rowIndex
      });
    }
  }

  return groups;
}

// Resolve a typed name to its group. Matches the representative first,
// then falls back to a member name so a member who searches themselves
// still lands on their representative's group.
function findGroupForName_(groups, name) {
  var lower = String(name || "").toLowerCase().trim();
  if (!lower) {
    return null;
  }

  for (var i = 0; i < groups.length; i++) {
    if (groups[i].representative.toLowerCase() === lower) {
      return groups[i];
    }
  }

  for (var j = 0; j < groups.length; j++) {
    for (var k = 0; k < groups[j].members.length; k++) {
      if (groups[j].members[k].name.toLowerCase() === lower) {
        return groups[j];
      }
    }
  }

  return null;
}

// Shape a group for the client: representative first, then members,
// each carrying their currently-saved status.
function buildGroupResponse_(group) {
  var attendees = [{
    name: group.representative,
    isRepresentative: true,
    status: group.repStatus
  }];

  for (var m = 0; m < group.members.length; m++) {
    attendees.push({
      name: group.members[m].name,
      isRepresentative: false,
      status: group.members[m].status
    });
  }

  return {
    representative: group.representative,
    hc: group.hc,
    email: group.email,
    message: group.message,
    attendees: attendees,
    locked: group.updateCount >= GL_MAX_SUBMISSIONS,
    hasRSVP: group.updateCount > 0
  };
}

// Email the hosts a summary of a group confirmation.
function sendGroupNotification_(group, attendees, submissionType, timestamp) {
  var notifyEmails = [
    "jmdonnu@gmail.com",
    "delacruzchezza@gmail.com"
  ];

  var formattedDate = Utilities.formatDate(
    timestamp,
    Session.getScriptTimeZone(),
    "MMMM dd, yyyy • hh:mm a"
  );

  var acceptCount = 0;
  var lines = attendees.map(function (person) {
    var attendance = String(person.attendance || "").trim();
    var accepted = attendance.toLowerCase() === "accept";
    if (accepted) {
      acceptCount++;
    }
    return (accepted ? "✅ " : "❌ ") +
      person.name +
      (person.isRepresentative ? " (Representative)" : "");
  }).join("\n");

  var body =
    "💍 WEDDING GROUP RSVP\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +

    "📌 Status\n" +
    submissionType + "\n\n" +

    "👤 Representative\n" +
    group.representative + "\n\n" +

    "👥 Attending\n" +
    acceptCount + " of " + group.hc + "\n\n" +

    "📝 Members\n" +
    lines + "\n\n" +

    "🕒 Submitted\n" +
    formattedDate;

  MailApp.sendEmail(
    notifyEmails.join(","),
    "💍 Wedding Group RSVP — " + group.representative,
    body
  );
}

// Mirror a confirmed attendee into the seating tab so they can find
// their table later. Columns: Full Name | Guest Count | Table | Attendance.
// `seatingIndex` maps lowercased names -> row number for fast upserts.
// Matches an existing row by any of `candidateNames` (display + original),
// updates the name + attendance, and never clobbers an assigned table.
function upsertSeatingRow_(seatingSheet, seatingIndex, candidateNames, guestCount, attendance) {
  if (!seatingSheet) {
    return;
  }

  var displayName = String(candidateNames[0] || "").trim();
  if (!displayName) {
    return;
  }

  var rowIndex = -1;
  for (var n = 0; n < candidateNames.length; n++) {
    var key = String(candidateNames[n] || "").toLowerCase().trim();
    if (key && seatingIndex[key] !== undefined) {
      rowIndex = seatingIndex[key];
      break;
    }
  }

  if (rowIndex === -1) {
    // New attendee — table number left blank for the hosts to assign.
    seatingSheet.appendRow([displayName, guestCount, "", attendance]);
    rowIndex = seatingSheet.getLastRow();
  } else {
    // Existing attendee — refresh the name (in case it was corrected) and
    // attendance, leaving the Guest Count / Table columns as-is.
    seatingSheet.getRange(rowIndex, 1).setValue(displayName);
    seatingSheet.getRange(rowIndex, 4).setValue(attendance);
  }

  seatingIndex[displayName.toLowerCase()] = rowIndex;
}

// Handle a representative confirming their group's attendance.
// Writes each person's status next to their own row and advances the
// group's submission counter (locking after the allowed update).
function handleGroupRSVP_(spreadsheet, data) {
  var glSheet = spreadsheet.getSheetByName(GUESTLIST_SHEET);

  if (!glSheet) {
    return jsonOut_({
      result: "error",
      error: "GuestList tab not found."
    });
  }

  var repName = String(data.representative || "").trim();
  var groups = readGuestListGroups_(glSheet);
  var group = findGroupForName_(groups, repName);

  if (!group) {
    return jsonOut_({
      result: "error",
      error: "Representative not found."
    });
  }

  // FINALIZED — no more changes allowed.
  if (group.updateCount >= GL_MAX_SUBMISSIONS) {
    return jsonOut_({
      result: "locked",
      group: buildGroupResponse_(group)
    });
  }

  var timestamp = new Date();
  var attendees = data.attendees || [];

  // Pre-index the seating tab so each confirmed attendee can be mirrored
  // there (Full Name | Guest Count | Table | Attendance).
  var seatingSheet = spreadsheet.getSheetByName("(MasterGuestList)Seating");
  var seatingIndex = {};
  if (seatingSheet) {
    var seatingValues = seatingSheet.getDataRange().getValues();
    for (var s = 1; s < seatingValues.length; s++) {
      var seatName = String(seatingValues[s][0] || "").toLowerCase().trim();
      if (seatName) {
        seatingIndex[seatName] = s + 1;
      }
    }
  }

  // Write each person's confirmation next to their row.
  for (var i = 0; i < attendees.length; i++) {
    var person = attendees[i];

    // Locate the row by the ORIGINAL name (corrected names won't match the
    // sheet), falling back to the display name for older clients.
    var lookupName = String(person.originalName || person.name || "").trim();
    var displayName = String(person.name || lookupName).trim();
    var attendance = String(person.attendance || "").trim();

    if (!lookupName || !attendance) {
      continue;
    }

    var rowIndex = -1;
    var nameColumn = GL_COL_MEMBER;

    if (person.isRepresentative ||
      lookupName.toLowerCase() === group.representative.toLowerCase()) {
      rowIndex = group.repRow;
      nameColumn = GL_COL_REP;
    } else {
      for (var m = 0; m < group.members.length; m++) {
        if (group.members[m].name.toLowerCase() === lookupName.toLowerCase()) {
          rowIndex = group.members[m].row;
          nameColumn = GL_COL_MEMBER;
          break;
        }
      }
    }

    if (rowIndex === -1) {
      continue;
    }

    // Apply a spelling correction if the rep edited the name.
    if (displayName && displayName.toLowerCase() !== lookupName.toLowerCase()) {
      glSheet.getRange(rowIndex, nameColumn).setValue(displayName);
    }

    glSheet.getRange(rowIndex, GL_COL_STATUS).setValue(attendance);
    glSheet.getRange(rowIndex, GL_COL_CONFIRMED).setValue(timestamp);

    // Mirror this attendee into the seating tab (one person = one seat).
    upsertSeatingRow_(seatingSheet, seatingIndex, [displayName, lookupName], 1, attendance);
  }

  // Store the representative's contact details on their header row.
  if (data.email !== undefined) {
    glSheet
      .getRange(group.repRow, GL_COL_EMAIL)
      .setValue(String(data.email || "").trim());
  }

  if (data.message !== undefined) {
    glSheet
      .getRange(group.repRow, GL_COL_MESSAGE)
      .setValue(String(data.message || "").trim());
  }

  var submissionType =
    group.updateCount === 0 ? "New Group RSVP" : "Updated Group RSVP";

  // Advance the submission counter (locks the group after the update).
  glSheet
    .getRange(group.repRow, GL_COL_UPDATES)
    .setValue(group.updateCount + 1);

  sendGroupNotification_(group, attendees, submissionType, timestamp);

  return jsonOut_({
    result: "success",
    submissionType: submissionType,
    locked: (group.updateCount + 1) >= GL_MAX_SUBMISSIONS
  });
}

function doPost(e) {
  var lock = LockService.getScriptLock();

  try {
    lock.waitLock(10000);

    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var rsvpSheet = spreadsheet.getSheetByName("RSVP");
    var seatingSheet = spreadsheet.getSheetByName("(MasterGuestList)Seating");

    var data = JSON.parse(e.postData.contents);

    // GROUP (REPRESENTATIVE) RSVP — confirm a whole group at once.
    if (String(data.type || "") === "group") {
      return handleGroupRSVP_(spreadsheet, data);
    }

    var timestamp = new Date();
    var name = String(data.name || "").trim();
    var email = String(data.email || "").trim();
    var attendance = String(data.attendance || "").trim();
    var message = String(data.message || "").trim();

    // EMAIL NOTIFICATION RECIPIENTS
    var notifyEmails = [
      "jmdonnu@gmail.com",
      "delacruzchezza@gmail.com"
    ];

    // FIND GUEST IN SEATING TAB
    var seatingData =
      seatingSheet
        .getDataRange()
        .getValues();

    var guestRow = null;
    var guestRowIndex = -1;
    var guestCount = 1;

    for (var i = 1; i < seatingData.length; i++) {

      var fullName =
        String(seatingData[i][0] || "")
          .trim();

      if (
        fullName.toLowerCase() ===
        name.toLowerCase()
      ) {

        guestRow = seatingData[i];
        guestRowIndex = i + 1;
        guestCount =
          seatingData[i][1] || 1;

        break;
      }
    }

    // UPDATE ATTENDANCE IN SEATING TAB
    if (guestRowIndex !== -1) {
      seatingSheet
        .getRange(
          guestRowIndex,
          4
        )
        .setValue(attendance);
    }

    // GUEST NOT FOUND
    if (!guestRow) {
      return ContentService
        .createTextOutput(JSON.stringify({
          result: "error",
          error: "Guest not found."
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // CHECK IF ALREADY RSVP'D
    var rsvpData = rsvpSheet.getDataRange().getValues();

    var existingRow = -1;

    for (var j = 1; j < rsvpData.length; j++) {
      var existingName = String(rsvpData[j][1]).trim();

      if (existingName.toLowerCase() === name.toLowerCase()) {
        existingRow = j + 1;
        break;
      }
    }

    // RSVP LOGIC (1 CONFIRM + 1 UPDATE ONLY)
    var submissionType = "";

    // Column G = Update Count
    var updateCountCol = 7;

    if (existingRow !== -1) {

      var currentUpdateCount =
        Number(
          rsvpSheet
            .getRange(existingRow, updateCountCol)
            .getValue()
        ) || 0;

      // LOCK after one update
      if (currentUpdateCount >= 1) {

        var savedData = rsvpSheet
          .getRange(existingRow, 1, 1, 7)
          .getValues()[0];

        return ContentService
          .createTextOutput(JSON.stringify({
            result: "locked",
            guest: {
              name: savedData[1],
              email: savedData[2],
              attendance: savedData[3],
              guestCount: savedData[4],
              message: savedData[5]
            }
          }))
          .setMimeType(ContentService.MimeType.JSON);
      }

      // ALLOW ONE UPDATE
      submissionType = "Updated RSVP";

      rsvpSheet.getRange(existingRow, 1, 1, 6).setValues([[
        timestamp,
        name,
        email,
        attendance,
        guestCount,
        message
      ]]);

      // mark update used
      rsvpSheet
        .getRange(existingRow, updateCountCol)
        .setValue(1);

    } else {

      // FIRST RSVP
      submissionType = "New RSVP";

      rsvpSheet.appendRow([
        timestamp,
        name,
        email,
        attendance,
        guestCount,
        message,
        0 // update count
      ]);
    }

    /* EMAIL NOTIFICATION */
    var subject = "💍 Wedding RSVP Notification";

    var formattedDate = Utilities.formatDate(
      timestamp,
      Session.getScriptTimeZone(),
      "MMMM dd, yyyy • hh:mm a"
    );

    var emailBody =
      "💍 WEDDING RSVP NOTIFICATION\n" +
      "━━━━━━━━━━━━━━━━━━\n\n" +

      "📌 Status\n" +
      submissionType + "\n\n" +

      "👤 Guest\n" +
      name + "\n\n" +

      (attendance === "Accept"
        ? "✅ Attendance\nAccept\n\n"
        : "❌ Attendance\nDecline\n\n") +

      "👥 Allowed Guests\n" +
      guestCount + "\n\n" +

      "📧 Email\n" +
      email + "\n\n" +

      "💌 Message\n" +
      (message || "No message provided") + "\n\n" +

      "🕒 Submitted\n" +
      formattedDate;

    MailApp.sendEmail(
      notifyEmails.join(","),
      subject,
      emailBody
    );

    return ContentService
      .createTextOutput(JSON.stringify({
        result: "success",
        submissionType: submissionType
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        result: "error",
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  var action = String(e.parameter.action || "");
  var query = String(e.parameter.q || "")
    .toLowerCase()
    .trim();

  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var seatingSheet = spreadsheet.getSheetByName("(MasterGuestList)Seating");
  var rsvpSheet = spreadsheet.getSheetByName("RSVP");

  // FIND SEAT (Accept only)
  if (action === "findSeat") {

    var data = seatingSheet
      .getDataRange()
      .getValues();

    var results = [];

    for (var j = 1; j < data.length; j++) {

      var fullName =
        String(data[j][0] || "")
          .trim();

      var guestCount =
        data[j][1] || 1;

      var table =
        String(data[j][2] || "")
          .trim();

      var attendance =
        String(data[j][3] || "")
          .trim()
          .toLowerCase();

      // Accept only
      if (attendance !== "accept") {
        continue;
      }

      // Search match
      if (
        fullName
          .toLowerCase()
          .includes(query)
      ) {
        results.push({
          fullName: fullName,
          guestCount: guestCount,
          table: table
        });
      }
    }

    return ContentService
      .createTextOutput(JSON.stringify({
        guests: results
      }))
      .setMimeType(
        ContentService.MimeType.JSON
      );
  }

  // HOST VIEWER (Accept only)
  if (action === "allGuests") {

    var data = seatingSheet
      .getDataRange()
      .getValues();

    var results = [];

    for (var j = 1; j < data.length; j++) {

      var fullName =
        String(data[j][0] || "")
          .trim();

      var table =
        String(data[j][2] || "")
          .trim();

      var attendance =
        String(data[j][3] || "")
          .trim()
          .toLowerCase();

      // Accept only
      if (attendance !== "accept") {
        continue;
      }

      results.push({
        fullName: fullName,
        table: table || "TBA"
      });
    }

    return ContentService
      .createTextOutput(JSON.stringify({
        guests: results
      }))
      .setMimeType(
        ContentService.MimeType.JSON
      );
  }

  // CHECK IF GUEST IS FINALIZED
  if (action === "checkGuest") {

    var rsvpData = rsvpSheet
      .getDataRange()
      .getValues();

    for (var i = 1; i < rsvpData.length; i++) {

      var guestName =
        String(rsvpData[i][1] || "")
          .trim()
          .toLowerCase();

      var updateCount =
        Number(rsvpData[i][6]) || 0;

      if (guestName === query) {

        var guestData = {
          name: rsvpData[i][1],
          email: rsvpData[i][2],
          attendance: rsvpData[i][3],
          guestCount: rsvpData[i][4],
          message: rsvpData[i][5]
        };

        // LOCKED / FINALIZED RSVP
        if (updateCount >= 1) {
          return ContentService
            .createTextOutput(JSON.stringify({
              locked: true,
              hasRSVP: true,
              guest: guestData
            }))
            .setMimeType(
              ContentService.MimeType.JSON
            );
        }

        // RSVP EXISTS BUT STILL EDITABLE
        return ContentService
          .createTextOutput(JSON.stringify({
            locked: false,
            hasRSVP: true,
            guest: guestData
          }))
          .setMimeType(
            ContentService.MimeType.JSON
          );
      }
    }

    return ContentService
      .createTextOutput(JSON.stringify({
        locked: false
      }))
      .setMimeType(
        ContentService.MimeType.JSON
      );
  }

  // LOOK UP A REPRESENTATIVE'S GROUP
  if (action === "group") {

    var glSheet = spreadsheet.getSheetByName(GUESTLIST_SHEET);
    var glGroups = readGuestListGroups_(glSheet);
    var group = findGroupForName_(glGroups, query);

    if (!group) {
      return jsonOut_({ isGroup: false });
    }

    var groupResponse = buildGroupResponse_(group);
    groupResponse.isGroup = true;

    return jsonOut_(groupResponse);
  }

  // NORMAL SEARCH
  var data = seatingSheet
    .getDataRange()
    .getValues();

  var results = [];
  var seenNames = {};

  for (var j = 1; j < data.length; j++) {

    var fullName =
      String(data[j][0] || "")
        .trim();

    var guestCount =
      data[j][1] || 1;

    if (
      fullName
        .toLowerCase()
        .includes(query)
    ) {
      results.push({
        fullName: fullName,
        guestCount: guestCount
      });
      seenNames[fullName.toLowerCase()] = true;
    }
  }

  // Also surface representatives from the GuestList tab so a group
  // host can find themselves in the same search box.
  var guestListSheet = spreadsheet.getSheetByName(GUESTLIST_SHEET);
  var guestListGroups = readGuestListGroups_(guestListSheet);

  for (var g = 0; g < guestListGroups.length; g++) {
    var repName = guestListGroups[g].representative;
    var repKey = repName.toLowerCase();

    if (repKey.includes(query) && !seenNames[repKey]) {
      results.push({
        fullName: repName,
        guestCount: guestListGroups[g].hc,
        isRepresentative: true
      });
      seenNames[repKey] = true;
    }
  }

  return ContentService
    .createTextOutput(JSON.stringify({
      guests: results
    }))
    .setMimeType(
      ContentService.MimeType.JSON
    );
}
