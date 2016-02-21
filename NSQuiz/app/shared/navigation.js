"use strict";
var config = require("./config");
var frameModule = require("ui/frame");

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
		frameModule.topmost().navigate({
			moduleName: "views/quiz/list/quiz-list",
			clearHistory: true
		});
	},
	goToSolveQuiz: function(quiz) {
		frameModule.topmost().navigate({
			moduleName: "views/quiz/solve/quiz-solve",
			context: quiz
		});
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
	}
};
