function rejectStudent(email, homeroom, destination, reason) {
  const homeroomTeacher = homeroom.split(" ")[0] + " " + homeroom.split(" ")[1]; //potential bug
  const destinationTeacher =
    destination.split(" ")[0] + " " + destination.split(" ")[1]; //potential bug

  const homeTeacherData = ESGlobal.accessTeacherDB().getData(homeroomTeacher);
  const destTeacherData =
    ESGlobal.accessTeacherDB().getData(destinationTeacher);

  //destination teacher curr students --;
  ESGlobal.accessTeacherDB().changeCurrentStudent(destinationTeacher, -1);

  //handleSubmitted auto removes student from homeroom teacher
}
