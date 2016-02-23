"use strict";
var Observable = require("data/observable").Observable;

var navigation = require("../../../shared/navigation");
var QuizzesListViewModel = require("../../../shared/view-models/quizzes-list-view-model");
var quizDb = require("../../../shared/data/sqlite-service");

var countQuizzesFromDB;
var countQuizzesFromWeb;

var page;
var quizzesList = new QuizzesListViewModel([]);
var pageData = new Observable({
    quizzesList: quizzesList
});

exports.loaded = function (args) {
    page = args.object;
    page.bindingContext = pageData;

    // quizDb.setQuizzes();
    
    quizzesList.empty();
    quizzesList.load();


    countQuizzesFromDB = quizDb.getCountQuizzes();
    console.log("Hi %s",countQuizzesFromDB);

    

    
    // countQuizzesFromWeb = webApi.getTotalQuizzesCount().then(function(result){
    // 	return result.count;
    // });
    // console.log(countQuizzesFromWeb);
};

exports.onItemTap = function(args){
	var itemIndex = args.index;
    var quiz = quizzesList.getItem(itemIndex);
	console.log('index: %s, title: %s', itemIndex, quiz.title);

    navigation.goToSolveQuiz(quiz);
};