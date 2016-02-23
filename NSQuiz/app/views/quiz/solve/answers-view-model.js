'use strict';
var Observable = require("data/observable").Observable;

function Answer() {
    var answerModel = new Observable({
        text: text,
        isCorrect: isCorrect
    });

    answerModel.getCorrect = function() {
      answerModel.get({value, value});
    };

    return answerModel;
}

module.exports = Answer;