'use strict';

var appConfig = require('config');
var http = require('http');

var BASE_URL = appConfig.apiUrl;

// =============== INTERFACE ============================

// Returns prommises 
var webApiObject = {
	register: register,
	login: login,
	currentUserInfo: currentUserInfo,
	getCategories: getCategories,
	getQuizzes: getQuizzes
};

module.exports = webApiObject;

// ======================================================

// =============== IMPLEMENTATION =======================

function register(user) {
	var request = http.request({
		url: BASE_URL + 'api/account/register',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		content: JSON.stringify(user)
	});

	// returns a promise
	logResponse(request);
	return request;
}

function login(user) {
	var data = 'grant_type=password&username=' + (user.username || '') + '&password=' + (user.password || '');

	var request = http.request({
		url: BASE_URL + 'token',
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		content: data
	}).then(function(response) {
		console.log(response);

		// Todo: Try with response.content.access_token
		var tokenValue = response.access_token;

		// Todo: configure expiration if possible
		var validTo = new Date();
		validTo.setDate(validTo.getDay() + 14);

		appConfig.token = tokenValue;
	});

	logResponse(request);
	return request;
}

function currentUserInfo() {
	var request = http.getJSON({
		url: BASE_URL + 'api/Account/UserInfo',
		headers: applyAuthorisationHeader()
	}).then(function(response) {
		console.log(response);
		appConfig.currentUser = response;
	});

	logResponse(request);
	return request;
}

function getCategories() {
	var request = http.getJSON(BASE_URL + 'api/quizzes/categories');

	logResponse(request);
	return request;
}

function getQuizzes(page) {
	if (!page) {
		page = 0;
	}

	var request = http.request({
		url: BASE_URL + '/api/quizzes?page=' + page
	});

	logResponse(request);
	return request;
}

// ======================================================

// ================= HELPERS ============================

function applyAuthorisationHeader(headers) {
	if (!headers) {
		return {
			'Authorisation': 'Bearer ' + appConfig.token
		};
	}

	headers.Authorisation = 'Bearer ' + appConfig.token;
}

function logResponse(request) {
	request.then(function(success) {
		console.log('Http Success: ', success);
	}, function(error) {
		console.log('Http Error ', error);
	});
}

// ======================================================