# JS - Chrome Reactive Inspector (CRI) ![alt text](https://github.com/allprojects/chrome-reactive-inspector/blob/master/logo.png "Chrome Reactive Inspector")
Chrome extension to debug JavaScript Reactive Libraries like [Bacon-JS](https://baconjs.github.io/)  & [Rx-JS](https://github.com/ReactiveX/rxjs).


[Watch Video](http://www.youtube.com/watch?feature=player_embedded&v=HQWnCo_lMJQ)


## Where Is What ?

#### 1. Chrome-Extension-SourceCode
Contains source code of chrome extension.

#### 2. Chrome-Extension
Contains packed extension ready for installation.

#### 3. Documentation
Contains thesis and slides by Waqas Abbas.

#### 4. TestApplications
Contains test applications.




## Installation Instructions

#### 1. Download and install packed extension from "Chrome-Extension-Stable" directory
For more detail please go to **Chrome-Extension-Stable** directory.

#### 2. Download and configure Test application from "TestApplications" directory
For more detail please go to **TestApplications** directory.

## Usage
After Successful installation you can go to Chrome devtools and there you will see new panel called  "Reative Inspector"

## History
This project started as a Master Thesis by Waqas Abbas at TU - Darmstadt Germany with collaboration of [Prof. Dr Guido Salvaneschi](http://www.guidosalvaneschi.com/)
It was continued by Pradeep Baradur.
This project is done as extension to the work of [Reative Inspector](https://github.com/guidosalva/reactive-inspector)


## For Developers:

### Installation Instructions:

For development in Chrome version 35.0 or higher
1. Download the source code of the extension.
2. In your chrome browser go to "chrome://extensions/" or "Setting" and then "Extensions"
3. Enable the "Developer mode".
4. Click Load unpacked extension… to pop up a file-selection dialog.
5. Navigate to the directory in which your extension files live, and select it.

Now the extensions is loaded, but Chrome will ask at every start to disable the extension.
Click Cancel in the dialog that pops up and proceed.

### Debugging:
 * To debug the Reactive Inspector itself, press CTRL-Shift-I on the devtools page for the Reactive Inspector. Then navigate to the Sources Tab in the devtools window.
 * To debug the generated background html and javascript files go to Chrome - Options - Additional Tools - Extensions 
 and click on the link to the background page for the Reactive Inspector. Remember that changes to the background scripts
 are only propagated to Chrome if you press the Refresh button in the Extension menu.