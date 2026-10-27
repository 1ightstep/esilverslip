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
    ESGlobal.getListCount (studentSpreadsheet,dateRequested, teachersDataRequested, 3), // Count for incoming
    ESGlobal.getStudentNames(studentSpreadsheet,dateRequested, teachersDataRequested, 3), // Names for incoming
    ESGlobal.getListCount (studentSpreadsheet, dateRequested, teachersDataRequested, 2), // Count for outgoing
    ESGlobal.getStudentNames (studentSpreadsheet, dateRequested, teachersDataRequested, 2)); // Names for outgoing
}