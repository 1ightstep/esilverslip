function getDateTime() {
  let date = new Date();

  const [month, day, year] = [
    date.getMonth(),
    date.getDate(),
    date.getFullYear(),
  ];

  let time = date.toLocaleTimeString();

  return `${month}/${day}/${year} ${time}`;
}

function acceptHTML(studentName, destination, homeroom) {
  const template = HtmlService.createTemplateFromFile("Accept");
  template.name = studentName;
  template.datetime = getDateTime();
  template.destination = destination;
  template.homeroom = homeroom;

  return template.evaluate().getContent();
}
function sendAcceptEmail(recipientEmail, studentName, destination, homeroom) {
  const htmlBody = acceptHTML(studentName, destination, homeroom);

  GmailApp.sendEmail(
    recipientEmail,
    `✅ Pass Approved For ${studentName}`,
    "",
    {
      htmlBody: htmlBody,
    }
  );
}

function rejectHTML(studentName, destination, reason) {
  const template = HtmlService.createTemplateFromFile("Reject");
  template.name = studentName;
  template.datetime = getDateTime();
  template.destination = destination;
  template.reason = reason;

  return template.evaluate().getContent();
}
function sendRejectEmail(recipientEmail, studentName, destination, reason) {
  const htmlBody = rejectHTML(studentName, destination, reason);

  GmailApp.sendEmail(
    recipientEmail,
    `❌ Pass Rejected For ${studentName}`,
    "",
    {
      htmlBody: htmlBody,
    }
  );
}

function updateHTML(teacherName, newSSUrl) {
  const template = HtmlService.createTemplateFromFile("Update");
  template.name = teacherName;
  template.url = newSSUrl;

  return template.evaluate().getContent();
}
function sendUpdateEmail(recipientEmail, teacherName, newSSUrl) {
  const htmlBody = updateHTML(teacherName, newSSUrl);

  GmailApp.sendEmail(
    recipientEmail,
    `Your ET Sheet Was Updated, Please Follow The Instructions`,
    "",
    {
      htmlBody: htmlBody,
    }
  );
}

function requestHTML(studentGmail, teacherGmail) {
  const template = HtmlService.createTemplateFromFile("Request");
  template.studentGmail = studentGmail;
  template.teacherGmail = teacherGmail;

  return template.evaluate().getContent();
}
function sendRequestEmail(studentGmail, teacherGmail) {
  const htmlBody = requestHTML(studentGmail, teacherGmail);

  GmailApp.sendEmail(studentGmail, `‼️ Teacher Request ‼️`, "", {
    htmlBody: htmlBody,
  });
}
