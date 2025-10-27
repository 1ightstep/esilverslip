function handleAbsent(studentBundle) {
  //get homeroom teacher sheet
  const homeTeacher = studentBundle.homeroom.split(" @ ")[0];
  const homeTeacherSheet = SpreadsheetApp.openById(
    accessTeacherDB().getData(homeTeacher)[0]
  ).getSheetByName("Outgoing");

  //find student in outgoing sheet and mark them grey
  let range = homeTeacherSheet.getDataRange();
  let values = range.getValues();
  let rowSelect = 2;
  while (
    rowSelect < values.length &&
    values[rowSelect][2] != studentBundle.email
  ) {
    rowSelect++;
  }
  let rowRange = homeTeacherSheet.getRange(
    rowSelect + 1,
    2,
    1,
    homeTeacherSheet.getLastColumn() - 1
  );
  rowRange.setBackground("grey");

  //update status
  accessStudentDB().updateData(
    studentBundle.email,
    studentBundle.name,
    studentBundle.homeroom,
    studentBundle.destination,
    studentBundle.purpose,
    "_ABSENT_"
  );
}
