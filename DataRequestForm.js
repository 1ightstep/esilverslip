function onSubmit(e) {
  var formResponse = e.response;
  var itemResponses = formResponse.getItemResponses();

  var recipientEmail = formResponse.getRespondentEmail();
  var dateRequested = itemResponses[0].getResponse();
  var teachersDataRequested = itemResponses[1].getResponse();

  ESGlobal.sendTeacherDataEmail(recipientEmail,
    ESGlobal.getTeacherName(recipientEmail),
    dateRequested,
    getListCount (sheetSelection(dateRequested), ESGlobal.getTeacherName(recipientEmail), 3), //incoming
    getListCount (sheetSelection(dateRequested), ESGlobal.getTeacherName(recipientEmail), 2)); //outgoing
}

// Must be initialized with 10 current values to be recent
// Assumes an array, if object then update accordingly (FIND OUT:
// how to add an defined list of values to a dropdown in google forms, general ET form probably has it due to the teachers)
// Descending order (oldest first) bc easiest
function updateDateRanges(range, newestDate) {
    return range.slice(1).concat(newestDate);
}



