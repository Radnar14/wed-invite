/**
 * Google Apps Script for Wedding RSVP submissions
 * 
 * Instructions:
 * 1. Open Google Sheets.
 * 2. Go to Extensions > Apps Script.
 * 3. Replace all code in the script editor with this code.
 * 4. Save and Deploy as a Web App:
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copy the Web App URL and add it to your GOOGLE_APPS_SCRIPT_URL environment variable.
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000); // wait 10 seconds before timeout
    
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Auto-initialize headers if empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp", 
        "Full Name", 
        "Email Address", 
        "Attendance", 
        "Number of Guests", 
        "Dietary Restrictions", 
        "Message"
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
