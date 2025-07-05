function onStudentSubmit(email, name, homeroom, destination, purpose) {
  const homeroomTeacher = homeroom.split(" @ ")[0];
  const destinationTeacher = destination.split(" @ ")[0];

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
  if (alreadySubmit) {
    //prevents spam
    if (alreadySubmit[2] == homeroom && alreadySubmit[3] == destination) {
      return;
    }
    //teacher requested the student-> can't make another request
    if (alreadySubmit[5] != "_PENDING_" && alreadySubmit[5] != "_ACCEPTED_") {
      ESGlobal.handleReject(
        teacherBundle,
        studentBundle,
        "You are requested by " + alreadySubmit[5]
      );
    } else {
      ESGlobal.handleSubmitted(alreadySubmit);
    }
  }

  if (isAuto) {
    let isFull = ESGlobal.accessTeacherDB().isTeacherFull(destinationTeacher);
    if (isFull) {
      ESGlobal.handleReject(teacherBundle, studentBundle, "Full room");
    }
  } else if (isSubstitute) {
    ESGlobal.handleReject(teacherBundle, studentBundle, "Teacher absent");
  }
  ESGlobal.handlePending(teacherBundle, studentBundle);
}
