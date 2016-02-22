'use strict';
var navigation = require('~/shared/navigation');
var CreateQuizModel = require('./models/quiz-view-model');
var dialogsModule = require('ui/dialogs');
var webApi = require('~/shared/data/web-api-service');

var view;
var categories = [];
var pageData = new CreateQuizModel();

var pageObject = {
    pageLoaded: pageLoaded,
    onItemTap: onItemTap,
    addQuestion: addQuestion,
    resetQuiz: resetQuiz,
    selectCategory: selectCategory
};

module.exports = pageObject;

function pageLoaded(args) {
    view = args.object;
    view.bindingContext = pageData;
}

function addQuestion() {
    console.log('total questions: %d', pageData.questions.length);
    var question = pageData.newQuestion();
    navigation.goToEditQuestion(question);
}

function editQuestion(args) {
    console.log(args);
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

function selectCategory() {
    var categoriesPage = 'views/quiz/create/categories';

    webApi.getCategories()
        .then(function (result) {
            console.log('categories');
            console.log(JSON.stringify(result));

            view.page.showModal(categoriesPage, result, function (selected) {
                console.log('selected a category: %s', selected);
                pageData.category = selected;
            });
        });
}

function onItemTap(args) {
    var itemIndex = args.index;
    console.log('index: %s', itemIndex);

    //navigation.goToSolveQuiz(quiz);
}