function updater() {
  const teacherInfo = ESGlobal.accessTeacherDB().getAllValues();
  const targetFolder = DriveApp.getFolderById(ESGlobal.getSheetsFolderId());
  const template = DriveApp.getFileById(ESGlobal.getUpdaterTemplateId());

  const folderFiles = targetFolder.getFilesByType(MimeType.GOOGLE_SHEETS);
  while (folderFiles.hasNext()) {
    const file = folderFiles.next(); 
    file.setTrashed(true);
  }
  Logger.log("Deleted all spreadsheets in target folder.")
  Logger.log("Now cloning template/master spreadsheet.")

  teacherInfo.forEach((info) => {
    if (info[0]) {
      try {
        const newName = `Teacher Sheet - ${info[1].trim()}`;
        const newSS = template.makeCopy(newName, targetFolder);
        const newSSId = newSS.getId(); 

        ESGlobal.accessTeacherDB().setData(info[0], {
          newSheetId: newSSId, 
          formName: info[1].trim(), 
          room: info[2].trim(), 
          email: info[3].trim(), 
          automaticMode: info[4].trim(), 
          substituteMode: info[5].trim(), 
          maxAdditions: info[6]
        });
        newSS.addEditor(info[3].trim());
        ESGlobal.sendUpdateEmail(info[3].trim(), info[1].trim(), newSS.getUrl());

        Logger.log(`Updated ${newName}.`)
      } catch (err) {
        Logger.log(`Failed to create ${newName} | err: ${err}`);
      }
    }
  });
}
