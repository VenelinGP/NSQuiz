'use strict';
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var Answer = require('./answer-view-model');

function Question() {
    var answers = new ObservableArray();

    var questionModel = new Observable({
        title: "",
        alternative: "",
        answers: answers
    });

    questionModel.newAnswer = function() {
        // first/single answer is always correct
        var isCorrect = answers.length > 0;

        var answer = new Answer(isCorrect);
        answers.push(answer);

        return answer;
    };

    questionModel.deleteAnswer = function(index) {
        var deletedAnswer = answers.getItem(index);
        answers.splice(index, 1);

        if (deletedAnswer.isCorrect && answers.length > 0) {
            var first = answers.getItem(0);
            first.setCorrect(true);
        }
    };

    questionModel.markAsCorrect = function (index) {
        answers.forEach(function (answer, i) {
            first.setCorrect(false);
            if (i == index) {
                first.setCorrect(true);
            }
        });
    };

    questionModel.canSubmit = function() {
        var hasMinimumAnswers = answers.length > 1;
        if (hasMinimumAnswers && questionModel.title) {
            // has a correct anser
            return answers.some(function (answer) {
                return answer.isCorrect;
            });
        }

        return false;
    };

    questionModel.clearData =function() {
        while (answers.length) {
            answers.pop();
        }

        questionModel.title = "";
        alternative.category = "";
    };

    return questionModel;
}

module.exports = Question;
