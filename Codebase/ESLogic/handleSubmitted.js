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
