// variables to keep track of quiz state
var currentQuestionIndex = 0;
var time = questions.length * 10;
var timerId;

// variables to reference DOM elements
var questionsEId = document.getElementById("questions");
var timerEId = document.getElementById("time");
var choicesEId = document.getElementById("choices");
var submitBtnEId = document.getElementById("submit");
var startBtnEId = document.getElementById("start");
var nameEId = document.getElementById("name");
var feedbackEId = document.getElementById("feedback");

// sound effects
var sfxRight = new Audio("assets/sfx/correct.wav");
var sfxWrong = new Audio("assets/sfx/incorrect.wav");

function startQuiz() {
  // hide start screen
  var startScreen = document.getElementById("start-screen");
  startScreen.setAttribute("class", "start hide");

  // un-hide questions section
  questionsEId.setAttribute("class", " ");
  // start timer
  timerId = setInterval(function(){
    clockTick();
  }, 1000);
  // show starting time
  timerEId.textContent = time;

  getQuestion();
}

function getQuestion() {
  // get current question object from array
  var currentQuestion = questions[currentQuestionIndex];
  // update title with current question
  questionsEId.children[0].textContent = currentQuestion.title;
  // clear out any old question choices
  while (choicesEId
  .hasChildNodes()) {
    choicesEId
  .removeChild(choicesEId
    .lastChild);
  }
  // loop over choices
  for(var i = 0; i < currentQuestion.choices.length; i++){

    // create new button for each choice
    var choiceButton = document.createElement("button");
    choiceButton.textContent = currentQuestion.choices[i];
    
    // display on the page
    choicesEId
  .appendChild(choiceButton);
  }
  // attach click event listener to each choice
  choicesEId
.children[0].addEventListener("click", function(event){
    questionClick(choicesEId
    .children[0]);
  });
  choicesEId
.children[1].addEventListener("click", function(event){
    questionClick(choicesEId
    .children[1]);
  });
  choicesEId
.children[2].addEventListener("click", function(event){
    questionClick(choicesEId
    .children[2]);
  });
  choicesEId
.children[3].addEventListener("click", function(event){
    questionClick(choicesEId
    .children[3]);
  });
}

function questionClick(answerChoice) {
  // check if user guessed wrong  
  if(answerChoice.textContent != questions[currentQuestionIndex].answer){
    // penalize time
    time -= 10;
    // display new time on page
    feedbackEId.textContent = "Incorrect";
    // play "wrong" sound effect
    sfxWrong.play();
  }
  // else 
  else{
    // play "right" sound effect
    feedbackEId.textContent = "Correct";
    sfxRight.play();
  }

  // flash right/wrong feedback on page for half a second
  feedbackEId.setAttribute("class", "feedback");
  setInterval(function(){
    feedbackEId.setAttribute("class", "feedback hide");
  }, 500);

  // move to next question
  currentQuestionIndex++;

  // check if we've run out of questions
  if(currentQuestionIndex === questions.length)
    // quizEnd
    quizEnd();
  // else 
  else
    // getQuestion
    getQuestion();
}

function quizEnd() {
  // stop timer
  clearInterval(timerId);
  timerEId.textContent = time;

  // show end screen
  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.setAttribute("class", " ");

  // show final score
  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;

  // hide questions section
  questionsEId.setAttribute("class", "hide");
}

function clockTick() {
  // update time
  time--;
  timerEId.textContent = time;

  // check if user ran out of time
  if(time <= 0)
    quizEnd();
  
}

function saveHighscore() {
  // get value of input box
  var name = nameEId.value.toUpperCase();
  // make sure value wasn't empty
  if(name === ""){ 
    alert("Input mustn't be blank'");
    return;
  }
  else if(name.length > 5){
    alert("Input must be no more than 20 characters");
    return;
  }
  else{
    // get saved scores from localstorage, or if not any, set to empty array
    var highscores;
    if(JSON.parse(localStorage.getItem("highscores")) != null)
      highscores = JSON.parse(window.localStorage.getItem("highscores"));
    else
      highscores = [];
    // format new score object for current user
    var newScore = {
      name: name,
      score: time
    };
    highscores.push(newScore);
    // save to localstorage
    localStorage.setItem("highscores", JSON.stringify(highscores));
    // redirect to next page
    location.href = "highscores.html";
  }
}

function checkForEnter(event) {
  // check if event key is enter
    // saveHighscore
    if(event.keyCode === 13)
      saveHighscore();
}

// user clicks button to submit name
submitBtnEId.onclick = saveHighscore;

// user clicks button to start quiz
startBtnEId.onclick = startQuiz;

nameEId.onkeyup = checkForEnter;