"use strict";
var dialogsModule = require("ui/dialogs");
var navigation = require("../../shared/navigation");
var formUtil = require("../../shared/utils/form-util").init();
var UserViewModel = require("../../shared/view-models/user-view-model");
var Toast = require("nativescript-toast");

var user = new UserViewModel({authenticating: false});

var viewObject = {
    registerView: registerView,
    signIn: signIn,
    register: function () {
        navigation.goToRegisterPage()
    }
};

module.exports = viewObject;

function registerView(args) {
    var page = args.object;
    page.bindingContext = user;
    user.set("username", "proba");
    user.set("password", "123123123");

    formUtil.form.username = page.getViewById("username");
    formUtil.form.password = page.getViewById("password");
    formUtil.form.signInButton = page.getViewById("sign-in-button");
    formUtil.hideKeyboardOnBlur(page, [formUtil.form.username, formUtil.form.password]);
}

function signIn() {
    if (!formUtil.isValid()) {
        return;
    }

    disableForm();

    user.login()
        .then(function () {
            Toast.makeText("Welcome back " + user.get("username")).show();
            // Todo: navigate...
        })
        .catch(function (err) {
            console.log(JSON.stringify(err));
            var message = err.message || err.error;

            if (err.content && err.content.error_description) {
                message = err.content.error_description;
            }

            dialogsModule
                .alert({
                    message: message,
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

