Documentation for tipsy tooltip usage that is not included in the official documentation:

# CSS
* to overwrite the auto sizing of tipsy tooltips use
.tipsy-inner {
    width: 350px !important;
    max-width: 350px !important;
}


# Options object
* Every property of the options object can be replaced with a function that will be evaluated when the tooltip is showed.
* To access the element on which the tooltip is shown inside a function use "this".
* Options 'delayOut' will keep tooltips open after the focus is lost. This is useful to debug tooltips layout.
(Open the tooltip, press CTRL-I, go to Sources tab, choose the panel thread from the threads list, press pause. Now the 
tooltip can be inspected while its open.)


## available properties
* title
* className

## Changes
Changed the application of css classes to tipsy. This was due to an already known bug that is not implemented
in the main sources, because tipsy is discontinued.