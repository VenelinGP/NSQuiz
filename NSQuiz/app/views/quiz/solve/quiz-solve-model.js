'use strict';
var Observable = require("data/observable").Observable;
var webApi = require("../../../shared/data/web-api-service");

function QuizSolveModel() {

    var quizModel = new Observable({
        id: 7,
        title: ""
    });


    quizModel.load = function(id){
        return webApi.getById(id)
            .then(function(data){
                quizModel.set("id", data.id);
                quizModel.set("title", data.title);
                // quizModel.set("Age", 34);
                // quizModel.set("Married", true);
                console.log("%s", JSON.stringify(quizModel));
            });
    };
 
     quizModel.empty = function () {
        quizModel.id = 0;
        quizModel.title = "";
    };
               
    return quizModel;
}

module.exports = QuizSolveModel;
