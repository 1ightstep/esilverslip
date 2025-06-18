function rejectStudent() {
  const homeroomTeacher = homeroom.split(" ")[0] + " " + homeroom.split(" ")[1]; //potential bug
  const destinationTeacher =
    destination.split(" ")[0] + " " + destination.split(" ")[1]; //potential bug

  const homeTeacherData = ESGlobal.accessTeacherDB().getData(homeroomTeacher);
  const destTeacherData =
    ESGlobal.accessTeacherDB().getData(destinationTeacher);

  //destination teacher curr students --;
  ESGlobal.accessTeacherDB().changeCurrentStudent(destinationTeacher, -1);

  //if student wasn't pending, we can remove student from homeroom teacher
  if (ESGlobal.accessStudentDB().getData(email)[5] != "_PENDING_") {
    range = homeTeacherSheet.getDataRange();
    values = range.getValues();
    rowSelect = 2;
    while (values[rowSelect][1] && values[rowSelect][2] != email) {
      rowSelect++;
    }
    rowRange = homeTeacherSheet.getRange(rowSelect + 1, 2, 1, 4);
    rowRange.setValues([["", "", "", ""]]);
  }
}
