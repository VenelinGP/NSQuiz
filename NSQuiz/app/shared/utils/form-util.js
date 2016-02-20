"use strict";
var gesturesModule = require("ui/gestures");

var formUtilObject = {
    hideKeyboardOnBlur: hideKeyboardOnBlur,
    toggleForm: toggleForm
};

module.exports = formUtilObject;

// =============== IMPLEMENTATION =======================

function hideKeyboardOnBlur(page, views) {
    page.observe(gesturesModule.GestureTypes.tap, function () {
        views.forEach(function (view) {
            view.dismissSoftInput();
        });
    });
}

function toggleForm(form, isEnabled) {
    for (var prop in form) {
        form[prop].isEnabled = isEnabled;
    }
}
// ======================================================
