function updater() {
  const teacherInfo = ESGlobal.accessTeacherDB().getAllValues();
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
    if (info[0]) {
      const newName = `Teacher Sheet - ${info[1]}`;
      const newSS = template.makeCopy(newName, targetFolder);
      const newSSId = newSS.getId();

      ESGlobal.accessTeacherDB().setData(info[0], {
        newSheetId: newSSId,
        formName: info[1],
        room: info[2],
        email: info[3],
        automaticMode: info[4],
        substituteMode: info[5],
        maxAdditions: info[6],
      });

      newSS.addEditor(info[3]);
      ESGlobal.sendUpdateEmail(info[3], info[1], newSS.getUrl());

      Logger.log(`${newName} has been updated.`);
    }
  });
}
