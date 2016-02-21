var dialogsModule = require("ui/dialogs");
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var frameModule = require("ui/frame");
var navigation = require("../../shared/navigation");
var QuizzesListViewModel = require("../../shared/view-models/quizzes-list-view-model");

var page;
var quizzesList = new QuizzesListViewModel([]);
var pageData = new Observable({
    quizzesList: quizzesList
});

exports.loaded = function (args) {
    page = args.object;
    page.bindingContext = pageData;

    quizzesList.empty();
    quizzesList.load();
};

exports.onItemTap = function(args){
	var itemIndex = args.index;
    var quiz = quizzesList.getItem(itemIndex);
	console.log('index: %s, title: %s', itemIndex, quiz.title);

    navigation.goToSolveQuiz(quiz);
};