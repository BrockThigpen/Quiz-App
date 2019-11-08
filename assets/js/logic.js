// DOM elements
let highscoreBtn = document.getElementById('#highscoreBtn');
let timerEl = document.getElementById('#timer');
var startH = document.getElementById('#startHead');
var startP = document.getElementById('startP');
var startBtn = document.getElementById('#startBtn');
let questionEl = document.getElementById('#theQuestion');
let answersEl = document.getElementById('#answers');

// startBtn on click
startBtn.addEventListener("click", () => {
    startBtn.classList.add('hide');
    startH.classList.add('hide');
    startp.classList.add('hide');
});