function onSubmit(e) {
  var formResponse = e.response;
  var itemResponses = formResponse.getItemResponses();

  var teacherEmail = formResponse.getRespondentEmail();
  var studentEmail = itemResponses[0].getResponse();

  ESGlobal.sendRequestEmail(studentEmail, teacherEmail);
}
