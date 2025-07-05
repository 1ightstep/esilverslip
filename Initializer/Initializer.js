function initializer() {
  const initializerSS = SpreadsheetApp.openById(
    "1kVroS3iBc03IdKMpu5CqlfVAjosgwN7CSfQwM2Hr8N4"
  ); //ESGlobal not necessary since it's one time use
  const teacherInfo = initializerSS
    .getSheetByName("initializer")
    .getRange(2, 1, initializerSS.getLastRow(), initializerSS.getLastColumn())
    .getValues();
  const targetFolder = DriveApp.getFolderById(ESGlobal.getSheetsFolderId());
  const template = DriveApp.getFileById(ESGlobal.getUpdaterTemplateId());

  const folderFiles = targetFolder.getFilesByType(MimeType.GOOGLE_SHEETS);
  while (folderFiles.hasNext()) {
    const file = folderFiles.next();
    file.setTrashed(true);
  }
  Logger.log("Deleted all spreadsheets in target folder.");
  Logger.log("Now cloning template/master spreadsheet.");

  teacherInfo.forEach((info) => {
    if (info[0] && info[1]) {
      const newName = `Teacher Sheet - ${info[0]}`;
      const newSS = template.makeCopy(newName, targetFolder);

      newSS.addEditor(info[1]);
      ESGlobal.sendUpdateEmail(info[1], info[0], newSS.getUrl());

      Logger.log(`${newName} has been added.`);
    }
  });
}
