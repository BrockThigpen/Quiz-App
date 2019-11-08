// DOM elements
const highscoreBtn = document.getElementById('highscoreBtn');
const timerEl = document.getElementById('timer');
const startH = document.getElementById('startHead');
const startP = document.getElementById('startP');
const startBtn = document.getElementById('startBtn');
const questionEl = document.getElementById('theQuestion');
const answersEl = document.getElementById('answers');

// variables
let questionsShuflle, questionIndex;
let score = 0;
let timeRemaing = 0;

// startBtn on click
startBtn.addEventListener("click", startQuiz);
function startQuiz(){
    startBtn.classList.add('hide');
    startH.classList.add('hide');
    startP.classList.add('hide');
    questionEl.classList.remove('hide');
    answersEl.classList.remove('hide');
    questionsShuflle = questions.sort(() => Math.random() - .5 );
    questionIndex = 0;
    showNextQ();
    setTimer();
}
// render quetions and choices 
function showNextQ(){
    rendorQuestion(questionsShuflle[questionIndex])
}
function rendorQuestion(questions) {
    questionEl.innerHTML = questions.title;
    for(let i = 0; i < questions.choices.length; i++){
        const holder = document.createElement('li');
        holder.innerText = questions.choices[i];
        answersEl.appendChild(holder)
    }
}
// answer on click
answersEl.addEventListener('click', function (e){
    let target = event.target;
    if(target.matches('li') === true){
        let picked = target.innerText;
        if(picked === questionsShuflle[questionIndex].answer){
            score = score + 20;
            showNextQ();
            console.log(score);
        }else{
            timeRemaing = timeRemaing - 10;
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
            // end attempt, get score, send to scores page
        }
    }, 1000);
}