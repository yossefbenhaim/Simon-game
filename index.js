var buttomColor = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var start = false;
var level = 0


$(document).keypress(function(){
    if(!start){
    $("h1").text("level " + level);
    nextSequence();

    start = true;
    }    
});


$(".btn").click(function (){


    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentColor){

    if (gamePattern[currentColor] === userClickedPattern[currentColor]){
        
        console.log("success");

        if (gamePattern.length === userClickedPattern.length){
            setTimeout(function () {
                nextSequence();
            },1000);
        }
    }else{
        console.log("wrong");
        playSound("wrong");

        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        $("#level-title").text("Game Over , Press Any Key to Reestar")
        
        startOver();
    }
}


function nextSequence(){
 
    userClickedPattern = [];
    level++;

    $("h1").text("level " + level);

    var randomNumber = Math.floor(Math.random() * 4)
    var randomChoosenColor = buttomColor[randomNumber]
    
    gamePattern.push(randomChoosenColor);
   
    $("#" + randomChoosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
   
    playSound(randomChoosenColor)

   
}


function playSound(theColor){
    var audio = new Audio('sounds/' + theColor +'.mp3');
    audio.play();
}


function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    },100);
    
}


function startOver(){
    level = 0;
    gamePattern = [];
    start = false;
}