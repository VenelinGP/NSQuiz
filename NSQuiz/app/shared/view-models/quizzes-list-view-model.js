"use strict";
var webApi = require("../../shared/data/web-api-service");
var ObservableArray = require("data/observable-array").ObservableArray;

function QuizzesListViewModel(items) {
    var viewModel = new ObservableArray(items);

    viewModel.load = function () {
        webApi.getQuizzes()
            .then(function (data) {
                data.forEach(function (quiz) {
                    viewModel.push({
                        id: quiz.id,
                        title: quiz.title,
                        category: quiz.category,
                        createdBy: quiz.createdBy,
                        createdOn: quiz.createdOn,
                        avatarUrl: quiz.avatarUrl
                    });
                });
            });
    };

    viewModel.empty = function () {
        while (viewModel.length) {
            viewModel.pop();
        }
    };

    return viewModel;
}

module.exports = QuizzesListViewModel;