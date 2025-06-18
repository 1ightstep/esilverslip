function getTeacherDatabase(sheetName) {
  return SpreadsheetApp.openById(getTeacherDatabaseId()).getSheetByName(
    sheetName
  );
}
function getTeacherDatabaseId() {
  return "14dpcYSc2czxXPRXEUd7KpXuo5htTYUMR9D-lbFv2zhg";
}

function getStudentDatabase(sheetName) {
  return SpreadsheetApp.openById(getStudentDatabaseId()).getSheetByName(
    sheetName
  );
}
function getStudentDatabaseId() {
  return "1xVmxYbDLOya0v3Lp81QaKW0ngfjmKI3CbPkG6HLj8-4";
}

function getRequestForm() {
  return FormApp.openById(getRequestFormId());
}
function getRequestFormId() {
  return "1kQRi6xMxOI9fbBLFIm5_K93RfD_O9cCfR0FBtbQvPp0";
}

function getUpdaterTemplate() {
  return SpreadsheetApp.openById(getUpdaterTemplateId());
}
function getUpdaterTemplateId() {
  return "1wN5-i-UzlyMcVYJdpMeKPVdjDs7q8FciXdg3M2ny2lc";
}

function accessTeacherDB() {
  return new TeacherDatabase("db");
}

function accessStudentDB() {
  return new StudentDatabase("db");
}

function getSheetsFolderId() {
  return "1-HmF3zLgplS4JLxvwNyV3ny9mvb5WrIZ";
}
