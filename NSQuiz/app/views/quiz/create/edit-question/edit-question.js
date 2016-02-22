'use strict';
var navigation = require("~/shared/navigation");
var Question = require('../models/question-view-model');
var dialogsModule = require("ui/dialogs");

var page;

var pageObject = {
    pageLoaded: pageLoaded,
    onNavigatedTo: onNavigatedTo
};

module.exports = pageObject;

function pageLoaded(args) {
    page = args.object;
    setBindings();
}

function onNavigatedTo(args) {
    console.log('navigated to question details');
}

function setBindings() {
    if (page.navigationContext) {
        page.bindingContext = page.navigationContext;
    } else {
        page.bindingContext = new Question();
    }
}


