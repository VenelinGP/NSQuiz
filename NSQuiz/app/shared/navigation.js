"use strict";
var config = require("./config");
var frameModule = require("ui/frame");
var builder = require("ui/builder");

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
	goToCreateQuiz: function() {
		if (!config.isAuthenticated) {
			this.goToLoginPage();
		}

		var createQuiz = builder.load({
			path: "views/quiz/create",
			name: "create"
		});

		navigate(createQuiz);
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
		return {
			moduleName: 'views/main/main'
		}
	},
	setDrawer: function(drawer) {
		sideDrawer = drawer;
	},
	toggleDrawer: function () {
		if (sideDrawer) {
			sideDrawer.toggleDrawerState();
		}
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