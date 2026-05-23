function getETDays() {
  const rawDays = getAdminPanel()
    .getSheetByName("Time Control")
    .getRange("B2:B6")
    .getValues();
  const parsedDays = rawDays.map((day, index) => {
    if (day[0]) {
      return index + 1;
    }
  });

  return parsedDays;
}

function getETTime() {
  const rawStart = getAdminPanel()
    .getSheetByName("Time Control")
    .getRange("D2")
    .getValue();
  const rawEnd = getAdminPanel()
    .getSheetByName("Time Control")
    .getRange("E2")
    .getValue();

  const parsedTime = {
    startHour: rawStart.getHours(),
    startMin: rawStart.getMinutes(),
    endHour: rawEnd.getHours(),
    endMin: rawEnd.getMinutes(),
  };

  return parsedTime;
}
