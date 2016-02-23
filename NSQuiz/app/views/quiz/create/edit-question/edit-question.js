'use strict';
var navigation = require("~/shared/navigation");
var Question = require('../models/question-view-model');
var dialogsModule = require("ui/dialogs");

var page;
var question;
var closeCallback;

var pageObject = {
    onShownModally: onShownModally,
    addAnswer: addAnswer,
    removeAnswer: removeAnswer,
    onReady: onReady,
    onClear: onClear
};

module.exports = pageObject;

function onShownModally(args) {
    page = args.object;
    question = args.context;
    closeCallback = args.closeCallback;

    console.log('Edit question');

    if (!question) {
        question = new Question();
    }

    page.bindingContext = question;
}

function addAnswer() {
    question.newAnswer();
}

function removeAnswer(args) {

}

function onReady() {
    if (!question.canSubmit()) {
        dialogsModule.alert('The question is not ready, check:' +
        ' that you have selected at least 2 answers, ' +
        ' that you have selected a correct answer, ' +
        ' the question has text.')
    } else {
        closeCallback();
        //page.closeModal();
    }
}

function onClear() {
    dialogsModule
        .confirm('Are you sure you want to reset the question?')
        .then(function (result) {
            if (result) {
                question.clearData();
            }
        });
}
