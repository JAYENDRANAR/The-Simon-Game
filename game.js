// alert("hello");

var userClickedPattern = [];
var gamePattern = [];

var buttonColours = ["red", "blue","green", "yellow"];

//You'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var started = false;
//2. Create a new variable called level and start at level 0.
var level = 0;

$(document).keydown(function(){

  if(! started){
    $("#level-title").text("level"+ level);
    nextSequence();
    started = true;
  }
  
})



$(".btn").click(function(event){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  
  playSound(userChosenColour);
  animatePress(userChosenColour);


   //2. Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel){
if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
  console.log("success");
    
   if (userClickedPattern.length === gamePattern.length){
     
    setTimeout(function () {
          nextSequence();
        }, 1000);
  }
}else{
  console.log("wrong");
  playSound("wrong");


  $("body").addClass("game-over");
       $("#level-title").text("Game Over, Press Any Key to Restart");


  setTimeout(function(){
      $("body").removeClass("game-over")},200);
      startOver();
  }
}




function nextSequence(){
    
  //6. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];

  level++;
   $("#level-title").text("Level " + level);

    var randomNumber = Math.floor((Math.random() * 3)+1);
    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" +randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}




function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor){
  $("#"+ currentColor).addClass("pressed");

  setTimeout(function(){
      $("#"+ currentColor).removeClass("pressed");
 },100);
}


function startOver(){
  level= 0;
gamePattern=[];
started = false;
}



