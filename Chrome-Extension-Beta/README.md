This directory contains the source code for the current development version of CRI.

To create a new packed version of the extension it is important to follow these steps:
* execute the build.js via NodeJs. If NodeJs is installed on the machine you can also use either
build.sh (Linux) or build.bat (Windows) which will execute the NodeJs command.

* if the build is successful the new directory "dist" is created.
The "dist" directory will contain the source code of the extension WITHOUT the auxiliary files.

This will remove not only the ".gitignore" file but also the ".idea" directory which contains confidential
information about the used system and the user and should therefore never be shipped with a packed extension.

If you want to add additional files to be removed from the built extension, see the build_process project.

NOTE: The current build script works on the "ChromeReactiveInspector" directory, but if this should change in the future,
make absolutely sure that the ".pem" file is not included in the packed extension!

* Open Google Chrome, go to "Additional Tools/Extensions" and click "Pack extension".
* Choose the "dist" (!!!) directory for the extension root and the "ChromeReactiveInspector.pem" as the key file.
* Now you have a packed, signed extension ready to be published.

### ./ChromeReactiveInspector
Contains the source code of the Chrome extension.

### ./build_process
Contains the the build scripts to create the packed extension.
