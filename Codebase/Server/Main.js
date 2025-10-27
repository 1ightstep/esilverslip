function doGet(e) {
  try {
    const formName = e.parameter.formName;

    const teacherData = ESGlobal.accessTeacherDB().getData(formName);

    return ContentService.createTextOutput(
      JSON.stringify(teacherData)
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", message: error.message })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  let result;

  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action;

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

      case "removeAbsent":
        ESGlobal.removeAbsent(data.studentBundle);
        result = { status: "ok", message: "Handled removeAbsent." };
        break;

      default:
        result = { status: "error", message: "Unknown action" };
        break;
    }
  } catch (error) {
    result = { status: "error", message: error.message };
  }

  return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(
    ContentService.MimeType.JSON
  );
}
