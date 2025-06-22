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

  let alreadySubmit = ESGlobal.accessStudentDB().dataExists(email); //use data exists to ensure data exists, difficulty persists with getData
  if (alreadySubmit != -1) {
    if (alreadySubmit[2] == homeroom && alreadySubmit[3] == destination)
      //prevents spam
      return;
    if (alreadySubmit[5] != "_PENDING_" && alreadySubmit[5] != "_ACCEPTED_")
      //if teacher requested
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
