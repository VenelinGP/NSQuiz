"use strict";
var Observable = require("data/observable").Observable;
var validator = require("email-validator");
var Toast = require("nativescript-toast");

var webApi = require("../../shared/data/web-api-service");

function User(info) {
    info = info || {};

    // You can add properties to observables on creation
    var viewModel = new Observable({
        username: info.username || "",
        email: info.email || "",
        password: info.password || ""
    });

    viewModel.login = function () {
        var user = {
            username: viewModel.get("username"),
            password: viewModel.get("password"),
            grant_type: "password"
        };

        return webApi.login(user)
            .then(handleErrors)
            .then(function (response) {
                return response.json();
            });
    };

    viewModel.register = function () {
        var user = {
            username: viewModel.get("username"),
            password: viewModel.get("password"),
            confirmPassword: viewModel.get("password")
        };

        return webApi.register(user);
    };

    // Todo: Reset Password Endpoint
    //viewModel.resetPassword = function() {
    //	return fetch(config.apiUrl + "Users/resetpassword", {
    //		method: "POST",
    //		body: JSON.stringify({
    //			Email: viewModel.get("email"),
    //		}),
    //		headers: {
    //			"Content-Type": "application/json"
    //		}
    //	})
    //	.then(handleErrors);
    //};

    viewModel.isValidUsername = function () {
        var name = this.get("username");
        if (name.length < 4) {
            return false;
        }
        return true;
    };

    viewModel.isValidEmail = function () {
        var email = this.get("email");
        return validator.validate(email);
    };

    viewModel.isValidPassword = function () {
        var password = this.get("password");
        console.log(password);
        return password > 6;
    };

    viewModel.isValid = function () {
        if (!this.isValidUsername()) {
            Toast.makeText("The username must be longer than 3 characters!").show();
            return false;
        }

        if (!this.isValidPassword()) {
            Toast.makeText("The password must be longer than 6 characters!").show();
            return false;
        }

        return true;
    }

    return viewModel;
}

function handleErrors(response) {
    if (!response.ok) {
        console.log(JSON.stringify(response));
        throw Error(response.statusText);
    }
    return response;
}

module.exports = User;