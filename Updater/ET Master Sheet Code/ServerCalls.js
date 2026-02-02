const API_WEBAPP_URL = "PLACEHOLDER";

function parseApiResponse(response, errorMessage) {
  let result;
  try {
    result = JSON.parse(response.getContentText());
  } catch (error) {
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
  return parseApiResponse(response, "Failed to update teacher settings.");
}

function getTeacherData(formName) {
  const response = UrlFetchApp.fetch(
    API_WEBAPP_URL + "?formName=" + encodeURIComponent(formName),
    {
      method: "get",
      muteHttpExceptions: true,
    },
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
      teacherBundle: teacherBundle,
      studentBundle: studentBundle,
    }),
    muteHttpExceptions: true,
  });

  const code = response.getResponseCode();
  if (code !== 200) {
    alert("HTTP error: Failed to accept student bundle.");
    return null;
  }
  return parseApiResponse(
    response,
    `Failed to accept ${studentBundle.name}. Please email the student instead.`,
  );
}

function handleReject(studentBundle, teacherBundle, reason) {
  const response = UrlFetchApp.fetch(API_WEBAPP_URL, {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify({
      action: "reject",
      teacherBundle: teacherBundle,
      studentBundle: studentBundle,
      reason: reason,
    }),
    muteHttpExceptions: true,
  });

  const code = response.getResponseCode();
  if (code !== 200) {
    alert("HTTP error: Failed to reject student bundle.");
    return null;
  }

  return parseApiResponse(
    response,
    `Failed to reject ${studentBundle.name}. Don't worry about it.`,
  );
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
    `Failed to mark ${studentBundle.name} absent. Don't worry about it`,
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
    return;
  }
  return parseApiResponse(
    response,
    `Failed to remove ${studentBundle.name}'s absence. Contact the ET team immediately.`,
  );
}
