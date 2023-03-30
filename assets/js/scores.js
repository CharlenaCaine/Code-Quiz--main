var highscores = document.getElementById("highscores");
var clearScore = document.getElementById("clear");

var storedInitials = localStorage.getItem("initials");
var storedScore = localStorage.getItem("currentScore");
console.log(storedInitials)
console.log(storedScore)

var li = document.createElement("li");
li.innerHTML = `${storedInitials} - ${storedScore}`;
highscores.appendChild(li);

clearScore.addEventListener("click", function (){
    li.remove();
})