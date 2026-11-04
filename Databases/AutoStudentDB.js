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
  if (ESGlobal.getETDays().includes(getDay())) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const ogSheet = ss.getSheetByName("db");
    const sheetName = getDate();

    const newSheet = ogSheet.copyTo(ss);
    newSheet.setName(sheetName);
    ss.setActiveSheet(newSheet);
    ss.moveActiveSheet(3);

    clearDB();
  }
}

function sortingNewestToOldest() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheets = ss.getSheets();

  // filters out the db and Copy of db
  let datedData = sheets.filter(function(sheet) {
    return sheet.getName() != "db" &&
    sheet.getName() != "Copy of db";
    })
    // returns a new array with objects with two instance properties, sheet (name) and timestamp
    .map(function(sheet) {
      return {
        sheet: sheet,
        // not quite a unix timestamp as js puts it in ms instead of sec
        timestamp: new Date(sheet.getName()).getTime()
      };
    });
  
  // js's built in sorting algorithm, compares the neighbor's timestamp to determines who moves
  datedData.sort(function(a, b) {
    return b.timestamp - a.timestamp;
  });

  // actual moving part, for every object there's an entry sheet and the index it's supposed to be in for its arguments
  // the entry sheet is then selected and moved to the index + 3 as we want to avoid db & db copy (google sheet's indexes start from 1)
  datedData.forEach(function(entry, index) {
    ss.setActiveSheet(entry.sheet);
    ss.moveActiveSheet(index + 3);
  });
}