function getFormID() {
  let sheetId = SpreadsheetApp.getActive().getId();
  return sheetId;
}

function saveSettings() {
  let setSheet = SpreadsheetApp.getActive().getSheetByName("Settings");
  let incSheet = SpreadsheetApp.getActive().getSheetByName("Incoming");
  let incMax = incSheet.getLastRow() - 2;

  let range = setSheet.getRange("C2:C8");
  let data = range.getValues();

  const settings = {
    formName: data[0][0],
    room: data[1][0],
    email: data[2][0],
    automaticMode: data[4][0],
    substituteMode: data[5][0],
    maxAdditions: data[3][0],
  };
  if (settings.maxAdditions >= 1 && settings.maxAdditions <= 100) {
    if (settings.maxAdditions > incMax) {
      let example = incSheet.getRange(
        incSheet.getLastRow(),
        1,
        1,
        incSheet.getLastColumn()
      );
      for (let i = 0; i < settings.maxAdditions - incMax; i++) {
        incSheet.appendRow([incMax + i + 1]);
        let newRow = incSheet.getRange(
          incSheet.getLastRow(),
          1,
          1,
          incSheet.getLastColumn()
        );
        example.copyTo(newRow, { formatOnly: true });
      }
    } else if (settings.maxAdditions < incMax) {
      incSheet.deleteRows(
        settings.maxAdditions + 3,
        incMax - settings.maxAdditions
      );
      updateSequence();
    }

    const formId = SpreadsheetApp.getActive().getId();
    ESGlobal.accessTeacherDB().updateSettings(formId, settings);
  }
}

function updateSequence() {
  let incSheet = SpreadsheetApp.getActive().getSheetByName("Incoming");
  incSheet.getRange("A3:A" + incSheet.getLastRow()).clearContent();
  let sequence = generateSequence(incSheet.getLastRow() - 2);
  incSheet.getRange("A3:A" + incSheet.getLastRow()).setValues(sequence);
}

function generateSequence(length) {
  let sequence = [];
  for (let i = 1; i <= length; i++) {
    sequence.push([i]);
  }
  return sequence;
}

function submitAdmissions() {
  let incSheet = SpreadsheetApp.getActive().getSheetByName("Incoming");
  let setSheet = SpreadsheetApp.getActive().getSheetByName("Settings");
  let setName = setSheet.getRange("C2").getValue();
  let setRoom = setSheet.getRange("C3").getValue();

  let range = incSheet.getRange("B3:G" + incSheet.getLastRow());
  let data = range.getValues();

  data.forEach((student, index) => {
    if (student[0]) {
      const studentBundle = {
        email: student[0],
        name: student[1],
        homeroom: student[2],
        destination: setName + " @ " + setRoom,
        purpose: student[3],
      };
      const teacherBundle = {
        destSheetId: getFormID(),
        destTeacher: setName,
        homeSheetId: ESGlobal.accessTeacherDB().getData(
          student[2].split(" @ ")[0]
        )[0],
        homeTeacher: student[2].split(" @ ")[0],
      };

      if (student[4]) {
        ESGlobal.handleAccept(teacherBundle, studentBundle);
      } else {
        ESGlobal.handleReject(teacherBundle, studentBundle, "Full room "); // ;)
        data[index] = ["", "", "", "", false, false];
      }
    }
  });

  range.setValues(data);
}

function submitAbsences() {
  let incSheet = SpreadsheetApp.getActive().getSheetByName("Incoming");
  let setSheet = SpreadsheetApp.getActive().getSheetByName("Settings");
  let setName = setSheet.getRange("C2").getValue();
  let setRoom = setSheet.getRange("C3").getValue();

  let range = incSheet.getRange("B3:G" + incSheet.getLastRow());
  let data = range.getValues();

  data.forEach((student) => {
    if (student[0]) {
      const studentBundle = {
        email: student[0],
        name: student[1],
        homeroom: student[2],
        destination: setName + " @ " + setRoom,
        purpose: student[3],
      };

      if (student[5]) {
        ESGlobal.handleAbsent(studentBundle);
      }
    }
  });
}

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
}
