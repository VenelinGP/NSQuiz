"use strict";
var navigation = require('../../shared/navigation');
var appConfig = require('../../shared/config');

var viewObject = {
    pageLoaded: pageLoaded,
    goToList: navigation.goToQuizListPage,
    goToCreate: navigation.goToCreateQuiz,
    signOut: navigation.signOut,
    goToProfilePage: navigation.goToProfilePage,
    toggleSideDrawer: navigation.toggleDrawer
};

module.exports = viewObject;

function pageLoaded(args) {
    console.log("Page loaded");
    var page = args.object;
    var header = page.getViewById('sidebarHeader');

    appConfig.getUser()
        .then(function(user) {
            console.log('setting user');
            header.text = user.username;
        });
}
