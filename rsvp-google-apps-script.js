/**
 * Google Apps Script for Wedding RSVP submissions and Seat Finder
 * 
 * Instructions:
 * 1. Open Google Sheets.
 * 2. Create two tabs: "RSVPs" and "Seating"
 * 3. Go to Extensions > Apps Script.
 * 4. Replace all code in the script editor with this code.
 * 5. Save and Deploy as a Web App:
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 6. Copy the Web App URL and add it to your GOOGLE_APPS_SCRIPT_URL environment variable.
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000); 
    
    // Specifically target the "RSVPs" tab
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("RSVPs");
    
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp", "Full Name", "Email Address", "Attendance", 
        "Number of Guests", "Dietary Restrictions", "Message"
      ]);
    }
    
    var data = JSON.parse(e.postData.contents);
    var timestamp = new Date();
    var name = data.name || "";
    var email = data.email || "";
    var attendance = data.attendance || "";
    var guests = data.attendance === "yes" ? (data.guests || "1") : "0";
    var dietary = data.attendance === "yes" ? (data.dietary || "") : "";
    var message = data.message || "";
    
    sheet.appendRow([timestamp, name, email, attendance, guests, dietary, message]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ "result": "success" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ "result": "error", "error": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  var query = e.parameter.q;
  
  if (!query) {
    return ContentService.createTextOutput(JSON.stringify({ guests: [] }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  var lowerQuery = query.toLowerCase().trim();
  
  // Specifically target the "Seating" tab
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Seating");
  
  if (!sheet) {
    return ContentService.createTextOutput(JSON.stringify({ error: "Seating tab not found in spreadsheet." }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  // Get all data from the sheet
  var data = sheet.getDataRange().getValues();
  
  // Assuming row 1 is headers: ["Full Name", "Table Number"]
  var results = [];
  
  for (var i = 1; i < data.length; i++) {
    var fullName = String(data[i][0]); // Column A: Full Name
    var table = String(data[i][1]);    // Column B: Table Number
    
    if (fullName.toLowerCase().indexOf(lowerQuery) !== -1) {
      results.push({
        fullName: fullName,
        table: table
      });
    }
  }
  
  return ContentService.createTextOutput(JSON.stringify({ guests: results }))
    .setMimeType(ContentService.MimeType.JSON);
}
