"use strict";
var dialogsModule = require("ui/dialogs");
var navigation = require("../../shared/navigation");
var UserViewModel = require("../../shared/view-models/user-view-model");
var formUtil = require("../../shared/utils/form-util");

var user = new UserViewModel({authenticating: false});
var form = {};

var viewObject = {
    registerView: registerView,
    focusPassword: focusPassword,
    register: register
};

module.exports = viewObject;

function focusPassword() {
    form.password.focus();
}

function registerView(args) {
    var page = args.object;
    page.bindingContext = user;
    user.set("username", "proba");
    user.set("email", "proba@yahoo.com");
    user.set("password", "123123123");

    form.username = page.getViewById("username");
    form.email = page.getViewById("email");
    form.password = page.getViewById("password");
    form.signUpButton = page.getViewById("sign-up-button");
    formUtil.hideKeyboardOnBlur(page, [form.email, form.password]);
}

function disableForm(form) {
    formUtil.toggleForm(form, false);
    user.set("authenticating", true);
}

function enableForm(form) {
    formUtil.toggleForm(form, true);
    user.set("authenticating", false);
}

function register() {
    if (!user.isValid(form)) {
        return;
    }

    disableForm();

    user.register()
        .then(function () {
            // Todo: try auto login
            dialogsModule
                .alert("Your account was successfully created.")
                .then(navigation.goToLoginPage);
        })
        .catch(function () {
            dialogsModule
                .alert({
                    message: "Unfortunately we were unable to create your account.",
                    okButtonText: "OK"
                });
        })
        .then(enableForm);
}