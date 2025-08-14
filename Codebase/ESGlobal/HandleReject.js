function handleReject(teacherBundle, studentBundle, reason) {
  //destination teacher curr students --;
  accessTeacherDB().changeCurrentStudent(teacherBundle.destTeacher, -1);

  //remove student from home teacher sheet regardless
  const homeTeacherSheet = SpreadsheetApp.openById(
    teacherBundle.homeSheetId
  ).getSheetByName("Outgoing");
  range = homeTeacherSheet.getDataRange();
  values = range.getValues();
  rowSelect = 2;
  while (
    rowSelect < values.length &&
    values[rowSelect][2] != studentBundle.email
  ) {
    rowSelect++;
  }
  rowRange = homeTeacherSheet.getRange(rowSelect + 1, 2, 1, 4);
  rowRange.setValues([["", "", "", ""]]);
  rowRange.setBackground(null);

  //remove student from student db
  accessStudentDB().setData(studentBundle.email, {
    email: "",
    name: "",
    homeroom: "",
    destination: "",
    purpose: "",
    status: "",
  });

  //send email to student
  sendRejectEmail(
    studentBundle.email,
    studentBundle.name,
    studentBundle.destination,
    reason
  );
  //handleSubmitted auto removes student from homeroom teacher
  //only acceptances will be added to homeroom teacher
}
