"use strict";
var navigation = require('../../shared/navigation');
var builder = require("ui/builder");

var drawer;
var mainContentPlaceholder;

var viewObject = {
    pageLoaded: pageLoaded,
    toggleSidebar: toggleSidebar,
    onNavigatedTo: onNavigatedTo
};

module.exports = viewObject;

function pageLoaded(args) {
    console.log("Main page loaded");
    var page = args.object;

    drawer = page.getViewById('side-drawer');
    navigation.setDrawer(drawer);

    mainContentPlaceholder = page.getViewById('main-content');

    setupPageLayout(page.navigationContext);
}

function onNavigatedTo(args) {
    console.log('navigated to main');
}

function toggleSidebar() {
    drawer.toggleDrawerState();
}

function setupPageLayout(navContext) {
    if (navContext && navContext.partial) {
        mainContentPlaceholder.removeChildren();
        mainContentPlaceholder.addChild(navContext.partial);
    }
}