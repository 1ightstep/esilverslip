// accessTeacherDatabase() behaves weirdly, opted for normal approach
var teacherSpreadsheet = SpreadsheetApp.openById(getTeacherDatabaseId());
const teacherdb = teacherSpreadsheet.getSheetByName("db").getDataRange().getValues();

// Checks if recipientEmail is in the teacherdb, if not throw an error
function findName(recipientEmail) {
  // The check, index = -1 if not found
    const teacherRow = teacherdb.findIndex(row => row[3] === recipientEmail);
    var name;
    // Conditional for sending or throwing an error
    if (teacherRow !== -1) {
        name = teacherdb[teacherRow][1];
    }
    else {
      throw new Error("User isn't authorized to use this service.");
    }
    return name;
}

// Index 2 is homeroom, index 3 is destination
// In this case, count homeroom for outgoing and destination for incoming
function getListCount (sheet, date, teacherName, index) {
    var relevantSheet = sheet.getSheetByName(date).getDataRange().getValues();
    // Sorts all the rows into a single array at the relevant index
    var selectedColumn = relevantSheet.map(row => row[index]);
    // Checks for the number of values which equal to teacherName
    var incomingCount = selectedColumn.filter(value => value.split(" @ ")[0].trim() === teacherName.trim()).length;
    return incomingCount;
}