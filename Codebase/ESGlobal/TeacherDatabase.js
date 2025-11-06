class TeacherDatabase {
  constructor(dbSheetName = "db") {
    this.db = getTeacherDatabase(dbSheetName);
  }

  updateSettings(
    sheetId,
    { formName, room, email, automaticMode, substituteMode, maxAdditions }
  ) {
    const data = this.getAllValues();
    const targetRow = data.findIndex((row) => row[0] === sheetId) + 2; //+2 since getAllValues() starts grabbing @ row 2

    if (targetRow >= 2) {
      const currStudents = this.db
        .getRange(targetRow, this.db.getLastColumn())
        .getValue();
      const newData = [
        sheetId,
        formName.trim(),
        room.trim(),
        email.trim(),
        automaticMode,
        substituteMode,
        maxAdditions,
        currStudents,
      ];
      this.db
        .getRange(targetRow, 1, 1, this.db.getLastColumn())
        .setValues([newData]);
    } else {
      this.addData(sheetId, {
        formName: formName.trim(),
        room: room.trim(),
        email: email.trim(),
        automaticMode,
        substituteMode,
        maxAdditions,
      });
    }

    ESRequestForm.updateFormItems();
  }

  addData(
    sheetId,
    { formName, room, email, automaticMode, substituteMode, maxAdditions }
  ) {
    const data = this.getAllValues();
    const duplicate = data.find((row) => row[1] === formName);

    if (!duplicate) {
      this.db.appendRow([
        sheetId,
        formName.trim(),
        room.trim(),
        email.trim(),
        automaticMode,
        substituteMode,
        maxAdditions,
        0,
      ]);
    }

    ESRequestForm.updateFormItems();
  }

  setData(
    prevSheetId,
    {
      newSheetId,
      formName,
      room,
      email,
      automaticMode,
      substituteMode,
      maxAdditions,
    }
  ) {
    const data = this.getAllValues();
    const targetRow = data.findIndex((row) => row[0] === prevSheetId) + 2; //+2 since getAllValues() starts grabbing @ row 2
    if (targetRow >= 2) {
      const currStudents = this.db
        .getRange(targetRow, this.db.getLastColumn())
        .getValue();
      const newData = [
        newSheetId,
        formName.trim(),
        room.trim(),
        email.trim(),
        automaticMode,
        substituteMode,
        maxAdditions,
        currStudents,
      ];
      this.db
        .getRange(targetRow, 1, 1, this.db.getLastColumn())
        .setValues([newData]);
    }

    ESRequestForm.updateFormItems();
  }

  getData(formName) {
    return this.dataExists(formName) || [];
  }

  dataExists(formName) {
    const data = this.getAllValues();
    const row = data.find((row) => row[1].trim() === formName.trim());
    return row || false;
  }

  isTeacherFull(formName) {
    const data = this.getData(formName.trim());
    if (data.length < 8) return false;
    return data[7] >= data[6];
  }

  changeCurrentStudent(formName, changeByVal) {
    const data = this.getAllValues();
    const rowData = this.getData(formName.trim());
    const targetRow = data.findIndex((row) => row[1].trim() === formName.trim()) + 2; //+2 since getAllValues() starts grabbing @ row 2

    if (targetRow >= 2 && rowData.length >= 8) {
      rowData[7] = rowData[7] + changeByVal;
      this.db
        .getRange(targetRow, 1, 1, this.db.getLastColumn())
        .setValues([rowData]);
    }
  }

  getAllValues() {
    return this.db
      .getRange(2, 1, this.db.getLastRow(), this.db.getLastColumn())
      .getValues();
  }
}
