var dialogsModule = require("ui/dialogs");
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var navigation = require("../../../shared/navigation");
var quizDb = require("../../../shared/data/sqlite-service");
var webApi = require('../../../shared/data/web-api-service');
var errorHandler = require('../../../shared/utils/error-handler');

var QuizzesListViewModel = require("../../../shared/view-models/quizzes-list-view-model");

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

    quizDb.getCountQuizzes(function(row){
        // Този код ще се изпълни когато базата приключи със заявката
        //errorHandler.logError(count);
        console.log('count from db', JSON.stringify(row));
        //console.log('length is: ', row.length);
    });

    // Това тук ще се изпълни преди горният реди, за това винаги ще ти дава undefined
    //console.log("Hi %s",countQuizzesFromDB.lenght);

    quizDb.setQuizzes();
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