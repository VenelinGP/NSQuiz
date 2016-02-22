'use strict';
var Observable = require("data/observable").Observable;
var dialogsModule = require('ui/dialogs');

var navigation = require('~/shared/navigation');
var CreateQuizModel = require('./models/quiz-view-model');
var webApi = require('~/shared/data/web-api-service');

var view;
// don't access categories directly as they are loaded async use the loadCategories to get hold of the promise
var __categories = [];
var quizData = new CreateQuizModel();

var context = new Observable({
    pageIsBusy: false,
    quizData: quizData
});

var pageObject = {
    pageLoaded: pageLoaded,
    addQuestion: addQuestion,
    resetQuiz: resetQuiz,
    selectCategory: selectCategory
};

module.exports = pageObject;

function pageLoaded(args) {
    view = args.object;
    view.bindingContext = context;

    // loads categories in the background
    loadCategories();
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

    context.pageIsBusy = true;
    loadCategories()
        .then(function (result) {
            context.pageIsBusy = false;
            console.log('categories');
            console.log(JSON.stringify(result));

            view.page.showModal(categoriesPage, result, function (selected) {
                console.log('selected a category: %s', selected);
                quizData.category = selected;
            });
        });
}

// =============== HELPERS ===================================
function loadCategories() {
    return new Promise(function (resolve, reject) {
        if (__categories.length) {
            resolve(__categories);
        } else {
            webApi.getCategories()
                .then(function (result) {
                    __categories = result;
                });
        }
    });
}
// ===========================================================