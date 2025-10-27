const API_WEBAPP_URL = "API_WEBAPP_URL_PLACEHOLDER";

function updateTeacherSettings(formId, settings) {
  const response = UrlFetchApp.fetch(API_WEBAPP_URL, {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify({
      action: "updateSettings",
      formId: formId,
      settings: settings,
    }),
    muteHttpExceptions: true,
  });

  const code = response.getResponseCode();
  if (code !== 200) {
    throw new Error(
      "Error when updating teacher settings. " + response.getContentText()
    );
  }

  return JSON.parse(response.getContentText());
}

function getTeacherData(formName) {
  const response = UrlFetchApp.fetch(
    API_WEBAPP_URL + "?formName=" + encodeURIComponent(formName),
    {
      method: "get",
      muteHttpExceptions: true,
    }
  );

  const code = response.getResponseCode();
  if (code !== 200) {
    throw new Error("Error when fetching teacher data.");
  }

  return JSON.parse(response.getContentText());
}

function handleAccept(studentBundle, teacherBundle) {
  const response = UrlFetchApp.fetch(API_WEBAPP_URL, {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify({
      action: "accept",
      studentBundle: studentBundle,
      teacherBundle: teacherBundle,
    }),
    muteHttpExceptions: true,
  });

  const code = response.getResponseCode();
  if (code !== 200) {
    throw new Error("Error when handling accept.");
  }

  return JSON.parse(response.getContentText());
}

function handleReject(studentBundle, teacherBundle, reason) {
  const response = UrlFetchApp.fetch(API_WEBAPP_URL, {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify({
      action: "reject",
      studentBundle: studentBundle,
      teacherBundle: teacherBundle,
      reason: reason,
    }),
    muteHttpExceptions: true,
  });

  const code = response.getResponseCode();
  if (code !== 200) {
    throw new Error("Error when handling reject.");
  }

  return JSON.parse(response.getContentText());
}

function handleAbsent(studentBundle) {
  const response = UrlFetchApp.fetch(API_WEBAPP_URL, {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify({
      action: "absent",
      studentBundle: studentBundle,
    }),
    muteHttpExceptions: true,
  });

  const code = response.getResponseCode();
  if (code !== 200) {
    throw new Error("Error when submitting absences.");
  }

  return JSON.parse(response.getContentText());
}

function removeAbsent(studentBundle) {
  const response = UrlFetchApp.fetch(API_WEBAPP_URL, {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify({
      action: "removeAbsent",
      studentBundle: studentBundle,
    }),
    muteHttpExceptions: true,
  });

  const code = response.getResponseCode();
  if (code !== 200) {
    throw new Error("Error when submitting absences.");
  }

  return JSON.parse(response.getContentText());
}
