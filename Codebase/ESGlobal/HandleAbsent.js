function handleAccept(teacherBundle, studentBundle) {
  const homeTeacherSheet = SpreadsheetApp.openById(
    teacherBundle.homeSheetId
  ).getSheetByName("Outgoing");

  //no need for currStudents ++ since pending already does it;

  //update homeroom teacher by adding to outgoing
  range = homeTeacherSheet.getDataRange();
  values = range.getValues();
  rowSelect = 2;
  //do not use !values[rowSelect][1] even tho it works for normal js
  while (values[rowSelect][1] != "") {
    rowSelect++;
  }

  rowRange = homeTeacherSheet.getRange(rowSelect + 1, 2, 1, 4);
  rowRange.setValues([
    [
      studentBundle.name,
      studentBundle.email,
      studentBundle.destination,
      studentBundle.purpose,
    ],
  ]);

  //update student database
  accessStudentDB().updateData(
    studentBundle.email,
    studentBundle.name,
    studentBundle.homeroom,
    studentBundle.destination,
    studentBundle.purpose,
    "_ACCEPTED_"
  );

  //send email to student
  sendAcceptEmail(
    studentBundle.email,
    studentBundle.name,
    studentBundle.destination,
    studentBundle.homeroom
  );
}
