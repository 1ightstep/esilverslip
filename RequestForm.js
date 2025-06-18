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
      listItems.push(`${teacherNames[i]} (${teacherRooms[i]})`);
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
