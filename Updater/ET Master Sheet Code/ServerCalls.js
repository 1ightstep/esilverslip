const API_WEBAPP_URL = "API_WEBAPP_URL_PLACEHOLDER";

function parseApiResponse(response, errorMessage) {
  const result = JSON.parse(response.getContentText());
  if (result.status && result.status !== "ok") {
    alert(errorMessage);
  }
  return result;
}

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
    alert("HTTP error: Failed to update teacher settings.");
    return null;
  }
  return parseApiResponse(response, "Failed to update teacher settings");
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
    alert("HTTP error: Failed to fetch teacher data.");
    return null;
  }
  return parseApiResponse(response, `Failed to fetch teacher data."`);
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
    alert("HTTP error: Failed to accept student bundle.");
    return null;
  }
  return parseApiResponse(response, `Failed to accept ${studentBundle.name}`);
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
    alert("HTTP error: Failed to reject student bundle.");
    return null;
  }
  return parseApiResponse(response, `Failed to reject ${studentBundle.name}`);
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
    alert("HTTP error: Failed to mark student absent.");
    return null;
  }
  return parseApiResponse(
    response,
    `Failed to mark ${studentBundle.name} absent`
  );
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
    alert("HTTP error: Failed to remove student absence.");
    return null;
  }
  return parseApiResponse(
    response,
    `Failed to remove ${studentBundle.name}'s absence`
  );
}
