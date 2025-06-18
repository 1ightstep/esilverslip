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
