This directory contains some sample applications used for testing features of CRI.

TestApps.html is a html page containing relative links to all test applications
and is used as an overview to navigate between them.

### ./Bacon
Contains all test applications using Bacon.js.

### ./RxJs
Contains all test applications using Rx.js.

# Running the test applications
Some of the test applications need to be hosted on a local Web server, because modern browsers
restrict cross-origin requests for websites that run from "file://".
In WebStorm the integrated Web server can be used (default: http://localhost:63342).
Note that you need to check "Allow unsecure requests" for it to work properly. 
The project must be opened in WebStorm to access the integrated Web server. See Tools/Deployment/Configuration and 
Tools/Deployment/Options to configure the integrated Web server. 