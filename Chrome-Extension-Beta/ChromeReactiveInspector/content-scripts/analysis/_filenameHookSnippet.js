/* excluded from build */
var X$ = window.J$;
var J$ = jQuery.extend({}, X$);
J$.W = function (iid, name, val, lhs, isGlobal, isPseudoGlobal) {
    return X$.W(iid, name, val, lhs, isGlobal, isPseudoGlobal, 'PLACEHOLDER');
};
J$.M = function (iid, base, offset, isConstructor) {
    return X$.M(iid, base, offset, isConstructor, 'PLACEHOLDER');
};
J$.F = function (iid, f, isConstructor) {
    return X$.F(iid, f, isConstructor, 'PLACEHOLDER');
};
