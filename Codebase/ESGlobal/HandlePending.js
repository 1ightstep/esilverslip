function handlePending(teacherBundle, studentBundle) {
  const destTeacherSheet = SpreadsheetApp.openById(
    teacherBundle.destSheetId
  ).getSheetByName("Incoming");

  //add student to destTeacherSheet, keep accepted false
  let range = destTeacherSheet.getDataRange();
  let values = range.getValues();

  let rowSelect = 2;
  while (rowSelect < values.length && values[rowSelect][1] != "") {
    rowSelect++;
  }
  //if rowSelect is greater than max rows, append a new row
  if (rowSelect > destTeacherSheet.getMaxRows() - 1) {
    let example = destTeacherSheet.getRange(
      destTeacherSheet.getLastRow(),
      1,
      1,
      destTeacherSheet.getLastColumn()
    );
    destTeacherSheet.appendRow([destTeacherSheet.getLastRow() - 1]);
    let newRow = destTeacherSheet.getRange(
      destTeacherSheet.getLastRow(),
      1,
      1,
      destTeacherSheet.getLastColumn()
    );
    example.copyTo(newRow, { formatOnly: true });
  }

  let rowRange = destTeacherSheet.getRange(rowSelect + 1, 2, 1, 6);
  rowRange.setValues([
    [
      studentBundle.name,
      studentBundle.email,
      studentBundle.homeroom,
      studentBundle.purpose,
      false,
      false,
    ],
  ]);

  //currStudents ++ regardless
  accessTeacherDB().changeCurrentStudent(teacherBundle.destTeacher, 1);

  //add student to student database
  accessStudentDB().updateData(
    studentBundle.email,
    studentBundle.name,
    studentBundle.homeroom,
    studentBundle.destination,
    studentBundle.purpose,
    "_PENDING_"
  );

  //the homeroom teacher won't receive until destination accepts the student
}
