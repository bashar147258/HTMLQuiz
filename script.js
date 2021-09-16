var toggleSwitch = document.getElementById("lightbox");
var currentTheme = localStorage.getItem("theme");
var generateBtn = document.querySelector("#generate");
var clipboard = document.getElementById("copy");

var lowercase = document.getElementById("lowercase");
var uppercase = document.getElementById("uppercase");
var numeric = document.getElementById("numeric");
var special = document.getElementById("specialChars");
var length = document.getElementById("pass-len")
var string = "abcdefghijklmnopqrstuvwxyz";
var numbers = "0123456789";
var symbols = " !@#$%^&*()-=_+[{}]|:;',.<>`~" + '"';

//Themes
if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);

  if (currentTheme === "dark") {
    toggleSwitch.checked = true;
  }
}

function switchTheme(event) {
  if (event.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }
}

toggleSwitch.addEventListener("change", switchTheme, false);

//Password Gen
generateBtn.addEventListener("click", function () {
    var passLength = +length.valueOf()
    var hasLower =lowecase.checked
    var hasUpper =uppercase.checked
    var hasNumber=numeric.checked
    var hasSpecial=special.checked 

})

function generatePassword (lower, upper, numbers, specialChars, passLength)
//for (var i = 0; (i = passLength - 1); i++) {
//  Math.floor(Math.random() * xyz);
//}

//Copy Password
clipboard.addEventListener("click", function () {
  if (!password) {
    return;
  } else {
    document.querySelector("password").execCommand("copy");
  }
});

//Code for CSS  theme switch retrived from https://dev.to/ananyaneogi/create-a-dark-light-mode-switch-with-css-variables-34l8
//
