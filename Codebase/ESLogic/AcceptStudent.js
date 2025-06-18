function acceptStudent(teacherBundle, studentBundle) {
  const homeTeacherSheet = SpreadsheetApp.openById(
    teacherBundle.homeSheetId
  ).getSheetByName("Outgoing");

  //currStudents ++;
  ESGlobal.accessTeacherDB().changeCurrentStudent(teacherBundle.destTeacher, 1);

  //update homeroom teacher by adding to outgoing
  range = homeTeacherSheet.getDataRange();
  values = range.getValues();
  rowSelect = 2;
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

  //add student to student database
  ESGlobal.accessStudentDB().updateData(
    studentBundle.email,
    studentBundle.name,
    studentBundle.homeroom,
    studentBundle.destination,
    studentBundle.purpose,
    "_ACCEPTED_"
  );
}
