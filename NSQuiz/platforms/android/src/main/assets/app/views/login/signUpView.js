var view = require("ui/core/view");
var buttonModule = require("ui/button");
var observable = require("data/observable");

function onLoad(args) {
    var page = args.object;

    var nameTextField = view.getViewById(page, "name");
    var emailTextField = view.getViewById(page, "email");
    var passwordTextField = view.getViewById(page, "password");
    var signUpButton = view.getViewById(page, "signUpButton");
    var resultLabel = view.getViewById(page, "result");


    signUpButton.on(buttonModule.Button.tapEvent, function () {

        var result = "";

        if(nameTextField.text === "" || emailTextField.text === "" || passwordTextField.text === ""){
            result = "Error: All fields required";
            console.log(result);
        }
        else{
            result = "Success!!!\nName: " + nameTextField.text + "\nEmail:" + emailTextField.text + "\nPassword: " + passwordTextField.text;
            console.log(result);
        resultLabel.text = result;
        }
    });
}

exports.loadSignUpView = onLoad;