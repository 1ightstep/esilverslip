function onStudentSubmit(email, name, homeroom, destination, purpose) {
  const homeroomTeacher = homeroom.split(" ")[0] + " " + homeroom.split(" ")[1]; //potential bug
  const destinationTeacher =
    destination.split(" ")[0] + " " + destination.split(" ")[1]; //potential bug

  const homeTeacherData = ESGlobal.accessTeacherDB().getData(homeroomTeacher);
  const destTeacherData =
    ESGlobal.accessTeacherDB().getData(destinationTeacher);

  const homeroomSheetId = homeTeacherData[0];
  const destinationSheetId = destTeacherData[0];

  let isAuto = destTeacherData[4];
  let isSubstitute = destTeacherData[4];

  const studentBundle = {
    email: email,
    name: name,
    homeroom: homeroom,
    destination: destination,
    purpose: purpose,
  };

  const teacherBundle = {
    destSheetId: destinationSheetId,
    destTeacher: destinationTeacher,
    homeSheetId: homeroomSheetId,
    homeTeacher: homeroomTeacher,
  };

  let alreadySubmit = ESGlobal.accessStudentDB().getData(email); //use getData here since dataExists can return -1 which results in error
  if (alreadySubmit) {
    if (alreadySubmit[3] == destination) return;
    if (alreadySubmit[5] != "_PENDING_" && alreadySubmit[5] != "_ACCEPTED_")
      return;
    else {
      handleSubmitted(alreadySubmit, studentBundle);
    }
  }

  if (isAuto) {
    let isFull = ESGlobal.accessTeacherDB().isTeacherFull(destinationTeacher);
    if (isFull) {
      rejectStudent(teacherBundle, studentBundle);
    }
  } else if (isSubstitute) {
    rejectStudent(teacherBundle, studentBundle);
  }
  pendingAccept(teacherBundle, studentBundle);
}

//first parameter accepts info on previous data, student bundle is new curr info
function handleSubmitted(
  [email, name, homeroom, destination, purpose, status],
  studentBundle
) {
  const homeroomTeacher = homeroom.split(" ")[0] + " " + homeroom.split(" ")[1]; //potential bug
  const homeroomSheetId =
    ESGlobal.accessTeacherDB().getData(homeroomTeacher)[0];
  const destinationTeacher =
    destination.split(" ")[0] + " " + destination.split(" ")[1]; //potential bug
  const destinationSheetId =
    ESGlobal.accessTeacherDB().getData(destinationTeacher)[0];
  const homeTeacherSheet =
    SpreadsheetApp.openById(homeroomSheetId).getSheetByName("Outgoing");
  const destTeacherSheet =
    SpreadsheetApp.openById(destinationSheetId).getSheetByName("Incoming");

  //remove student from destination teacher sheet
  let range = destTeacherSheet.getDataRange();
  let values = range.getValues();
  let rowSelect = 2;
  while (values[rowSelect][1] && values[rowSelect][2] != email) {
    rowSelect++;
  }
  let rowRange = destTeacherSheet.getRange(rowSelect + 1, 2, 1, 6);
  rowRange.setValues([["", "", "", "", false, false]]);
  ESGlobal.accessTeacherDB().changeCurrentStudent(destinationTeacher, -1);

  //no need to add to homeroom teacher if pending
  //clear homeroom regardless if same homeroom teacher or not since accept or pending will add or require remove in homeroom sheet respectively
  range = homeTeacherSheet.getDataRange();
  values = range.getValues();
  rowSelect = 2;
  while (values[rowSelect][1] && values[rowSelect][2] != email) {
    rowSelect++;
  }
  rowRange = homeTeacherSheet.getRange(rowSelect + 1, 2, 1, 4);
  rowRange.setValues([["", "", "", ""]]);
}
