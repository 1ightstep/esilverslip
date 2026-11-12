function onSubmit(e) {
  // Local accessor for studentdb
  var studentSpreadsheet = SpreadsheetApp.openById(ESGlobal.getStudentDatabaseId());
  var formResponse = e.response;
  var itemResponses = formResponse.getItemResponses();

  var recipientEmail = formResponse.getRespondentEmail();
  var dateRequested = itemResponses[0].getResponse();
  var teachersDataRequested = itemResponses[1].getResponse();


 ESGlobal.sendDataEmail(recipientEmail,
    ESGlobal.findName(recipientEmail),
    dateRequested,
    teachersDataRequested,
    ESGlobal.getListCount (studentSpreadsheet,dateRequested, teachersDataRequested, 3), // Count for incoming
    ESGlobal.getStudents(studentSpreadsheet,dateRequested, teachersDataRequested, 3), // Names for incoming
    ESGlobal.getListCount (studentSpreadsheet, dateRequested, teachersDataRequested, 2), // Count for outgoing
    ESGlobal.getStudents(studentSpreadsheet, dateRequested, teachersDataRequested, 2)); // Names for outgoing
}

// Sorts in ascending order (A-Z), accounts for capitalized only
function sortTeachers() {
  const form = FormApp.getActiveForm();
  // Grabs the proper dropdown (by name) with the aggregated items in the form
  const dropdown = form.getItems(FormApp.ItemType.LIST)
    .map(item => item.asListItem())
    .find(item => item.getTitle() === "Teacher Requested (choose whose data you want to access)");
  // Converts all of the values in the dropdown into a list
  const teacherList = dropdown.getChoices().map(choice => choice.getValue());
  // Sorts alphabetically, only accounts for uppercase
  dropdown.setChoiceValues(teacherList.sort());
}