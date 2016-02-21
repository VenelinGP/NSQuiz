"use strict";
 var Sqlite = require("nativescript-sqlite");

exports.initializeSQLite = function() {
	
	var db_promise = new Sqlite("nsQuiz.sqlite", function(err, db) {
    	if (err) { 
     		console.error("We failed to open database", err);
    	} 
    	else { 
      		// This should ALWAYS be true, db object is open in the "Callback" if no errors occurred 
      		console.log("Are we open yet (Inside Callback)? ", db.isOpen() ? "Yes" : "No"); // Yes 
      		global.db = db;
    	}

    	global.db.execSQL("CREATE TABLE `quizzes` (`quizId` INTEGER NOT NULL PRIMARY KEY, `title` TEXT NOT NULL, `category` TEXT NOT NULL, `createdBy` TEXT NOT NULL, `createdOn` TEXT NOT NULL, `avatarUrl` TEXT);"); 
    	console.log("Table created..."); 
	});

	// db_promise.then(function(db) {
 //    // This should ALWAYS be true, db object is open in the "then" 
 //      console.log("Are we open yet (Inside Promise)? ", db.isOpen() ? "Yes" : "No"); // Yes 
 //      db.close();
 //   }, function(err) {
 //     console.error("We failed to open database", err);
 //   });
};