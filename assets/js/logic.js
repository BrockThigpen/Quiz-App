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
const deleteScoresEl = document.getElementById('deletescores');
// variables
let questionsShuflle, questionIndex;
let score = 0;
let timeRemaing = 0;
let showScore = 0;
let name = '';
let timer;
let savedScores = [];
// view highscore btn
highscoreBtn.addEventListener('click', () => {
    stopTimer();
    startBtn.classList.add('hide');
    startH.classList.add('hide');
    startP.classList.add('hide');
    highscoreBtn.classList.add('hide');
    timerEl.classList.add('hide');
    questionEl.classList.add('hide');
    answersEl.classList.add('hide');
    scoreHEl.classList.remove('hide');
    scoreListEl.classList.remove('hide');
    restartEl.classList.remove('hide');
    deleteScoresEl.classList.remove('hide');

})
// startBtn on click
startBtn.addEventListener("click", startQuiz);
function startQuiz(){
    score = 0;
    startBtn.classList.add('hide');
    startH.classList.add('hide');
    startP.classList.add('hide');
    questionsShuflle = questions.sort(() => Math.random() - .5 );
    questionIndex = 0;
    questionEl.classList.remove('hide');
    answersEl.classList.remove('hide');
    inputEl.value = '';
    showNextQ();
    setTimer();
}
// render quetions and choices 
function showNextQ(){
    resetState()
    if(questionsShuflle.length < questionIndex + 1){
        stopTimer();
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
    timer = setInterval( () => {
        timeRemaing--;
        timerEl.innerText = 'Time: '+ timeRemaing;
        if(timeRemaing === 0){
            stopTimer();
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
function stopTimer(){
    clearInterval(timer);
}
// go back button
restartEl.addEventListener('click', () => {
    scoreHEl.classList.add('hide');
    scoreListEl.classList.add('hide');
    restartEl.classList.add('hide');
    deleteScoresEl.classList.add('hide');
    startBtn.classList.remove('hide');
    startH.classList.remove('hide');
    startP.classList.remove('hide');
    highscoreBtn.classList.remove('hide');
    timerEl.classList.remove('hide');
    timerEl.innerText = 'Time: ';
    stopTimer();
})
// delete scores
deleteScoresEl.addEventListener('click', () => {
    localStorage.clear();
    savedScores = [];
    while(scoreListEl.firstChild){
        scoreListEl.removeChild(scoreListEl.firstChild)
    }
})
// submit button
submitEl.addEventListener('click', () => {
    name = inputEl.value.trim();
    if(!name){
        inputEl.placeholder = 'Please enter initials';
    }else{
        savedScores.push({name: name, score: showScore});
        localStorage.setItem('theScores', JSON.stringify(savedScores));
        pastScores();
    }
})
function pastScores(){
    doneHEl.classList.add('hide');
    donePEl.classList.add('hide');
    enterIEl.classList.add('hide');
    inputEl.classList.add('hide');
    submitEl.classList.add('hide');
    resetList();
    let displayScores = JSON.parse(localStorage.getItem('theScores'));
    for (let i = 0; i < displayScores.length; i++){
        const holder = document.createElement('li');
        holder.innerText = displayScores[i].name + "'s score is: " + displayScores[i].score;
        scoreListEl.appendChild(holder);
    }
    scoreHEl.classList.remove('hide');
    scoreListEl.classList.remove('hide');
    restartEl.classList.remove('hide');
    deleteScoresEl.classList.remove('hide');
}
function resetList(){
    while(scoreListEl.firstChild){
        scoreListEl.removeChild(scoreListEl.firstChild)
    }
}