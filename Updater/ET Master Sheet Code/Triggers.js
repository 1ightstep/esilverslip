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

function autoRun() {
  if (isETTime()) {
    submitAdmissions();
  }
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
    .atHour(12)
    .create();
}

function createMinuteTrigger() {
  const triggers = ScriptApp.getProjectTriggers();
  for (let i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === "autoRun") {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }

  ScriptApp.newTrigger("autoRun").timeBased().everyMinutes(1).create();
}

function deleteMinuteTrigger() {
  const triggers = ScriptApp.getProjectTriggers();
  for (let i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === "autoRun") {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }
}
