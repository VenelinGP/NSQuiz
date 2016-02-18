var view = require("ui/core/view");
var frameModule = require("ui/frame");
// var buttonModule = require("ui/button");
// var observable = require("data/observable");

var pageModules = {
        onLoad: function (args) {

       
        var page = args.object;

        var nameTextField = view.getViewById(page, "name");
        var emailTextField = view.getViewById(page, "email");
        var passwordTextField = view.getViewById(page, "password");
        var signInButton = view.getViewById(page, "signInButton");
        var options = {
            sourceProperty: "buttonTitle",
            targetProperty: "text"
        };
        // signInButton.bind(options, model)

        // signInButton.on(buttonModule.Button.tapEvent, function () {

        //     var result = "";

        //     if(nameTextField.text === "" || emailTextField.text === "" || passwordTextField.text === ""){
        //         result = "Error: All fields required";
        //         console.log(result);
        //     }
        //     else{
        //         result = "Success!!!\nName: " + nameTextField.text + "\nEmail:" + emailTextField.text + "\nPassword: " + passwordTextField.text;
        //         console.log(result);
        // }
        // });
    }
}

// exports.loadSignInView = pageModules.onLoad;
exports.signIn = function() {
    alert("Signing in");
};

exports.register = function() {
    var topmost = frameModule.topmost();
    topmost.navigate("views/register/register");
};