function handleAccept(teacherBundle, studentBundle, inRoomAccept = true) {
  //student has to be alr be in db; overwriting students will overwrite student db so dw
  const acceptedStudent = accessStudentDB().getData(studentBundle.email);
  if (acceptedStudent[5] === "_ACCEPTED_") return;

  const destTeacherSheet = SpreadsheetApp.openById(
    teacherBundle.destSheetId
  ).getSheetByName("Incoming");

  const homeTeacherSheet = SpreadsheetApp.openById(
    teacherBundle.homeSheetId
  ).getSheetByName("Outgoing");

  let rowRange;
  //if not in room just add to dest teacher sheet and curr student ++
  if (!inRoomAccept) {
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

    rowRange = destTeacherSheet.getRange(rowSelect + 1, 2, 1, 6);
    rowRange.setValues([
      [
        studentBundle.name,
        studentBundle.email,
        studentBundle.homeroom,
        studentBundle.purpose,
        true,
        false,
      ],
    ]);

    accessTeacherDB().changeCurrentStudent(teacherBundle.destTeacher, 1);
  }

  //update homeroom teacher by adding to outgoing
  let range = homeTeacherSheet.getDataRange();
  let values = range.getValues();
  let rowSelect = 2;
  //do not use !values[rowSelect][1] even tho it works for normal js

  while (
    rowSelect < values.length &&
    values[rowSelect][2] &&
    values[rowSelect][2] != studentBundle.email
  ) {
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

  sendAcceptEmail(
    studentBundle.email,
    studentBundle.name,
    studentBundle.destination,
    studentBundle.homeroom
  );
}
