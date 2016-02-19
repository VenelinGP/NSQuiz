"use strict";
var config = require("../../shared/config");
var Observable = require("data/observable").Observable;
var validator = require("email-validator");

function User(info) {
	info = info || {};

	// You can add properties to observables on creation
	var viewModel = new Observable({
		username: info.username || "",
		email: info.email || "",
		password: info.password || ""
	});

	viewModel.login = function() {
		return fetch(config.apiUrl + "oauth/token", {
			method: "POST",
			body: JSON.stringify({
				username: viewModel.get("username"),
				password: viewModel.get("password"),
				grant_type: "password"
			}),
			headers: {
				"Content-Type": "application/json"
			}
		})
		.then(handleErrors)
		.then(function(response) {
			return response.json();
		}).then(function(data) {
			config.token = data.Result.access_token;
		});
	};

	viewModel.register = function() {
		return fetch(config.apiUrl + "Users", {
			method: "POST",
			body: JSON.stringify({
				Username: viewModel.get("username"),
				Email: viewModel.get("email"),
				Password: viewModel.get("password")
			}),
			headers: {
				"Content-Type": "application/json"
			}
		})
		.then(handleErrors);
	};

	viewModel.resetPassword = function() {
		return fetch(config.apiUrl + "Users/resetpassword", {
			method: "POST",
			body: JSON.stringify({
				Email: viewModel.get("email"),
			}),
			headers: {
				"Content-Type": "application/json"
			}
		})
		.then(handleErrors);
	};

	viewModel.isValidUsername = function () {
		var name = this.get("username");
		if (name.length < 4) {
			return false;
		}
		return true;
	};

	viewModel.isValidEmail = function() {
		var email = this.get("email");
		return validator.validate(email);
	};

	viewModel.isValidPassword = function () {
		var password = this.get("password");
		console.log(password);
		if (password.length < 7) {
			return false;
		}
		return true;
	};

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