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

## available properties
* title
* className