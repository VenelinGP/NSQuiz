"use strict";
var appSettings = require("application-settings");

var currentUser = {};
var deferred = Promise.defer();

var configObject = {
	apiUrl: "http://superquiz.apphb.com/",
	invalidateToken: function() {
		this.token = "";
	},
	getUser: function() {
		if (this.isAuthenticated) {
			return new Promise(function(resolve) {
				resolve(currentUser)
			})
		} else {
			// user will be returned as soon as it's set using the setUser function
			return deferred.promise;
		}
	},
	setUser: function(user) {
		currentUser = user;
		deferred.resolve(user);
	},
	removeUser: function () {
		currentUser = {};
		deferred = $q.defer();
	}
};

Object.defineProperties(configObject, {
	token: {
		get: function() {
			return appSettings.getString("token");
		},
		set: function(token) {
			return appSettings.setString("token", token);
		}
	},

	isAuthenticated: {
		get: function() {
			return Object.getOwnPropertyNames(currentUser).length !== 0;
		}
	}
});

module.exports = configObject;