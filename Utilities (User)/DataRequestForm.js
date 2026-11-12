function onSubmit(e) {
  // Local accessor for studentdb
  var studentSpreadsheet = SpreadsheetApp.openById(ESGlobal.getStudentDatabaseId());
  var formResponse = e.response;
  var itemResponses = formResponse.getItemResponses();

  var recipientEmail = formResponse.getRespondentEmail();
  var dateRequested = itemResponses[0].getResponse();
  var teachersDataRequested = itemResponses[1].getResponse();


 ESGlobal.sendDataEmail(recipientEmail,
    ESGlobal.findName(recipientEmail),
    dateRequested,
    teachersDataRequested,
    ESGlobal.getListCount (studentSpreadsheet,dateRequested, teachersDataRequested, 3), // Count for incoming
    ESGlobal.getStudents(studentSpreadsheet,dateRequested, teachersDataRequested, 3), // Names for incoming
    ESGlobal.getListCount (studentSpreadsheet, dateRequested, teachersDataRequested, 2), // Count for outgoing
    ESGlobal.getStudents(studentSpreadsheet, dateRequested, teachersDataRequested, 2)); // Names for outgoing
}

// Sorts in ascending order (A-Z), accounts for capitalized only
function sortTeachers() {
  const form = FormApp.getActiveForm();
  // Grabs the proper dropdown (by name) with the aggregated items in the form
  const dropdown = form.getItems(FormApp.ItemType.LIST)
    .map(item => item.asListItem())
    .find(item => item.getTitle() === "Teacher Requested (choose whose data you want to access)");
  // Converts all of the values in the dropdown into a list
  const teacherList = dropdown.getChoices().map(choice => choice.getValue());
  // Sorts alphabetically, only accounts for uppercase
  dropdown.setChoiceValues(teacherList.sort());
}

// Recycled from studentDB
function getDate() {
  const date = new Date();
  const formattedDate = date.toLocaleDateString("en-US");
  return formattedDate;
}

// Recycled from studentDB
function getDay() {
  const date = new Date();
  const day = date.getDay();
  return day;
}

// New function that updates dates, derived from studentDB's makeHistory
function updateDates() {
  // Only updates on days which includes ET days
  if (ESGlobal.getETDays().includes(getDay())) {
    const form = FormApp.getActiveForm();

    // Same logic as sortTeachers()
    const dropdown = form.getItems(FormApp.ItemType.LIST)
    .map(item => item.asListItem())
    .find(item => item.getTitle() === "Date of Data");

    // If the dropdown with the name is found then run this
    if (dropdown) {
      // Iterates the dropdown's values into a const called choices
      const choices = dropdown.getChoices().map(choice => choice.getValue());
      if (!choices.includes(getDate())) {
        // Pushes new date & removes earliest date
        choices.push(getDate());
        const newChoices = choices.slice(1);
        // Sets the new choices for the dropdown
        dropdown.setChoiceValues(newChoices);
      } 
    }
  }
}