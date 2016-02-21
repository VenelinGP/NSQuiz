"use strict";
var dialogsModule = require("ui/dialogs");
var Toast = require("nativescript-toast");
var navigation = require("../../shared/navigation");
var UserViewModel = require("../../shared/view-models/user-view-model");
var formUtil = require("../../shared/utils/form-util").init();
var errorHandler = require('../../shared/utils/error-handler');

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
            Toast.makeText("Your account was successfully created.\nLogging in...").show();
        })
        .then(user.login)
        .then(function () {
            dialogsModule
                .alert("Welcome " + user.username)
                .then(navigation.goToQuizListPage)
        }, function (error) {
            throw {
                error: "Auto Login Error",
                message: "There was a problem logging you in automatically, try manually"
            };
        })
        .catch(function (error) {
            errorHandler.handleRegistrationError(error);
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

