function handleSubmitted(oldData) {
  const oldHomeTeacher = oldData[2].split(" @ ")[0];
  const oldDestTeacher = oldData[3].split(" @ ")[0];

  const oldHomeSheet = SpreadsheetApp.openById(
    accessTeacherDB().getData(oldHomeTeacher)[0]
  ).getSheetByName("Outgoing");
  const oldDestSheet = SpreadsheetApp.openById(
    accessTeacherDB().getData(oldDestTeacher)[0]
  ).getSheetByName("Incoming");

  //remove student from destination teacher sheet
  let range = oldDestSheet.getDataRange();
  let values = range.getValues();
  let rowSelect = 2;

  while (values[rowSelect][2] != oldData[0]) {
    rowSelect++;
  }
  let rowRange = oldDestSheet.getRange(rowSelect + 1, 2, 1, 6);
  rowRange.setValues([["", "", "", "", false, false]]);
  accessTeacherDB().changeCurrentStudent(oldDestTeacher, -1);

  //clear homeroom only if prev accepted
  if (oldData[5] == "_ACCEPTED_") {
    range = oldHomeSheet.getDataRange();
    values = range.getValues();
    rowSelect = 2;
    while (rowSelect < values.length && values[rowSelect][2] != email) {
      rowSelect++;
    }
    rowRange = oldHomeSheet.getRange(rowSelect + 1, 2, 1, 4);
    rowRange.setValues([["", "", "", ""]]);
  }

  //no need to update student database since pending does it and reject clears it
}
