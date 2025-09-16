function handleAccept(teacherBundle, studentBundle) {
  //student has to be alr be in db; overwriting students will overwrite student db so dw
  const acceptedStudent = accessStudentDB().getData(studentBundle.email);
  if (acceptedStudent[5] === "_ACCEPTED_") return;

  const homeTeacherSheet = SpreadsheetApp.openById(
    teacherBundle.homeSheetId
  ).getSheetByName("Outgoing");


  //no need for currStudents ++ since pending already does it;

  //update homeroom teacher by adding to outgoing
  let range = homeTeacherSheet.getDataRange();
  let values = range.getValues();
  let rowSelect = 2;
  //do not use !values[rowSelect][1] even tho it works for normal js

  while (values[rowSelect][2] && values[rowSelect][2] != studentBundle.email) {
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
