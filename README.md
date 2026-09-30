# eSilverslip

eSilverslip is the digital pass system for Embedded Time (ET), the school-wide work period at Gabrielino High School in San Gabriel, CA. During ET, students can request to spend the period in another teacher's room. eSilverslip handles those requests from start to finish with Google Forms, Sheets, Gmail and Drive, connected through Google Apps Script.

It is used by 1,300+ students and 60+ teachers, handles 1,300+ pass requests each week, and saves each teacher about 2 hours a week.

## How it works

1. **A student requests a pass.** The student fills out a Google Form and picks their homeroom teacher, the teacher they want to visit and the reason. Teachers are listed as "Name @ Room", and the list updates from the teacher database. The form only accepts responses on ET days and times.
2. **The request is routed to the right teacher.** The system checks the destination teacher's settings:
   - If the student already sent the same request, it is rejected so the same pass isn't processed twice.
   - If the teacher uses **automatic mode**, the student is accepted right away until the room reaches its limit, and then new requests are rejected as "Full room."
   - If the teacher is marked absent (**substitute mode**), the request is rejected with the reason "Teacher absent."
   - Otherwise, the request goes to the teacher as pending.
3. **Teachers approve or reject from their own sheet.** Each teacher has a Google Sheet with an **Incoming** tab (students who want to come in) and an **Outgoing** tab (their own homeroom students who are leaving). A custom menu lets teachers submit admissions, mark absences and save their settings (automatic mode, substitute mode and room limit).
4. **Everyone gets notified.** Students get an email when a pass is approved or rejected, with the reason if it was rejected. Once a pass is approved, the student shows up on the homeroom teacher's Outgoing tab. Students marked absent are greyed out there. Teachers can also use a separate form to ask a specific student to come to their room.
5. **The system resets itself.** Teacher sheets clear every afternoon, and each ET day's requests are saved to a dated history tab in the student database.

## Admin tools

- **Time Control:** an admin panel sheet sets which days ET runs and its start and end times.
- **Initializer form:** creates a new teacher sheet from the master template, shares it with the teacher and emails them the link.
- **Removal form:** deletes a teacher's sheet and clears their record from the teacher database.
- **Updater:** rebuilds every teacher sheet from the master template when the template changes.
- **Web app API:** teacher sheets send accept, reject, absent and settings updates to the central databases through `doGet` and `doPost`.

## Repository layout

| Folder / file | What it contains |
|---|---|
| `RequestForm.js` | Student pass request form: fills the teacher list, handles submissions, opens and closes the form during ET |
| `TeacherRequestForm.js` | Form teachers use to request a specific student |
| `InitializerForm.js`, `RemovalForm.js` | Forms that add or remove a teacher's sheet |
| `Codebase/ESLogic` | The routing rules for each request |
| `Codebase/ESGlobal` | Shared library: accept, reject, pending and absent handling, emails, student and teacher databases, admin panel settings |
| `Codebase/Server` | Web app endpoints used by teacher sheets |
| `Databases` | Scripts for the student and teacher databases, including the daily history archive |
| `Updater` | Master teacher sheet code (custom menu, daily reset, server calls) and the script that rebuilds teacher sheets |
