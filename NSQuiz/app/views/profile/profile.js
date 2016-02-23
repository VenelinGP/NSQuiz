'use strict';
var Observable = require("data/observable").Observable;
var appConfig = require('~/shared/config');

// =============== BUTTON DEMO ===================================
var demo = {
    text: "DEMO",
    isBusy: false,
    run: function () {
        var self = this;
        self.text = 'running';
        self.isBusy = true;

        setTimeout(function () {
            self.text = 'DEMO';
            self.isBusy = false;
        }, 5000)
    }
};
// ===============================================================

var view;
var context = new Observable({
    user: {},
    demo: demo
});

var pageObject = {
    pageLoaded: pageLoaded
};

module.exports = pageObject;

function pageLoaded(args) {
    view = args.object;
    view.bindingContext = context;

    appConfig.getUser()
        .then(function (user) {
            context.set('user', user);
        });
}

