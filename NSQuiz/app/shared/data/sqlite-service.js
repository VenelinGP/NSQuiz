"use strict";
 var Sqlite = require("nativescript-sqlite");

var quizDb = {
	initializeSQLite: initializeSQLite,
	getCountQuizzes: getCountQuizzes,
	setQuizzes: setQuizzes
};

module.exports = quizDb;

function initializeSQLite() {
	
	return new Sqlite("nsQuiz.sqlite", function(err, db) {
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
}

function getCountQuizzes() {
	return new Sqlite("nsQuiz.sqlite", function(err, db) {
		if (err) { 
     		console.error("We failed to open database", err);
    	} 
    	else { 
      		// This should ALWAYS be true, db object is open in the "Callback" if no errors occurred 
      		console.log("Are we open yet (Inside Callback)? ", db.isOpen() ? "Yes" : "No"); // Yes 
    	}
      global.db.all('select * from quizzes where quizId >= ? and quizId <= ?', [1, 100], 
          function (err, row) {
            console.log("Row results it:", row); // Prints ["Row x Field_1", "Row x Field 2"...] for each row passed to it 
          });
		// global.db.each('select * from quizzes where quizId >= ? and quizId <= ?', [1, 100],
		// 	function(err, row) {
  // 				console.log("Row results it:", row);
		// 	})
			// .then(function (count) {
 		// 		 return this.count; // Prints 100  (Assuming their are a 100 rows found) 
			// 	});
	});
}

function setQuizzes() {
	return new Sqlite("nsQuiz.sqlite", function(err, db) {
		if (err) { 
     		console.error("We failed to open database", err);
    	} 
    	else { 
      		// This should ALWAYS be true, db object is open in the "Callback" if no errors occurred 
      		console.log("Are we open yet (Inside Callback)? ", db.isOpen() ? "Yes" : "No"); // Yes 
    	}
		global.db.execSQL("insert into quizzes (quizId, title, category, createdBy, createdOn ) values (?, ?, ?, ?, ?)", [4, "Terminator", "movies", "Some", "Today"],
			function(err, id) {
  				console.log("The new record id is:", id);
			});
	});
}