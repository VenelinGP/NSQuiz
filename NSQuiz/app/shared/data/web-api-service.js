'use strict';

var appConfig = require('../config');
var errorHandler = require('../utils/error-handler');
var http = require('http');

var BASE_URL = appConfig.apiUrl;

// =============== INTERFACE ============================

// Returns promises
var webApiObject = {
    register: register,
    login: login,
    currentUserInfo: currentUserInfo,
    getCategories: getCategories,
    getQuizzes: getQuizzes,
    getTotalQuizzesCount: getTotalQuizzesCount
};

module.exports = webApiObject;

// ======================================================

// =============== IMPLEMENTATION =======================

function register(user) {
    console.log('Registering...');

    return new Promise(function (resolve, reject) {
        http.request({
            url: BASE_URL + 'api/account/register',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            content: JSON.stringify(user)
        })
            .then(function (response) {
                processResponse(response);
                resolve();
            })
            .catch(function (error) {
                reject(error);
            });
    });
}

function login(user) {
    var data = 'grant_type=password&username=' + (user.username || '') + '&password=' + (user.password || '');
    return new Promise(function (resolve, reject) {
        http.request({
            url: BASE_URL + 'token',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            content: data
        })
            .then(function (response) {
                var content = processResponse(response);

                var tokenValue = content.access_token;

                // Todo: configure expiration if possible
                var validTo = new Date();
                validTo.setDate(validTo.getDay() + 14);

                appConfig.token = tokenValue;

                // set the current user information right away to be quickly accessed later
                currentUserInfo()
                    .then(resolve);
            })
            .catch(function (error) {
                reject(error);
            });
    });
}

function currentUserInfo() {
    return new Promise(function (resolve, reject) {
        http.request({
            url: BASE_URL + 'api/Account/UserInfo',
            method: 'GET',
            headers: applyAuthorisationHeader()
        })
            .then(function (response) {
                var content = processResponse(response);

                appConfig.setUser(content);
                resolve(content);
            })
            .catch(function (error) {
                errorHandler.logError(error);
                reject(error);
            });
    });
}

function getCategories() {
    return new Promise(function (resolve, reject) {
        http.request({
            url: BASE_URL + 'api/quizzes/categories',
            method: 'GET'
        })
            .then(function (response) {
                var content = processResponse(response);

                resolve(content);
            })
            .catch(function (error) {
                errorHandler.logError(error);
                reject(error);
            });
    });
}

function getQuizzes(page) {
    if (!page) {
        page = 0;
    }

    return new Promise(function (resolve, reject) {
        http.request({
            url: BASE_URL + '/api/quizzes?page=' + page,
            method: 'GET'
        })
            .then(function (response) {
                var content = processResponse(response);

                resolve(content);
            })
            .catch(function (error) {
                errorHandler.logError(error);
                reject(error);
            });
    });
}

function getTotalQuizzesCount() {
    http.request({
        url: BASE_URL + '/api/quizzes/count',
        method: 'GET'
    })
        .then(function (response) {
            var content = processResponse(response);

            resolve(content);
        })
        .catch(function (error) {
            errorHandler.logError(error);
            reject(error);
        });
}

// ======================================================

// ================= HELPERS ============================

function applyAuthorisationHeader(headers) {
    if (!headers) {
        return {
            'Authorization': 'Bearer ' + appConfig.token
        };
    }

    headers.Authorization = 'Bearer ' + appConfig.token;
}

function processResponse(response) {
    var status = response.statusCode;

    if (status < 400) {
        printResponse(response);

        // Important if no content .toJSON() will crash... hence the check
        if (response.content.raw.count > 0) {
            return response.content.toJSON();
        }

        return null;
    }

    // Will redirect to login
    if (status === 401 || status === 403) {
        errorHandler.handleUnauthorisedError({
            error: 'Not Authorised Error',
            content: response.content.toJSON()
        });

        return null;
    }

    if (status >= 400) {
        throw {
            error: 'Http Error',
            response: response,
            content: response.content.toJSON()
        };
    }
}

function printResponse(response) {
    console.log('==================== HTTP RESPONSE ====================');
    console.log('Http Success: status: %s, content: %s',
        response.statusCode,
        response.content.toString());
    console.log('=======================================================');
}

// ======================================================