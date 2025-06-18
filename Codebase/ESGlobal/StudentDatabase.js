class StudentDatabase {
  constructor(dbSheetName = "db") {
    this.db = getStudentDatabase(dbSheetName);
  }

  updateData(email, name, homeroom, destination, purpose, status) {
    const data = this.getAllValues();
    const targetRow = data.findIndex((row) => row[0] === email) + 2; //+2 since getAllValues() starts grabbing @ row 2

    const newData = [email, name, homeroom, destination, purpose, status];

    if (targetRow >= 2) {
      this.db
        .getRange(targetRow + 1, 1, 1, this.db.getLastColumn())
        .setValues([newData]);
    } else {
      this.addData(email, name, homeroom, destination, purpose, status);
    }
  }

  addData(email, name, homeroom, destination, purpose, status) {
    this.db.appendRow([email, name, homeroom, destination, purpose, status]);
  }

  getData(email) {
    return this.dataExists(email) || [];
  }

  dataExists(email) {
    const data = this.getAllValues();
    const row = data.find((row) => row[0] === email);
    return row || false;
  }

  resetAll() {
    if (this.db.getLastRow() > 1) {
      this.db
        .getRange(2, 2, this.db.getLastRow() - 1, this.db.getLastColumn() - 1)
        .clearContent();
    }
  }

  getAllValues() {
    return this.db
      .getRange(2, 1, this.db.getLastRow(), this.db.getLastColumn())
      .getValues();
  }
}
