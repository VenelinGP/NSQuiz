"use strict";
var config = require("./config");
var frameModule = require("ui/frame");
var builder = require("ui/builder");

var mainPage;
var placeholder;
var sideDrawer;

module.exports = {
	goToLoginPage: function(clearHistory) {
		frameModule.topmost().navigate({
			moduleName: "views/login/signInView",
			clearHistory: clearHistory
		});
	},
	goToRegisterPage: function() {
		frameModule.topmost().navigate("views/register/register");
	},
	goToPasswordPage: function() {
		frameModule.topmost().navigate("views/password/password");
	},
	goToQuizListPage: function() {
		var quizList = builder.load({
			path: "views/quiz/list",
			name: "quizList"
		});

		navigate(quizList);
	},
	goToSolveQuiz: function(quiz) {
		var solveView = builder.load({
			path: "views/quiz/solve/",
			name: "quizSolve"
		});

		solveView.navigationContext = quiz;

		navigate(solveView, quiz);
	},
	signOut: function() {
		config.invalidateToken();
		frameModule.topmost().navigate({
			moduleName: "views/login/login",
			animated: false,
			clearHistory: true
		});
	},
	startingPage: function() {
		var moduleName = config.token
			? "views/quiz/list/quiz-list"
			: "views/login/signInView";

		console.log('module name: %s', moduleName);

		return {
			moduleName: moduleName
		}
	},
	setMainPage: function(page) {
		mainPage = page;
	},
	setPlaceholder: function(container) {
		placeholder = container;
	},
	setDrawer: function(drawer) {
		sideDrawer = drawer;
	}
};

function navigate(partial, data) {
	frameModule.topmost().navigate({
		moduleName: "views/main/main",
		context: {
			partial: partial, data: data
		}
	});
}