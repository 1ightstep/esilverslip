//functions
function dailyReset() {
  let incSheet = SpreadsheetApp.getActive().getSheetByName("Incoming");
  let range = incSheet.getRange("B3:G" + incSheet.getLastRow());
  let data = range.getValues();
  data.forEach((_, index) => {
    data[index] = ["", "", "", "", false, false];
  });
  range.setValues(data);

  let outSheet = SpreadsheetApp.getActive().getSheetByName("Outgoing");
  range = outSheet.getRange("B3:E38");
  range.clearContent();
  range.setBackground(null);
}

//triggers
function createDailyTrigger() {
  const triggers = ScriptApp.getProjectTriggers();
  for (let i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === "dailyReset") {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }

  ScriptApp.newTrigger("dailyReset")
    .timeBased()
    .everyDays(1)
    .atHour(14)
    .create();
}
