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
    selectCategoryCommand: selectCategory,
    quizData: quizData
});

var pageObject = {
    pageLoaded: pageLoaded,
    addQuestion: addQuestion,
    editQuestion: editQuestion,
    resetQuiz: resetQuiz,
    selectCategory: selectCategory,
    submitQuiz: submitQuiz
};

module.exports = pageObject;

function pageLoaded(args) {
    view = args.object;
    view.bindingContext = context;

    // loads categories in the background
    loadCategories();
}

function addQuestion() {
    console.log('total questions: %d', quizData.questions.length);
    var question = quizData.newQuestion();
    var createQuestionPage = 'views/quiz/create/edit-question/edit-question';

    question.title = 'Nov Question';
    console.log(question.title);

    view.page.showModal(createQuestionPage, question, function () {
        // Todo: add onModalClose callback here
    }, true);

    // old navigation
    //navigation.goToEditQuestion(question);
}

function editQuestion(args) {
    console.log(args);
}

function resetQuiz() {
    dialogsModule
        .confirm('Are you sure you want to reset the quiz? All Questions will be deleted!')
        .then(function (result) {
            if (result) {
                quizData.clearData();
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

function submitQuiz() {
    if (quizData.canSubmit()) {
        context.pageIsBusy = true;
        webApi.submitQuiz(quizData)
            .then(function () {
                dialogsModule
                    .confirm('Everything went well, congratulations on the new quiz');
                resetQuiz();
            })
            .catch(function() {
                dialogsModule
                    .confirm('Oh, snap something went wrong, at least your quiz is still here');
            })
            .then(function() {
                context.pageIsBusy = false;
            })
    } else {
        dialogsModule
            .alert('The quiz is not ready for submit, check if you have at least 3 questions');
    }
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