function updateFormItems() {
  var teacherDatabase = ESGlobal.getTeacherDatabase("db");
  var mainForm = ESGlobal.getRequestForm();

  var teacherNames = teacherDatabase
    .getRange(2, 2, teacherDatabase.getLastRow(), 1)
    .getValues();
  var teacherRooms = teacherDatabase
    .getRange(2, 3, teacherDatabase.getLastRow(), 1)
    .getValues();
  var listItems = [];

  for (var i = 0; i < teacherNames.length; i++) {
    if (teacherNames[i] != "" && teacherRooms[i] != "") {
      listItems.push(`${teacherNames[i]} @ ${teacherRooms[i]}`);
    }
  }
  listItems.sort();
  var formItems = mainForm.getItems(FormApp.ItemType.LIST);
  var homeroomList = formItems[0].asListItem();
  var destinationList = formItems[1].asListItem();
  homeroomList.setChoiceValues(listItems);
  destinationList.setChoiceValues(listItems);
}

function onSubmit(e) {
  var formResponse = e.response;
  var itemResponses = formResponse.getItemResponses();

  var email = formResponse.getRespondentEmail();
  var name = itemResponses[0].getResponse();
  var homeroom = itemResponses[1].getResponse();
  var destination = itemResponses[2].getResponse();
  var purpose = itemResponses[3].getResponse();

  if (homeroom != destination) {
    ESLogic.onStudentSubmit(email, name, homeroom, destination, purpose);
  }
}

function getTime() {
  const date = new Date();
  const day = date.getDay();

  const hour = date.getHours();
  const minute = date.getMinutes();

  return {
    day: day,
    hour: hour,
    minute: minute,
  };
}

function autoOpen() {
  var mainForm = ESGlobal.getRequestForm();
  const isETTime =
    getTime().hour >= ESGlobal.getETTime().startHour &&
    getTime() >= ESGlobal.getETTime().startMin &&
    getTime().hour <= ESGlobal.getETTime().endHour &&
    getTime() <= ESGlobal.getETTime().endMin;

  if (ESGlobal.getETDays().includes(getTimeFrame().day) && isETTime) {
    mainForm.setAcceptingResponses(true);
  } else {
    mainForm.setAcceptingResponses(false);
  }
}
