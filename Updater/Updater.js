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
      const newName = `Teacher Sheet - ${info[1].trim()}`;
      try {
        const newSS = template.makeCopy(newName, targetFolder);

        ESGlobal.accessTeacherDB().setData(info[0], {
          newSheetId: null,
          formName: null,
          room: null,
          email: null,
          automaticMode: null,
          substituteMode: null,
          maxAdditions: null,
        });
        newSS.addEditor(info[3].trim());
        ESGlobal.sendUpdateEmail(
          info[3].trim(),
          info[1].trim(),
          newSS.getUrl()
        );

        Logger.log(`Updated ${newName}.`);
      } catch (err) {
        Logger.log(`Failed to create ${newName} | err: ${err}`);
      }
    }
  });
}
