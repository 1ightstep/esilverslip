function doGet(e) {
  const formName = e.parameter.formName;

  const teacherData = ESGlobal.accessTeacherDB().getData(formName);

  return ContentService.createTextOutput(
    JSON.stringify(teacherData)
  ).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const action = data.action;

  let result;

  switch (action) {
    case "updateSettings":
      ESGlobal.accessTeacherDB().updateSettings(data.formId, data.settings);
      result = { status: "ok", message: "Updated teacher settings." };
      break;
    case "accept":
      ESGlobal.handleAccept(data.studentBundle, data.teacherBundle);
      result = { status: "ok", message: "Handled accept." };
      break;

    case "reject":
      ESGlobal.handleReject(
        data.studentBundle,
        data.teacherBundle,
        data.reason
      );
      result = { status: "ok", message: "Handled reject." };
      break;

    case "absent":
      ESGlobal.handleAbsent(data.studentBundle);
      result = { status: "ok", message: "Handled absent." };
      break;

    case "isETTime":
      const isETTime = ESGlobal.isETTime();
      result = { status: "ok", message: isETTime };
      break;

    default:
      result = { status: "error", message: "Unknown action" };
      break;
  }

  return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(
    ContentService.MimeType.JSON
  );
}
