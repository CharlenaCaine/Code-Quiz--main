let questionsContainer = document.querySelector("#questions");
let startBtn = document.getElementById("start");
let startScreen = document.getElementById("start-screen");
let span= document.querySelectorAll('span'); //returns array
let option0= document.getElementById('option0');
let option1= document.getElementById('option1');
let option2= document.getElementById('option2');
let option3= document.getElementById('option3');
let finalScore = document.getElementById("final-score");
let finalScreen = document.getElementById("end-screen");
let nextBtn = document.getElementById("next");
let questionTitle = document.getElementById("question-title");
let feedbackDiv = document.getElementById("feedback");
let time = document.getElementById("time");
let initials = document.getElementById("initials");
let userInitials = "";
let timeSeconds = 60;
let i=0;
let score= 0;
let countDown;

startBtn.addEventListener("click", function(){
    startScreen.style.display = "none";
    questionsContainer.style.display = 'block';
    nextBtn.style.display = "block";

    //timer
    time.innerHTML = `${timeSeconds}`

    countDown = setInterval(myTimer, 1000);
    function myTimer(){
        timeSeconds--;
        time.innerHTML = `${timeSeconds}`
        if(timeSeconds <= 0 || timeSeconds < 1 || finalScreen.style.display == 'block'){
            clearInterval(countDown);
            finalScore.innerHTML= score;
            questionsContainer.style.display= 'none';
            nextBtn.style.display = "none";
            finalScreen.style.display = 'block';
            feedbackDiv.style.display = 'none';
        }   
    }
    })

//to display questions
function displayQuestion(){
    questionTitle.innerHTML= questions[i].question;
    option1.innerHTML= questions[i].choice[1];
    option0.innerHTML= questions[i].choice[0];
    option2.innerHTML= questions[i].choice[2];
    option3.innerHTML= questions[i].choice[3];
    // stat.innerHTML= "Question"+' '+(i+1)+' '+'of'+' '+questions.length;
    
}

function userChoice(evt) {
    userChoice = evt.target.textContent;
    if (userChoice != questions[i].answer){
        timeSeconds -= 10;
    }
    
    if (userChoice == questions[i].answer){
        score += 10;
        //show right
        feedbackDiv.style.display = 'block';
        feedbackDiv.innerHTML = "Correct";
        }  else {
        //show wrong
        feedbackDiv.style.display = 'block';
        feedbackDiv.innerHTML = "Wrong";
        }
        return timeSeconds;
  }

choices.addEventListener("click", userChoice);

//to calculate score
function calcScore(e){
    if(userChoice===questions[i].answer )
    {
        score += 10;
    }
    setTimeout(nextQuestion,1000);
}

//function to display next question
function nextQuestion(){
    if(i<questions.length-1 )
    {
        i=i+1;
        displayQuestion();
    }
    else{
        finalScore.innerHTML= score;
        questionsContainer.style.display= 'none';
        nextBtn.style.display = "none";
        finalScreen.style.display = 'block';

    }
    // checkAnswer();
    feedbackDiv.style.display = 'none';

}

//click events to next button
nextBtn.addEventListener('click',nextQuestion);

displayQuestion();

function saveInitials(){
    userInitials = initials.value;
    console.log(userInitials);
    console.log(score);
    localStorage.setItem("initials", userInitials);
    localStorage.setItem("currentScore", score);
    initials.value = "";
}