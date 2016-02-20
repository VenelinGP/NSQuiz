'use strict';

var appConfig = require('../config');
var http = require('http');

var BASE_URL = appConfig.apiUrl;

// =============== INTERFACE ============================

// Returns promises
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
                // Error here when JSON.stringify(response), response.content when response content is empty

                if (response.statusCode >= 400) {
                    var content = response.content.toJSON();
                    logResponse(response, content);
                } else {
                    logResponse(response);
                    resolve();
                }
            })
            .catch(function (error) {
                logHttpError(error);
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
                var content = response.content.toJSON();
                var tokenValue = content.access_token;

                logResponse(response, content);

                // Todo: configure expiration if possible
                var validTo = new Date();
                validTo.setDate(validTo.getDay() + 14);

                appConfig.token = tokenValue;

                resolve(content);
            })
            .catch(function (error) {
                logHttpError(error);
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
                var content = response.content.toJSON();
                logResponse(response, content);

                appConfig.currentUser = response;
                resolve(content);
            })
            .catch(function (error) {
                logHttpError(error);
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
                var content = response.content.toJSON();
                logResponse(response, content);

                resolve(content);
            })
            .catch(function (error) {
                logHttpError(error);
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
                var content = response.content.toJSON();
                logResponse(response, content);

                resolve(content);
            })
            .catch(function (error) {
                logHttpError(error);
                reject(error);
            });
    });
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

function logResponse(response, content) {
    if (response.statusCode >= 400) {
        //logHttpError(content);
        throw {
            error: 'Http Module Error',
            content: content
        };
    }

    console.log('Http Success: status: %s, response: %s', response.statusCode, JSON.stringify(content));
}

function logHttpError(error) {
    console.log('!!! Http Error !!!');

    logProperties(error);

    console.log('!!! Error Report Ended !!!')
}

function logProperties(obj, indent) {
    if (!indent || !indent.length) {
        indent = "";
    }

    for (var prop in obj) {

        if (obj[prop] !== null && typeof obj[prop] === 'object') {
            console.log('%s%s', indent, prop);
            logProperties(obj[prop], indent += "\t");
        } else {
            console.log('%s%s : %s', indent, prop, obj[prop]);
        }
    }
}

// ======================================================