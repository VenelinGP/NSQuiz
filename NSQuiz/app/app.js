"use strict";
var application = require("application");
//var startingPage = require('./shared/navigation').startingPage();

application.cssFile = "./styles/app.css";
application.mainModule = "views/quiz/list/quiz-list";
application.start();