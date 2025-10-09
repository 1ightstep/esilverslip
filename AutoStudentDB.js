function getDate() {
  const date = new Date();
  const formattedDate = date.toLocaleDateString("en-US");
  return formattedDate;
}

function clearDB() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ogSheet = ss.getSheetByName("db");
  const lastRow = Math.max(ogSheet.getLastRow(), 2);

  const range = ogSheet.getRange("A2:F" + lastRow);

  range.clearContent();
}

function getDay() {
  const date = new Date();
  const day = date.getDay();
  return day;
}

function makeHistory() {
  if (getDay() == 2 || getDay == 4) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const ogSheet = ss.getSheetByName("db");
    const sheetName = getDate();

    const newSheet = ogSheet.copyTo(ss);
    newSheet.setName(sheetName);

    clearDB();
  }
}
