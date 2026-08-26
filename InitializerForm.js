function initialize(formName, gmail) {
  const targetFolder = DriveApp.getFolderById(ESGlobal.getSheetsFolderId());
  const template = DriveApp.getFileById(ESGlobal.getUpdaterTemplateId());

  Logger.log("Now cloning template/master spreadsheet.");

  try {
    const newName = `Teacher Sheet - ${formName.trim()}`;
    const newSS = template.makeCopy(newName, targetFolder);

    newSS.addEditor(gmail.trim());
    ESGlobal.sendUpdateEmail(gmail.trim(), formName.trim(), newSS.getUrl());
  } catch {
    Logger.log(`Error creating Teacher Sheet - ${formName.trim()}`);
  }

  Logger.log(`Added Teacher Sheet - ${formName.trim()}`);
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

  initialize(formName, gmail);
}
