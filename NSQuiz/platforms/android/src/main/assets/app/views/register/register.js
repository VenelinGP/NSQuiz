"use strict";
var dialogsModule = require("ui/dialogs");
var formUtil = require("../../shared/utils/form-util");
var navigation = require("../../shared/navigation");
var UserViewModel = require("../../shared/view-models/user-view-model");
var Toast = require("nativescript-toast");

var user = new UserViewModel({ authenticating: false });
var username;
var email;
var password;
var signUpButton;



exports.registerView = function(args) {
    var page = args.object;
    page.bindingContext = user;
    user.set("username", "");
    user.set("email", "");
    user.set("password", "");

    username = page.getViewById("username");
    email = page.getViewById("email");
    password = page.getViewById("password");
    signUpButton = page.getViewById("sign-up-button");
    formUtil.hideKeyboardOnBlur(page, [email, password]);
};

exports.focusPassword = function() {
    password.focus();
};

function disableForm() {
    username.isEnabled = false;
    email.isEnabled = false;
    password.isEnabled = false;
    signUpButton.isEnabled = false;
    user.set("authenticating", true);
}
function enableForm() {
    username.isEnabled = true;
    email.isEnabled = true;
    password.isEnabled = true;
    signUpButton.isEnabled = true;
    user.set("authenticating", false);
}

function completeRegistration() {
    disableForm();
    user.register()
        .then(function() {
            dialogsModule
                .alert("Your account was successfully created.")
                .then(navigation.goToLoginPage);
        }).catch(function() {
            dialogsModule
                .alert({
                    message: "Unfortunately we were unable to create your account.",
                    okButtonText: "OK"
                });
        }).then(enableForm);
}

exports.register = function() {
    if (!user.isValidUsername()) {
        Toast.makeText("The username must be longer than 3 characters!").show();
    }
    else {
        if (!user.isValidEmail()) {
            Toast.makeText("Enter a valid email address.", "long").show();
            
        } 
        else {
            if(!user.isValidPassword()) {
                Toast.makeText("The password must be longer than 6 characters!").show();
            }
            else{
                completeRegistration();
            }
        }
    }
};
