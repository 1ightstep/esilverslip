function onOpen() {
  createCustomUI();
}

function createCustomUI() {
  SpreadsheetApp.getUi()
    .createMenu("🛠️ ES Utilities 🛠️")
    .addItem("✅ Submit Admissions ✅", "submitAdmissions")
    .addItem("❌ Submit Absences ❌", "submitAbsences")
    .addItem("💾 Save Settings 💾", "saveSettings")
    .addToUi();
}
