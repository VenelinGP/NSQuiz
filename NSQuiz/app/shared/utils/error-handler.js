'use strict';

var navigation = require('../navigation');
var dialogsModule = require("ui/dialogs");

var handlerObject = {
    handleUnauthorisedError: handleUnauthorisedError,
    handleRegistrationError: handleRegistrationError,
    handleLoginError: handleLoginError,
    handleQuizGetError: handleQuizGetError,
    logError: logError
};

module.exports = handlerObject;

function handleUnauthorisedError(error, message) {
    if (!message) {
        message = "Please authenticate to use this function"
    }

    dialogsModule
        .alert(message)
        .then(function() {
            navigation.goToLoginPage(true);
        });

    logError(error);
}

function handleRegistrationError(error) {
    var message = error.message || "Unfortunately we were unable to create your account.";

    modelStateErrorHandler(error, message);
}

function handleQuizGetError(error) {
    var message = error.message || "Failed to retrieve data, check your connection";

    modelStateErrorHandler(error, message);
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

function modelStateErrorHandler(error, altMessage) {
    if (error.content && error.content.modelState) {
        var modelStateMessage = extractModelStateErrors(error.content.modelState);
    }

    dialogsModule.alert(modelStateMessage || altMessage);

    logError(error);
}

function logProperties(obj, indent) {
    if (!indent || !indent.length) {
        indent = "";
    }

    for (var prop in obj) {

        if(obj.hasOwnProperty(prop)) {
            if (obj[prop] !== null && typeof obj[prop] === 'object') {
                console.log('%s%s', indent, prop);
                logProperties(obj[prop], indent += "\t");
            } else {
                console.log('%s%s : %s', indent, prop, obj[prop]);
            }
        }
    }
}

function extractModelStateErrors(modelState) {
    var message = "";

    for (var prop in modelState) {
        if (modelState.hasOwnProperty(prop)) {
            message += modelState[prop] + '\n';
        }
    }

    return message.trim();
}