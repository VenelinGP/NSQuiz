"use strict";
var appModule = require("application");
var dialogsModule = require("ui/dialogs");
var Observable = require("data/observable").Observable;
var navigation = require("../../../shared/navigation");
var QuizSolveModel = require('./quiz-solve-model');
var errorHandler = require('../../../shared/utils/error-handler');
var quiz = {};

var page;
var quizListElement;
var quizList = new QuizSolveModel();
var pageData = new Observable({
    quizList: quizList,
});

var pageObject = {
	pageLoaded: pageLoaded,
	onNavigatedTo: onNavigatedTo,
	dateConverter: dateConverter
};

module.exports = pageObject;

function pageLoaded(args) {
	page = args.object;
	quiz = page.navigationContext;
	page.bindingContext = quiz; // pageData;
	quizListElement = page.getViewById("quizList");
       console.log("%s", JSON.stringify(quiz));
	showPageLoadingIndicator();
	// quizList
	// 	.load()
	// 	.then(function() {
	// 		hidePageLoadingIndicator();

	// 		// Fade in the ListView over 1 second
	// 		quizListElement.animate({
	// 			opacity: 1,
	// 			duration: 1000
	// 		});
	// 	});

	quizList.empty();
	// quizList.load()
	// .then(function(result){

	// });
	console.log("GL: %s", JSON.stringify(quizList));
	console.log('quiz loaded: %s', quiz.id);
}

function showPageLoadingIndicator() {
	pageData.set("isLoading", true);
}
function hidePageLoadingIndicator() {
	pageData.set("isLoading", false);
}

function onNavigatedTo(args) {
	console.log('quiz navigated to');
}


var dateConverter = function(value, format) {
    var result = format;
    var day = value.getDate();
    result = result.replace("DD", day < 10 ? "0" + day : day);
    var month = value.getMonth() + 1;
    result = result.replace("MM", month < 10 ? "0" + month : month);
    result = result.replace("YYYY", value.getFullYear());
    return result;
};

appModule.resources["dateConverter"] = dateConverter;
appModule.resources["dateFormat"] = "DD.MM.YYYY";