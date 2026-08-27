function remove(formName, gmail) {
  const targetFolder = DriveApp.getFolderById(ESGlobal.getSheetsFolderId());
  const files = targetFolder.getFilesByType(MimeType.GOOGLE_SHEETS);

  while (files.hasNext()) {
    const file = files.next();
    // Check if shared with user AND matches the specific formName
    const matchesForm = file.getName().includes(formName);
    const hasTargetUser = file
      .getEditors()
      .some((user) => user.getEmail().toLowerCase() === gmail.toLowerCase());

    if (matchesForm && hasTargetUser) {
      file.setTrashed(true);
      Logger.log(
        "Deleted sheet: " + file.getName() + " (ID: " + file.getId() + ")",
      );
    }
  }

  const targetUser = ESGlobal.accessTeacherDB().dataExists(formName);
  if (targetUser) {
    const targetSSId = targetUser[0];

    ESGlobal.accessTeacherDB().setData(targetSSId, {
      newSheetId: "",
      formName: "",
      room: "",
      email: "",
      automaticMode: "",
      substituteMode: "",
      maxAdditions: "",
    });
  }

  Logger.log(`All traces tied with ${gmail} have been removed.`);
}

function onSubmit(e) {
  const itemResponses = e.response.getItemResponses();
  let formName = "";
  let gmail = "";

  for (let i = 0; i < itemResponses.length; i++) {
    const question = itemResponses[i].getItem().getTitle();
    const answer = itemResponses[i].getResponse();

    if (question === "Form Name") formName = answer;
    if (question === "Gmail") gmail = answer;
  }

  remove(formName.trim(), gmail.trim());
}
