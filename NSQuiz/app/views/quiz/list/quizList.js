"use strict";
var dialogsModule = require("ui/dialogs");
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var navigation = require("../../../shared/navigation");
var quizDb = require("../../../shared/data/sqlite-service");
var webApi = require('../../../shared/data/web-api-service');
var errorHandler = require('../../../shared/utils/error-handler');
var QuizzesListViewModel = require("../../../shared/view-models/quizzes-list-view-model");

var page;
var quizzesList = new QuizzesListViewModel([]);
var pageData = new Observable({
    quizzesList: quizzesList
});

exports.loaded = function (args) {

    var countQuizzesFromDB;
    var countQuizzesFromWeb;

    page = args.object;
    page.bindingContext = pageData;

    webApi.getTotalQuizzesCount()
            .then(function (result) {
                quizDb.getCountQuizzes(function(row){
                    countQuizzesFromDB = row.length;
                });
                countQuizzesFromWeb = result.count;
                console.log("db: %s", countQuizzesFromDB);
                console.log("web: %s", countQuizzesFromWeb);
                if (countQuizzesFromDB < countQuizzesFromWeb) {
                       webApi.getQuizzes()
                            .then(function (data) {
                                data.forEach(function (quiz) {
                                    quizDb.setQuizzes(quiz.id, quiz.title, quiz.category, quiz.createdBy, quiz.createdOn, quiz.avatarUrl); 
                                    console.log("write");
                                });
                            });
                    }


                }); 

    quizzesList.empty();
    quizzesList.load();

};

exports.onItemTap = function (args) {
    var itemIndex = args.index;
    var quizId = quizzesList.getItem(itemIndex).id;
    console.log('index: %s, id: %d', itemIndex, quizId);

    webApi.getById(quizId)
        .then(navigation.goToSolveQuiz)
        .catch(errorHandler.handleQuizGetError);
    //navigation.goToSolveQuiz(quiz);
};