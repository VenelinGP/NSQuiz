"use strict";
var gesturesModule = require("ui/gestures");
var Toast = require("nativescript-toast");

// =============== IMPLEMENTATION =======================

function FormUtility(form) {
    if (!form) {
        form = {};
    }

    this.form = form;
}

FormUtility.prototype.hideKeyboardOnBlur = hideKeyboardOnBlur;
FormUtility.prototype.toggleForm = toggleForm;
FormUtility.prototype.isValid = isValid;
FormUtility.prototype.isValidUsername = isValidUsername;
FormUtility.prototype.isValidPassword = isValidPassword;

function hideKeyboardOnBlur(page, views) {
    page.observe(gesturesModule.GestureTypes.tap, function () {
        views.forEach(function (view) {
            view.dismissSoftInput();
        });
    });
}

function toggleForm( isEnabled) {
    for (var prop in this.form) {
        if (this.form.hasOwnProperty(prop)) {
            this.form[prop].isEnabled = isEnabled;
        }
    }
}

function isValid() {
    if (!this.isValidUsername()) {
        Toast.makeText("The username must be longer than 4 characters!").show();
        this.form.username.focus();
        return false;
    }

    if (!this.isValidPassword()) {
        Toast.makeText("The password must be longer than 4 characters!").show();
        this.form.password.focus();
        return false;
    }

    return true;
}

// ======================================================

// ============ HELPERS =================================

function isValidUsername() {
    var name = this.form.username.text;
    return name.length >= 5;
}

function isValidPassword() {
    var password = this.form.password.text;
    console.log(password);
    return password.length >= 5;
}

// ======================================================

module.exports = {
    init: function(form) {
        return new FormUtility(form);
    }
};