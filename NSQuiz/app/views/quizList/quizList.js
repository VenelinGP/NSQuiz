"use strict";

var errorHandler = require('../../shared/utils/error-handler');
var quiz = {};

function pageLoaded(args) {
	var page = args.object;
	quiz = page.navigationContext;

	console.log('page loaded');
	console.log('Quiz for solving: %s', quiz.title);
}

function onNavigatedTo(args) {
	console.log('navigated to	');
}

var pageObject = {
	pageLoaded: pageLoaded,
	onNavigatedTo: onNavigatedTo
};

module.exports = pageObject;