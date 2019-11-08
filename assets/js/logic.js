// DOM elements
const highscoreBtn = document.getElementById('highscoreBtn');
const timerEl = document.getElementById('timer');
const startH = document.getElementById('startHead');
const startP = document.getElementById('startP');
const startBtn = document.getElementById('startBtn');
const questionEl = document.getElementById('theQuestion');
const answersEl = document.getElementById('answers');

let questionsShuflle, questionIndex;

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
}

// render quetions
function showNextQ(){
    rendorQuestion(questionsShuflle[questionIndex])
}
function rendorQuestion(questions) {
    questionEl.innerHTML = questions.title;
    questions.choices.forEach(choices =>{
        const holder = document.createElement('li');
        holder.innerText = choices.text;
        answersEl.appendChild(holder)

    })
}