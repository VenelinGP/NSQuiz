'use strict';
var view;
var context;
var listPicker;
var closeCallback;

var pageObject = {
    onShownModally: onShownModally,
    onReadyTap: onReadyTap
};

module.exports = pageObject;

function onShownModally(args) {
    console.log('showing modally');

    view = args.object;
    context = args.context;
    listPicker = view.getViewById('quiz-categories');
    listPicker.items = context;

    closeCallback = args.closeCallback;
}

function onReadyTap() {
    var selected = listPicker.selectedIndex;
    console.log('selected index: ', selected);

    closeCallback(listPicker.items[selected]);
}