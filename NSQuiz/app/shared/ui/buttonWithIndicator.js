var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };

var dependencyObservable = require("ui/core/dependency-observable");
var proxy = require("ui/core/proxy");
var gridLayout = require('ui/layouts/grid-layout');
var builder_1 = require('ui/builder');
var fs = require("file-system");

var textProperty = new dependencyObservable.Property("text", "ButtonWithIndicator", new proxy.PropertyMetadata(""));
var isBusyProperty = new dependencyObservable.Property("isBusy", "ButtonWithIndicator", new proxy.PropertyMetadata(""));

var ButtonWithIndicator = (function (_super) {
    __extends(ButtonWithIndicator, _super);
    function ButtonWithIndicator() {
        _super.call(this);
        this.init();
        this._command = null;
    }

    Object.defineProperties(ButtonWithIndicator.prototype, {
        text: {
            get: function () {
                return this._getValue(ButtonWithIndicator.textProperty);
            },
            set: function (value) {
                this._setValue(ButtonWithIndicator.textProperty, value);
            },
            enumerable: true,
            configurable: true
        },
        isBusy: {
            get: function () {
                return this._getValue(ButtonWithIndicator.isBusyProperty);
            },
            set: function (value) {
                this._setValue(ButtonWithIndicator.isBusyProperty, value);
            },
            enumerable: true,
            configurable: true
        },
        command: {
            get: function() {
                return this._command;
            },
            set: function(value) {
                this._command = value;
            },
            enumerable: true,
            configurable: true
        }
    });

    ButtonWithIndicator.prototype.attachView = function () {
        var xml = getFileContent(ButtonWithIndicator.templateUrl);
        var view = builder_1.parse(xml);
        this.addChild(view);
    };
    ButtonWithIndicator.prototype.init = function () {
        //this.bindingContext = this;
        this.attachView();
        var rootPanel = this.getViewById("btn-indicator-root");
        rootPanel.bindingContext = this;
    };

    ButtonWithIndicator.prototype.tap = function() {};

    ButtonWithIndicator.templateUrl = 'shared/ui/buttonWithIndicator.xml';

    ButtonWithIndicator.textProperty = textProperty;
    ButtonWithIndicator.isBusyProperty = isBusyProperty;

    return ButtonWithIndicator;
})(gridLayout.GridLayout);
exports.ButtonWithIndicator = ButtonWithIndicator;

/**
 * Loads and parses template xml file
 */
function getFileContent(path) {
    console.log('CUSTOM BUTTON');
    path = path.replace("~/", "");
    var fullFilePath = fs.path.join(fs.knownFolders.currentApp().path, path);
    var fileContent;
    if (fs.File.exists(fullFilePath)) {
        var file = fs.File.fromPath(fullFilePath);
        var onError = function (error) {
            throw new Error("Error loading file " + fullFilePath + " :" + error.message);
        };
        fileContent = file.readTextSync(onError);
    }
    return fileContent;
}