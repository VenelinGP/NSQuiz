var dialogsModule = require("ui/dialogs");
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var viewModule = require("ui/core/view");
var frameModule = require("ui/frame");
var QuizzesListViewModel = require("../../shared/view-models/quizzes-list-view-model");
var http = require("http");
var fetchModule = require("fetch");

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
	console.log('%s',itemIndex);
	var topmost = frameModule.topmost();
	topmost.navigate("./views/quizList/quizList");
} 