"use strict";
var appSettings = require("application-settings");

var currentUser = {};

var configObject = {
	apiUrl: "http://superquiz.apphb.com/",
	invalidateToken: function() {
		this.token = "";
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

	currentUser: {
		get: function() {
			return currentUser;
		},
		set: function(user) {
			currentUser = user;
		}
	},

	isAuthenticated: {
		get: function() {
			return Object.getOwnPropertyNames(currentUser).length !== 0;
		}
	}
});

module.exports = configObject;