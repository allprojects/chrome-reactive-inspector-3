# Chrome Reactive Inspector (CRI)
[On GitHub](https://github.com/allprojects/chrome-reactive-inspector-3)
Chrome extension to debug JavaScript Reactive Libraries like [Bacon-JS](https://baconjs.github.io/) 
and [Rx-JS](https://github.com/reactivex/rxjs).

A video demo and tutorial for a previous version of CRI (Version 1.0) can be found on YouTube.
[Watch Video](http://www.youtube.com/watch?feature=player_embedded&v=HQWnCo_lMJQ)

## Where Is What ?

#### 1. Chrome-Extension-Beta
Contains the source code of the chrome extension.

#### 2. Chrome-Extension-Stable
Contains packed extension ready for installation.

#### 3. Documentation
Contains the documentation including the Master Thesis by Waqas Abbas, Pradeep Baradur 
and the Bachelor Thesis by Benedikt Gross.

#### 5. TestApplications
Contains test applications.


## Installation Instructions

#### 1. Download and install packed extension from "Chrome-Extension-Stable" directory
For more detail please go to [Chrome-Extension-Stable](Chrome-Extension-Stable/README.md) directory.

#### 2. Download and configure Test application from "TestApplications" directory
For more detail please go to [TestApplications](TestApps/README.md) directory. 


## Usage
After the chrome extension is installed successfully, open an application that should be examined and open the developer
 tools (F12, CTRL-Shift-I or open it via R-Click "Inspect Element").
Now switch to the "Reactive Inspector" tab in the devtools window.

## History
This project is done as extension to the work of [Reative Inspector](https://github.com/guidosalva/reactive-inspector).

It was started as a Master Thesis by Waqas Abbas at TU - Darmstadt Germany and later advanced in a Master Thesis by
 Pradeep Baradur at TU-Darmstadt Germany and a Bachelor Thesis by Benedikt Gross at TU - Darmstadt Germany, all under 
 the supervision of [Prof. Dr Guido Salvaneschi](http://www.guidosalvaneschi.com/).

### Contributions
Waqas Abbas, Pradeep Baradur, Benedikt Gross, [Prof. Dr Guido Salvaneschi](http://www.guidosalvaneschi.com/),

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

## Credits
I would like to thank my supervisor Guido Salvaneschi for his continuous support, his feedback
and his patience.


### Debugging:
 * To debug the Reactive Inspector itself, press CTRL-Shift-I on the devtools page for the Reactive Inspector. Then navigate to the Sources Tab in the devtools window.
 * To debug the generated background html and javascript files go to Chrome - Options - Additional Tools - Extensions 
 and click on the link to the background page for the Reactive Inspector. Remember that changes to the background scripts
 are only propagated to Chrome if you press the Refresh button in the Extension menu.