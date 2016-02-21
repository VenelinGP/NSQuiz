"use strict";

var errorHandler = require('../../../shared/utils/error-handler');
var quiz = {};

function pageLoaded(args) {
	var page = args.object;
	quiz = page.navigationContext;

	console.log('quiz loaded: %s', quiz.title);
}

function onNavigatedTo(args) {
	console.log('quiz navigated to');
}

var pageObject = {
	pageLoaded: pageLoaded,
	onNavigatedTo: onNavigatedTo
};

module.exports = pageObject;