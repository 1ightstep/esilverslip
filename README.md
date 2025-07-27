This program built on Google Apps Script and HTML/JS has the inteneded purpose of manging 1000 students at a school <br/>

## Features<br/>

- **Student Request Form** – allows students to submit requests (e.g. schedule changes, resource needs)  <br/>
- **Teacher Approval Form** – lets teachers view and approve or reject incoming student requests  <br/>
- **Automated Updater Scripts** – processes form submissions, updates the Google Sheet database, and notifies stakeholders  <br/>
- **Initializer Script** – bootstraps your Google Sheet with the necessary columns, sheets, and default data  <br/>
- **Global Utilities** – shared constants & helper functions for easy maintenance<br/>
<br/>
Structure:<br/>
esilverslip-main/<br/>
├── Codebase/<br/>
│   ├── ESGlobal/<br/>
│   │   ├── Accept.html<br/>
│   │   ├── Reject.html<br/>
│   │   ├── Request.html<br/>
│   │   ├── Update.html
│   │   ├── Email.js<br/>
│   │   ├── GlobalAccess.js<br/>
│   │   ├── HandleAbsent.js<br/>
│   │   ├── HandleAccept.js<br/>
│   │   ├── HandlePending.js<br/>
│   │   ├── HandleReject.js<br/>
│   │   ├── HandleSubmitted.js<br/>
│   │   ├── StudentDatabase.js<br/>
│   │   └── TeacherDatabase.js<br/>
│   └── ESLogic/<br/>
│       └── Main.js<br/>
├── Initializer/<br/>
│   └── Initializer.js<br/>
├── Updater/<br/>
│   ├── SheetCode.js<br/>
│   └── Updater.js<br/>
├── RequestForm.js<br/>
└── TeacherRequestForm.js<br/>
