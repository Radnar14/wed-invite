// ===============================================================
// GUESTLIST (REPRESENTATIVE → MEMBERS) CONFIGURATION
// ---------------------------------------------------------------
// The GuestList tab only describes the group STRUCTURE. A representative
// groups one or more members; each row holds one person — the
// representative on the group's header row (column A) and each member on
// the rows beneath it (column C).
//
//   A: Representative | B: HC | C: Member
//
// We never store confirmation details here — the only thing we ever write
// back to GuestList is a corrected member/representative NAME. Every RSVP
// detail (attendance, contact, lock count) lives in the RSVP tab below.
// ===============================================================
var GUESTLIST_SHEET = "GuestList";
var GL_COL_REP = 1; // A
var GL_COL_HC = 2; // B
var GL_COL_MEMBER = 3; // C

// ===============================================================
// RSVP TAB — where ALL confirmation details are stored (one row per
// person, for both single guests and group attendees):
//
//   A: Timestamp | B: Full Name | C: Email Address | D: Attendance |
//   E: Number of Guests | F: Message | G: Update Count
// ===============================================================
var RSVP_SHEET = "RSVP";
var RSVP_COL_TIMESTAMP = 1; // A
var RSVP_COL_NAME = 2; // B
var RSVP_COL_EMAIL = 3; // C
var RSVP_COL_ATTENDANCE = 4; // D
var RSVP_COL_GUESTS = 5; // E
var RSVP_COL_MESSAGE = 6; // F
var RSVP_COL_UPDATES = 7; // G

// A group may confirm once, then make one update — lock after that (the
// representative's RSVP row carries the group's update count).
var RSVP_LOCK_AT = 1;

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
    var rowIndex = i + 1;

    if (rep !== "") {
      // New group header row — the representative is also an attendee.
      current = {
        representative: rep,
        hc: Number(hc) || 1,
        repRow: rowIndex,
        members: []
      };
      groups.push(current);
    } else if (current && member !== "") {
      // Continuation row — a member belonging to the current group.
      current.members.push({
        name: member,
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

// Build a lookup of the RSVP tab keyed by lowercased Full Name, so we can
// read back each person's saved confirmation and the group's lock count.
function readRsvpIndex_(rsvpSheet) {
  var index = {};
  if (!rsvpSheet) {
    return index;
  }

  var values = rsvpSheet.getDataRange().getValues();
  for (var i = 1; i < values.length; i++) {
    var name = String(values[i][RSVP_COL_NAME - 1] || "").toLowerCase().trim();
    if (!name) {
      continue;
    }
    index[name] = {
      row: i + 1,
      email: String(values[i][RSVP_COL_EMAIL - 1] || "").trim(),
      attendance: String(values[i][RSVP_COL_ATTENDANCE - 1] || "").trim(),
      message: String(values[i][RSVP_COL_MESSAGE - 1] || "").trim(),
      updateCount: Number(values[i][RSVP_COL_UPDATES - 1]) || 0
    };
  }

  return index;
}

// Shape a group for the client: representative first, then members. Each
// person's saved status (and the group's lock state + the rep's contact)
// is read back from the RSVP tab.
function buildGroupResponse_(group, rsvpIndex) {
  var repInfo = rsvpIndex[group.representative.toLowerCase()] || null;

  var attendees = [{
    name: group.representative,
    isRepresentative: true,
    status: repInfo ? repInfo.attendance : ""
  }];

  for (var m = 0; m < group.members.length; m++) {
    var memberInfo = rsvpIndex[group.members[m].name.toLowerCase()] || null;
    attendees.push({
      name: group.members[m].name,
      isRepresentative: false,
      status: memberInfo ? memberInfo.attendance : ""
    });
  }

  return {
    representative: group.representative,
    hc: group.hc,
    email: repInfo ? repInfo.email : "",
    message: repInfo ? repInfo.message : "",
    attendees: attendees,
    locked: repInfo ? repInfo.updateCount >= RSVP_LOCK_AT : false,
    hasRSVP: !!repInfo
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

// Find the GuestList row + name column for a person within a group.
// Returns { row, column } or null. Used only to write back a name fix.
function findGuestListRow_(group, lookupName) {
  var lower = lookupName.toLowerCase();

  if (lower === group.representative.toLowerCase()) {
    return { row: group.repRow, column: GL_COL_REP };
  }

  for (var m = 0; m < group.members.length; m++) {
    if (group.members[m].name.toLowerCase() === lower) {
      return { row: group.members[m].row, column: GL_COL_MEMBER };
    }
  }

  return null;
}

// Handle a representative confirming their group's attendance.
// ALL confirmation details are written to the RSVP tab (one row per
// person). The GuestList tab is only touched to correct a name spelling.
// The representative's RSVP row carries the group's update count / lock.
function handleGroupRSVP_(spreadsheet, data) {
  var glSheet = spreadsheet.getSheetByName(GUESTLIST_SHEET);

  if (!glSheet) {
    return jsonOut_({
      result: "error",
      error: "GuestList tab not found."
    });
  }

  var rsvpSheet = spreadsheet.getSheetByName(RSVP_SHEET);

  if (!rsvpSheet) {
    return jsonOut_({
      result: "error",
      error: "RSVP tab not found."
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

  var rsvpIndex = readRsvpIndex_(rsvpSheet);
  var repInfo = rsvpIndex[group.representative.toLowerCase()] || null;

  // FINALIZED — the representative has already used their one update.
  if (repInfo && repInfo.updateCount >= RSVP_LOCK_AT) {
    return jsonOut_({
      result: "locked",
      group: buildGroupResponse_(group, rsvpIndex)
    });
  }

  var timestamp = new Date();
  var attendees = data.attendees || [];
  var groupEmail = String(data.email || "").trim();
  var groupMessage = String(data.message || "").trim();

  // First submission starts the group's counter at 0; the one allowed
  // update bumps it to RSVP_LOCK_AT, after which the group is locked.
  var newCount = repInfo ? repInfo.updateCount + 1 : 0;
  var submissionType = repInfo ? "Updated Group RSVP" : "New Group RSVP";

  // Pre-index the seating tab so each attendee can be mirrored there
  // (Full Name | Guest Count | Table | Attendance).
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

  // Write each person's RSVP row.
  for (var i = 0; i < attendees.length; i++) {
    var person = attendees[i];

    // Locate any existing record by the ORIGINAL name (a corrected name
    // won't match yet), falling back to the display name.
    var lookupName = String(person.originalName || person.name || "").trim();
    var displayName = String(person.name || lookupName).trim();
    var attendance = String(person.attendance || "").trim();

    if (!lookupName || !attendance) {
      continue;
    }

    // The ONLY thing we write back to GuestList: a corrected name.
    if (displayName.toLowerCase() !== lookupName.toLowerCase()) {
      var glTarget = findGuestListRow_(group, lookupName);
      if (glTarget) {
        glSheet.getRange(glTarget.row, glTarget.column).setValue(displayName);
      }
    }

    // Upsert this attendee's RSVP row (match by original or corrected name).
    var existing =
      rsvpIndex[lookupName.toLowerCase()] || rsvpIndex[displayName.toLowerCase()] || null;

    var rsvpRow = [
      timestamp,    // A: Timestamp
      displayName,  // B: Full Name
      groupEmail,   // C: Email Address
      attendance,   // D: Attendance
      1,            // E: Number of Guests (one person per row)
      groupMessage, // F: Message
      newCount      // G: Update Count
    ];

    var targetRow;
    if (existing) {
      targetRow = existing.row;
      rsvpSheet.getRange(targetRow, 1, 1, 7).setValues([rsvpRow]);
    } else {
      rsvpSheet.appendRow(rsvpRow);
      targetRow = rsvpSheet.getLastRow();
    }

    // Keep the index current so duplicate names within one submission and
    // the corrected-name key both resolve to the same row.
    rsvpIndex[displayName.toLowerCase()] = {
      row: targetRow,
      email: groupEmail,
      attendance: attendance,
      message: groupMessage,
      updateCount: newCount
    };

    // Mirror this attendee into the seating tab (one person = one seat).
    upsertSeatingRow_(seatingSheet, seatingIndex, [displayName, lookupName], 1, attendance);
  }

  sendGroupNotification_(group, attendees, submissionType, timestamp);

  return jsonOut_({
    result: "success",
    submissionType: submissionType,
    locked: newCount >= RSVP_LOCK_AT
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

    var groupResponse = buildGroupResponse_(group, readRsvpIndex_(rsvpSheet));
    groupResponse.isGroup = true;

    return jsonOut_(groupResponse);
  }

  // HOST: per-representative confirmation summary (confirmed / total + names)
  if (action === "groupSummary") {

    var summaryGlSheet = spreadsheet.getSheetByName(GUESTLIST_SHEET);
    var summaryGroups = readGuestListGroups_(summaryGlSheet);
    var summaryRsvp = readRsvpIndex_(rsvpSheet);

    var summaries = [];

    for (var sg = 0; sg < summaryGroups.length; sg++) {
      var grp = summaryGroups[sg];

      // Everyone invited under this representative (rep + members).
      var people = [grp.representative];
      for (var pm = 0; pm < grp.members.length; pm++) {
        people.push(grp.members[pm].name);
      }

      var confirmed = [];
      var declinedCount = 0;
      for (var pp = 0; pp < people.length; pp++) {
        var personInfo = summaryRsvp[people[pp].toLowerCase()] || null;
        if (!personInfo) {
          continue;
        }
        if (personInfo.attendance.toLowerCase() === "accept") {
          confirmed.push(people[pp]);
        } else if (personInfo.attendance.toLowerCase() === "decline") {
          declinedCount++;
        }
      }

      var repInfo = summaryRsvp[grp.representative.toLowerCase()] || null;

      summaries.push({
        representative: grp.representative,
        total: grp.hc,
        confirmedCount: confirmed.length,
        declinedCount: declinedCount,
        confirmed: confirmed,
        responded: !!repInfo
      });
    }

    return jsonOut_({ groups: summaries });
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
