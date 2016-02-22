'use strict';
var navigation = require("../../../shared/navigation");
var CreateQuizModel = require('./quiz-view-model');
var dialogsModule = require("ui/dialogs");

var page;
var pageData = new CreateQuizModel();

var pageObject = {
    pageLoaded: pageLoaded,
    onItemTap: onItemTap,
    addQuestion: addQuestion,
    resetQuiz: resetQuiz,
    canReset: canReset
};

module.exports = pageObject;

function pageLoaded(args) {
    page = args.object;
    page.bindingContext = pageData;
}

function addQuestion() {
    console.log('total questions: %d', pageData.questions.length);
    pageData.newQuestion();
}

function resetQuiz() {
    dialogsModule
        .confirm('Are you sure you want to reset the quiz? All Questions will be deleted!')
        .then(function (result) {
            if (result) {
                pageData.clearData();
            }
        });
}

function canReset() {
    return pageData.questions.length > 0;
}

function onItemTap(args) {
    var itemIndex = args.index;
    console.log('index: %s', itemIndex);

    //navigation.goToSolveQuiz(quiz);
}