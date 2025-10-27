function hasStudent() {
  const ss = SpreadsheetApp.getActive();
  const incSheet = ss.getSheetByName("Incoming");
  const outSheet = ss.getSheetByName("Outgoing");

  const incomingRange = incSheet.getRange(
    "B3:G" + Math.max(incSheet.getLastRow(), 3)
  );
  const outgoingRange = outSheet.getRange("B3:E38");

  const incoming = incomingRange
    .getValues()
    .some((row) => row.slice(0, 4).some((cell) => cell !== ""));
  const outgoing = outgoingRange
    .getValues()
    .some((row) => row.slice(0, 3).some((cell) => cell !== ""));

  return incoming || outgoing;
}

function updateSequence() {
  let incSheet = SpreadsheetApp.getActive().getSheetByName("Incoming");
  incSheet.getRange("A3:A" + incSheet.getLastRow()).clearContent();
  let sequence = generateSequence(incSheet.getLastRow() - 2);
  incSheet.getRange("A3:A" + incSheet.getLastRow()).setValues(sequence);
}

function generateSequence(length) {
  let sequence = [];
  for (let i = 1; i <= length; i++) {
    sequence.push([i]);
  }
  return sequence;
}
