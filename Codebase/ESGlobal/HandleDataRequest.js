// Variables = recipientEmail, dateRequested, teachersDataRequested
// TO DO:
// 1. Attach name to "recipientEmail" from teacherdb
// 2. Fetch general data with date sorted from studentdb
// 3. Filter data from studentdb by number outgoing/incoming requests relative to teacher
// 4. Send email to recipientEmail with data attached
// PS. Define dateRequested, studentIncoming, and studentOutgoing

// Teacher database only has db as the relevant sheet and thus can be accessed directly as so
const teacherdb = SpreadsheetApp.openById(getTeacherDatabaseId()).getSheetByName("db").getValues();
// Student database has the current data as db, with archive dates; must be accessed by date
const studentdb = SpreadsheetApp.openById(getStudentDatabaseId());

function findName(recipientEmail) {
	// gimme email, use email to identify the row and then go from there
    const teacherRow = teacherdb.findIndex(row => row[3] === recipientEmail);
	const name = teacherdb[teacherRow][1];
    return name;
}

function sheetSelection(givenDate) {
    const relevantSheet = studentdb.getSheetByName(givenDate).getValues();
    return relevantSheet;
}

// Index 2 is homeroom, index 3 is destination
// In this case, count homeroom for outgoing and destination for incoming
function getListCount (sheet, teacherName, index) {
    var selectedColumn = sheet.map(row => row[index]);
    var incomingCount = selectedColumn.filter(value => value.trim() === teacherName.trim()).length;
    return incomingCount;
}