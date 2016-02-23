'use strict';
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var Question = require('./question-view-model');

//title: string 3 to 128,
//    category: string 3 to 128,
//    description: string 5 to 500,
//    isPrivate: bool,
//    questions: [{
//    title: string 5 to 500,
//    answers: [{
//        text: string 2 to 256,
//        isCorrect: bool
//    }

function QuizViewModel() {
    var questions = new ObservableArray();

    var quizModel = new Observable({
        title: "",
        category: "",
        description: "",
        questions: questions
    });

    quizModel.clearData = function () {
        while (questions.length) {
            questions.pop();
        }

        quizModel.title = "";
        quizModel.category = "";
        quizModel.description = "";
    };

    quizModel.canSubmit = function () {
        var haveQuestions = questions.length > 0;
        var havePrimaryFields = quizModel.title && quizModel.category && quizModel.description;

        if (!haveQuestions || !havePrimaryFields) {
            return false;
        }

        return questions.every(function (question) {
            return question.canSubmit();
        });
    };

    quizModel.newQuestion = function () {
        var question = new Question();
        questions.push(question);

        return question;
    };

    quizModel.removeQuestion = function (index) {
        questions.splice(index, 1);
    };

    return quizModel;
}

module.exports = QuizViewModel;
