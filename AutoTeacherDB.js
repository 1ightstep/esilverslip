function resetCurrStudent() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ogSheet = ss.getSheetByName("db");

  const range = ogSheet.getRange("H2:H" + ogSheet.getLastRow());
  range.setValue(0);
}
