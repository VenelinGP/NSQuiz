'use strict';
var Observable = require("data/observable").Observable;

function Answer(isCorrect) {
    var answerModel = new Observable({
        text: "",
        isCorrect: isCorrect
    });

    answerModel.setCorrect = function(value) {
      answerModel.set('isCorrect', value);
    };

    return answerModel;
}

module.exports = Answer;