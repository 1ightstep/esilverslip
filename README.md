This program built on Google Apps Script and HTML/JS has the inteneded purpose of manging 1000 students at a school 



## Features

- **Student Request Form** – allows students to submit requests (e.g. schedule changes, resource needs)  
- **Teacher Approval Form** – lets teachers view and approve or reject incoming student requests  
- **Automated Updater Scripts** – processes form submissions, updates the Google Sheet database, and notifies stakeholders  
- **Initializer Script** – bootstraps your Google Sheet with the necessary columns, sheets, and default data  
- **Global Utilities** – shared constants & helper functions for easy maintenance
























Structure:
esilverslip-main/
├── Codebase/
│   ├── ESGlobal/
│   │   ├── Accept.html
│   │   ├── Reject.html
│   │   ├── Request.html
│   │   ├── Update.html
│   │   ├── Email.js
│   │   ├── GlobalAccess.js
│   │   ├── HandleAbsent.js
│   │   ├── HandleAccept.js
│   │   ├── HandlePending.js
│   │   ├── HandleReject.js
│   │   ├── HandleSubmitted.js
│   │   ├── StudentDatabase.js
│   │   └── TeacherDatabase.js
│   └── ESLogic/
│       └── Main.js
├── Initializer/
│   └── Initializer.js
├── Updater/
│   ├── SheetCode.js
│   └── Updater.js
├── RequestForm.js
└── TeacherRequestForm.js
