//Theming Elements
var toggleSwitch = document.querySelector(
  '.theme-switch input[type="checkbox"]'
);
var currentTheme = localStorage.getItem("theme");

// Broken code from a prompt altern
//var quizScore = document.querySelector(".prompt");
//var submitEvent = document.querySelector(".submission");

//Quiz Elements
var quizStart = document.querySelector(".sButton");
var quizE1 = document.querySelector(".question");
var answerE1 = document.querySelector(".choices");
var progressBar = document.getElementById("myBar");
var feedBack = document.querySelector(".feedback");
var scoreCount = document.querySelector(".scoreCounter");
var recordBox = document.querySelector(".record");
var optionA = document.createElement("button");
var optionB = document.createElement("button");
var optionC = document.createElement("button");

//Answer elements
optionA.classList.add("hide", "option");
optionB.classList.add("hide", "option");
optionC.classList.add("hide", "option");

answerE1.appendChild(optionA);
answerE1.appendChild(optionB);
answerE1.appendChild(optionC);

//score
var score = 0;
var pWidth = 0;
var currentIndex = 0;
var timeLeft = 50;
var highScore;
var remainingTime = "";

//timer
var timerE1 = document.querySelector(".timer");

//Creates start button
function beginQuiz() {
  var startButton = document.createElement("button");
  startButton.innerHTML = "Start the Quiz";
  startButton.classList.add("option");
  quizStart.appendChild(startButton);
  startButton.addEventListener("click", startQuiz);
}

// Starts the quiz, removes start button. unhides answer buttons,
function startQuiz() {
  quizStart.remove();
  optionA.classList.remove("hide");
  optionB.classList.remove("hide");
  optionC.classList.remove("hide");
  //answerE1.children.classList.remove("hide");
  timer(); //starts timer function
  getQuestion(); //Gets first question
}

// Theming
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

//Timer function
function timer() {
  var timeInterval = setInterval(function () {
    if (timeLeft === 0) {
      clearInterval(timeInterval);
      remainingTime = 0;
      gameOver();
    } else if (timeLeft === 1) {
      timeLeft--;
      timerE1.textContent = "Time Remaing: " + timeLeft + " second";
    } else if (timeLeft < 0) {
      clearInterval(timeInterval);
      remainingTime = 0;
      gameOver();
    } else {
      timeLeft--;
      timerE1.textContent = "Time Remaing: " + timeLeft + " seconds";
    }
  }, 1000);
}

function showHighScore() {
  recordBox.textContent =
    localStorage.getItem(highScore) ?? "No score has been set";
}

//Quiz
function getQuestion() {
  currentQuestion = theQuestions[currentIndex];
  quizE1.textContent = currentQuestion.question;

  optionA.textContent = currentQuestion.option1;
  optionB.textContent = currentQuestion.option2;
  optionC.textContent = currentQuestion.option3;
  optionA.addEventListener("click", selectAnswer);
  optionB.addEventListener("click", selectAnswer);
  optionC.addEventListener("click", selectAnswer);
}

function selectAnswer(event) {
  var selected = event.currentTarget.textContent;
  if (selected === currentQuestion.answer) {
    score++;
    feedBack.textContent = "Correct!";
    scoreCount.textContent = score;
  } else {
    timeLeft -= 10;
    feedBack.textContent = "Incorrect";
    scoreCount.textContent = score;
  }
  if (currentIndex === theQuestions.length - 1) {
    remainingTime = timeLeft;
    timeLeft = 0;
    progressBar.style.width = "100%";
    progressBar.innerText = "100%";
    gameOver();
  } else {
    currentIndex++;
    pWidth += 20;
    progressBar.style.width = pWidth + "%";
    progressBar.innerHTML = pWidth + "%";
    getQuestion();
  }
}

// <p id="question"></p>

//Questions: retreived from https://www.w3schools.com/quiztest/quiztest.asp?qtest=HTML
var theQuestions = [
  {
    question: "What does HTML stand for?",
    option1: "Home Tool Markup Language",
    option2: "Hyperlinks and Text Markup Language",
    option3: "Hyper Text Markup Language",
    answer: "Hyper Text Markup Language",
  },
  {
    question: "Choose the correct HTML element to define important text",
    option1: "<b>",
    option2: "<strong>",
    option3: "<important>",
    answer: "<strong>",
  },
  {
    question: "How can you open a link in a new tab/browser window?",
    option1: '<a href="url" target=_"blank">',
    option2: '<a href="url" new>',
    option3: '<a href="url" target= "new">',
    answer: '<a href="url" target=_"blank">',
  },
  {
    question: "What is the correct HTML for making a text area?",
    option1: "<textarea>",
    option2: '<input type="textarea">',
    option3: '<input type="textbox">',
    answer: "<textarea>",
  },
  {
    question: "What is the correct HTML for inserting an image?",
    option1: '<image src ="image.webp" alt="image">',
    option2: '<img href="image.tiff" alt="image">',
    option3: '<img src="image.gif" alt="image">',
    answer: '<img src="image.gif" alt="image">',
  },
];
showHighScore();
beginQuiz();

function gameOver() {
  optionA.classList.add("hide");
  optionB.classList.add("hide");
  optionC.classList.add("hide");
  quizE1.textContent = "You scored: " + score;
  checkHighScore(score);
}

function checkHighScore() {
  if (score > highScore) {
    localStorage.removeItem("highScore");
    createHighScore();
  } else {
    feedBack.textContent = "Better Luck Next Time";
  }
}

function createHighScore() {
  var Name = prompt("New Highscore! Enter your name: ");
  highScore = score;
  localStorage.setItem(highScore, Name);
  /*scoreCount.remove();
  var name = document.createElement("input");
  name.setAttribute("type", "text");
  quizScore.append(name);
  var submitScore = document.createElement("button");
  submitScore.setAttribute("type", "submit");
  submitScore.classList.add("option");
  submitScore.innerHTML = "Submit";
  submitEvent.appendChild(submitScore);

  submitScore.addEventListener(
    "submit",
    localStorage.setItem("highScore", name.value, score)
  );*/
}
