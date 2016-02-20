var config = require("../../shared/config");
var data = require("../../shared/data/web-api-service");
var fetchModule = require("fetch");
var ObservableArray = require("data/observable-array").ObservableArray;

function QuizzesListViewModel(items) {
    var viewModel = new ObservableArray(items);

    viewModel.load = function() {
 		return data.getQuizzes()
            .then(function(data){
                data.forEach(function(quizzes){
                    viewModel.push({
                        id: quizzes.id,
                        title: quizzes.title,
                        category: quizzes.category,
                        createdBy: quizzes.createdBy,
                        createdOn: quizzes.createdOn,
                        avatarUrl: quizzes.avatarUrl
                    });
                    console.log('%s',quizzes.id);
                    console.log('%s',quizzes.title);
                    console.log('%s',quizzes.category);
                    console.log('%s',quizzes.createdBy);
                    console.log('%s',quizzes.createdOn);
                    console.log('%s',quizzes.avatarUrl);
                });
            });
    };

viewModel.empty = function() {
    while (viewModel.length) {
        viewModel.pop();
    }
};

    return viewModel;
}
module.exports = QuizzesListViewModel;