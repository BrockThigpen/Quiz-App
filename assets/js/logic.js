// DOM elements
const highscoreBtn = document.getElementById('highscoreBtn');
const timerEl = document.getElementById('timer');
const startH = document.getElementById('startHead');
const startP = document.getElementById('startP');
const startBtn = document.getElementById('startBtn');
const questionEl = document.getElementById('theQuestion');
const answersEl = document.getElementById('answers');
const doneHEl = document.getElementById('doneH');
const donePEl = document.getElementById('doneP');
const enterIEl = document.getElementById('enterI');
const inputEl = document.getElementById('input');
const submitEl = document.getElementById('submit');
const scoreHEl = document.getElementById('scoreH');
const scoreListEl = document.getElementById('scoreList');
const restartEl = document.getElementById('restart');
const deleteScoresEl = document.getElementById('deleteScores');
// variables
let questionsShuflle, questionIndex;
let score = 0;
let timeRemaing = 0;
let showScore = 0;
// startBtn on click
startBtn.addEventListener("click", startQuiz);
function startQuiz(){
    startBtn.classList.add('hide');
    startH.classList.add('hide');
    startP.classList.add('hide');
    questionsShuflle = questions.sort(() => Math.random() - .5 );
    questionIndex = 0;
    questionEl.classList.remove('hide');
    answersEl.classList.remove('hide');
    showNextQ();
    setTimer();
}
// render quetions and choices 
function showNextQ(){
    resetState()
    if(questionsShuflle.length < questionIndex + 1){
        showScore = score + timeRemaing;
        highscoreBtn.classList.add('hide');
        timerEl.classList.add('hide');
        questionEl.classList.add('hide');
        answersEl.classList.add('hide');
        doneHEl.classList.remove('hide');
        donePEl.classList.remove('hide');
        donePEl.innerText = ('Your final score is ' + showScore);
        enterIEl.classList.remove('hide');
        inputEl.classList.remove('hide');
        submitEl.classList.remove('hide');
    }else {
        rendorQuestion(questionsShuflle[questionIndex])
    }
}
function rendorQuestion(questions) {
    questionEl.innerHTML = questions.title;
    for(let i = 0; i < questions.choices.length; i++){
        const holder = document.createElement('li');
        holder.innerText = questions.choices[i];
        answersEl.appendChild(holder)
    }
}
function resetState(){
    while(answersEl.firstChild){
        answersEl.removeChild(answersEl.firstChild)
    }
}
// answer on click
answersEl.addEventListener('click', function (e){
    let target = e.target;
    if(target.matches('li') === true){
        let picked = target.innerText;
        if(picked === questionsShuflle[questionIndex].answer){
            score = score + 20;
            questionIndex++;
            showNextQ();
        }else {
            questionIndex++;
            timeRemaing = timeRemaing - 10;
            showNextQ();
        }
    }
})
// timer
function setTimer () {
    timerEl.innerText = 'Time: 75';
    timeRemaing = questions.length * 15;
    let timer = setInterval( () => {
        timeRemaing--;
        timerEl.innerText = 'Time: '+ timeRemaing;
        if(timeRemaing <= 0){
            clearInterval(timer);
            showScore = score + timeRemaing;
            highscoreBtn.classList.add('hide');
            timerEl.classList.add('hide');
            questionEl.classList.add('hide');
            answersEl.classList.add('hide');
            doneHEl.classList.remove('hide');
            donePEl.classList.remove('hide');
            donePEl.innerText = ('You ran out of time, score is ' + showScore);
            enterIEl.classList.remove('hide');
            inputEl.classList.remove('hide');
            submitEl.classList.remove('hide');
        }
    }, 1000);
}
// go back button
restartEl.addEventListener('click', () => {
    // hide current dom elements 
    // show elements for startPage
    scoreHEl.classList.add('hide');
    scoreListEl.classList.add('hide');
    restartEl.classList.add('hide');
    // deleteScoresEl.classList.add('hide');
    startBtn.classList.remove('hide');
    startH.classList.remove('hide');
    startP.classList.remove('hide');
})
// delete scores
deleteScoresEl.addEventListener('click', clearScores);
function clearScores(){
  for (var i = 0; i < localStorage.length; i++){
    let lIndex = localStorage.key(i);
    remove_LocalStorage(lIndex);
   }
}
// submit button
// on click has if statement
// check if a string has been entered into input
// if not will create a <p></p> at the end of #scoreInput and display a messsge
// if so will save score and input to local storage, call function to hide current dom elements and remove hide from elements in show past scores