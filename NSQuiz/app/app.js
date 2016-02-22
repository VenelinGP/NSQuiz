"use strict";
var application = require("application");
var dialogsModule = require("ui/dialogs");
var config = require('./shared/config');
var webApi = require('./shared/data/web-api-service');
var database = require("./shared/data/sqlite-service");

application.cssFile = "./styles/app.css";

//application.mainModule = "./views/login/signInView";
//application.mainModule = "./views/quiz/list/quiz-list";
application.mainModule = "./views/main/main";

application.on(application.launchEvent, function(args) {
    //config.invalidateToken();
    config.getUser()
        .then(function(user) {
            console.log('CURRENT USER: ', user.username);
        });

    webApi.currentUserInfo();
});

application.on(application.uncaughtErrorEvent, function (args) {
    dialogsModule.alert("The application crashed! What did you do!?");
});

application.start();
database.initializeSQLite();