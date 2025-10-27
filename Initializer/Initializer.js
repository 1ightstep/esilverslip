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

  Logger.log("Now cloning template/master spreadsheet.");

  teacherInfo.forEach((info, _index) => {
    if (info[0] && info[1]) {
      try {
        const newName = `Teacher Sheet - ${info[0].trim()}`;
        const newSS = template.makeCopy(newName, targetFolder);

        newSS.addEditor(info[1].trim());
        ESGlobal.sendUpdateEmail(
          info[1].trim(),
          info[0].trim(),
          newSS.getUrl()
        );

        Logger.log(`Added ${newName}.`);
        initializerSS.getSheetByName("initializer").deleteRow(_index + 2);
      } catch (err) {
        Logger.log(`Failed to create ${newName} | err: ${err}`);
      }
    }
  });
}
