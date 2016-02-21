'use strict';

var navigation = require('../navigation');
var dialogsModule = require("ui/dialogs");

var handlerObject = {
    handleUnauthorisedError: handleUnauthorisedError,
    handleRegistrationError: handleRegistrationError,
    handleLoginError: handleLoginError,
    logError: logError
};

module.exports = handlerObject;

function handleUnauthorisedError(error, message) {
    if (!message) {
        message = "Please authenticate to use this function"
    }

    dialogsModule
        .alert(message)
        .then(navigation.goToLoginPage);

    logError(error);
}

function handleRegistrationError(error) {
    var message = "Unfortunately we were unable to create your account.";

    if (error.content && error.content.modelState) {
        message = "";
        var errors = error.content.modelState;

        for (var prop in errors) {
            if (errors.hasOwnProperty(prop)) {
                message += errors[prop] + '\n';
            }
        }

        message = message.trim();
    }

    dialogsModule.alert(message);

    logError(error);
}

function handleLoginError(error) {
    var message = error.message || error.error;

    if (error.content && error.content.error_description) {
        message = error.content.error_description;
    }

    if (!message) {
        message = "Login failed, please verify your credentials.";
    }

    dialogsModule
        .alert({
            message: message,
            okButtonText: "OK"
        });

    logError(error);
}

function logError(error) {
    console.log('============== Error ==============');

    logProperties(error);

    console.log('===================================')
}

function logProperties(obj, indent) {
    if (!indent || !indent.length) {
        indent = "";
    }

    for (var prop in obj) {

        if (obj[prop] !== null && typeof obj[prop] === 'object') {
            console.log('%s%s', indent, prop);
            logProperties(obj[prop], indent += "\t");
        } else {
            console.log('%s%s : %s', indent, prop, obj[prop]);
        }
    }
}