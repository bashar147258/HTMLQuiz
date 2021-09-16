/*GIVEN I am taking a code quiz
WHEN I click the start button
THEN a timer starts and I am presented with a question
WHEN I answer a question
THEN I am presented with another question
WHEN I answer a question incorrectly
THEN time is subtracted from the clock
WHEN all questions are answered or the timer reaches 0
THEN the game is over
WHEN the game is over
THEN I can save my initials and my score
*/

//Themes
var toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
var currentTheme = localStorage.getItem('theme'); 
//Quiz Elements
/*var quizStart=document.querySelector('.sButton') */
var quizE1 = document.querySelector('.question')
var answerE1 =document.querySelector('.choices')
var progressBar = document.getElementById('myProgress');
var progssText=document.getElementById('myBar')
var scoreBox = document.querySelector('.records')
var optionA = document.createElement("button");
var optionB = document.createElement("button");
var optionC = document.createElement("button");
/*
option1.classList.add("hide");
option2.classList.add("hide");
option3.classList.add("hide");
*/
answerE1.appendChild(optionA);
answerE1.appendChild(optionB);
answerE1.appendChild(optionC);


//score
var score= 0;
var pWidth=0;
var currentIndex= 0;
var highScores = '';
var remainingTime=""

var timerE1=document.querySelector(".timer");

/*
function beginQuiz(){
    var startButton =document.createElement("button");
    startButton.innerHTML ="Start the Quiz";
    startButton.setAttribute("id", "option");
    quizStart.appendChild(startButton);
    startButton.addEventListener("click", startQuiz);
    
   
}
*/



function startQuiz() {
    //var startButton=document.querySelector('.startbutton');
    //var buttons=document.querySelector('.choices')
    //startButton.remove();
    answerE1.classList.remove("hide")
    timer();
    getQuestion();

}

// Theming
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
  
    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
    }
}

function switchTheme(event) {
    if (event.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
    else { 
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }    
}

toggleSwitch.addEventListener('change', switchTheme, false);

/*Timer function
*/
function timer() {
    var timeLeft=5;

    var timeInterval = setInterval(function () {
        if (timeLeft===0) {
            clearInterval(timeInterval)
            gameOver()
        } else if (timeLeft===1) {
            timeLeft--;
            timerE1.textContent='Time Remaing: '+ timeLeft + ' second';
        } else {
            timeLeft--;
            timerE1.textContent='Time Remaing: '+ timeLeft + ' seconds';
        }
    }, 1000);
}

function showHighSchore() {
    if (!highScores){
        scoreBox.textContent="No scores yet!"
    } else {
    scoreBox.textContent=localStorage.getItem(name, score)
    }
}



//Quiz
function getQuestion() {
    currentQuestion= theQuestions[currentIndex];
    quizE1.textContent=currentQuestion.question;

    optionA.innerHTML = currentQuestion.option1;
    optionB.textContent = currentQuestion.option2;
    optionC.textContent = currentQuestion.option3;
    console.log(optionA)
    //optionA.addEventListener("click",selectAnswer)
    //optionB.addEventListener("click",selectAnswer)
    //optionC.addEventListener("click",selectAnswer)

}

function selectAnswer(event){
    var selected=event.currentTarget.textContent
    if (selected===currentQuestion.answer) {
        score++;
    } else {
        timeLeft -= 10
    }
    if (currentIndex=== theQuestions.length-1){
        gameOver();
        remainingTime=timeLeft
        timeLeft=0;
        progressBar.style.width="100%";
        progressText.innerText="100%";
    } else {
        currentIndex++;
        pWidth+=20
        progressBar.style.width=pWidth+"%";
        progressText.innerHTML  = pWidth+"%";
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
        answer:  1
    },
    {
        question: "Choose the correct HTML element to define important text",
        option1: "<b>",
        option2: "<strong>",
        option3: "<important>",
        answer:  2
    },
    {
        question: "How can you open a link in a new tab/browser window?",
        option1: '<a href="url" target=_"blank">',
        option2: '<a href="url" new>',
        option3: '<a href="url" target= "new">',
        answer:  1
    },
    {
        question: "What is the correct HTML for making a text area?",
        option1: '<textarea>',
        option2: '<input type="textarea">',
        option3: '<input type="textbox">',
        answer:  1
    },
    {
        question: "What is the correct HTML for inserting an image?",
        option1: '<image src ="image.webp" alt="image">',
        option2: '<img href="image.tiff" alt="image">',
        option3: '<img src="image.gif" alt="image">',
        answer:  3
    }
];
startQuiz();

function gameOver() {
    checkHighScore(score)
}

function checkHighScore() {

    if (!highScores){
        saveHighScore(score)
    } else if (score > highScores){
        saveHighScore(score)
    } else {
    }
}
function saveHighScore(event) {
    var name = prompt("New Highscore! Enter your name: ");
    localStorage.setItem(name, score);
};
startQuiz();




