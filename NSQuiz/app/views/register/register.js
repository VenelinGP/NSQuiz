"use strict";
var dialogsModule = require("ui/dialogs");
var navigation = require("../../shared/navigation");
var UserViewModel = require("../../shared/view-models/user-view-model");
var formUtil = require("../../shared/utils/form-util").init();

var user = new UserViewModel({authenticating: false});

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
    user.set("password", "123123123");

    formUtil.form.username = page.getViewById("username");
    formUtil.form.password = page.getViewById("password");
    formUtil.form.signUpButton = page.getViewById("sign-up-button");
    formUtil.hideKeyboardOnBlur(page, [formUtil.form.username, formUtil.form.password]);
}

function register() {
    if (!formUtil.isValid()) {
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

function disableForm() {
    formUtil.toggleForm(false);
    user.set("authenticating", true);
}

function enableForm() {
    formUtil.toggleForm(true);
    user.set("authenticating", false);
}

