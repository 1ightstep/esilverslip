function onStudentSubmit(email, name, homeroom, destination, purpose) {
  const homeroomTeacher = homeroom.split(" @ ")[0];
  const destinationTeacher = destination.split(" @ ")[0];
  const homeTeacherData = ESGlobal.accessTeacherDB().getData(homeroomTeacher);
  const destTeacherData =
    ESGlobal.accessTeacherDB().getData(destinationTeacher);

  const homeroomSheetId = homeTeacherData[0];
  const destinationSheetId = destTeacherData[0];

  let isAuto = destTeacherData[4];
  let isSubstitute = destTeacherData[5];

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
      ESGlobal.handleReject(
        teacherBundle,
        studentBundle,
        "Your current request has been processed previously.",
        false
      );
      return;
    }

    ESGlobal.handleSubmitted(alreadySubmit);
  }

  if (isAuto) {
    let isFull = ESGlobal.accessTeacherDB().isTeacherFull(destinationTeacher);
    if (isFull) {
      ESGlobal.handleReject(teacherBundle, studentBundle, "Full room", false);
      return;
    }
    ESGlobal.handleAccept(teacherBundle, studentBundle, false);
    return;
  } else if (isSubstitute) {
    ESGlobal.handleReject(
      teacherBundle,
      studentBundle,
      "Teacher absent",
      false
    );
    return;
  }
  ESGlobal.handlePending(teacherBundle, studentBundle);
}
