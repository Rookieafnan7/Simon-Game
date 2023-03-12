

var memArr = [];
var index = 0;
var levelCount = 0;

var gameOn = false;

$(document).keydown(function(event){
    // console.log(event.key);
    if(!gameOn){
        gameOn = true;
        nextLevelUpdate();
    }
})
// $(document).keydown(start);

$(".btn").click(function(){
    $(this).toggleClass("pressed");
    var temp = this;
    var buttonNum = checkButtonClick(temp)
    var soundName = getSoundName(buttonNum);
    var audio = new Audio("sounds/"+soundName);
    audio.play();
    if(gameOn){
        var buttonClicked = buttonNum;
        if(buttonClicked === memArr[index]){
            updateClick();
        }else{
            gameOver();
        }
    }else{
        gameOver();
    }
    setTimeout(function(){
        $(temp).toggleClass("pressed");
    },100);
});

// let tempArr = memArr;

function updateClick(){
    index++;
    if(index>=memArr.length){
        nextLevelUpdate();
    }
}

function nextLevelUpdate(){
    //induced initial delay
    index = 0;
    if(levelCount===0){
        setTimeout(function(){},50);
    }
    levelCount++;
    levelHeadingUpdate();
    var randNum = Math.floor(Math.random()*4) + 1;

    memArr.push(randNum);

    //press without updating memArr with ample delay for animations

    let btnClass = ".btn"+randNum;
    setTimeout(function(){
        $(btnClass).toggleClass("pressed");
    setTimeout(function(){
        var soundName = getSoundName(randNum);
        var audio = new Audio("sounds/"+soundName);
        audio.play();  
        $(btnClass).toggleClass("pressed");
    },100);
    },1000);
    
}


function checkButtonClick(temp){
    if(temp.classList.contains("btn1")){
        // console.log(temp.classList.contains("btn1"));
        // console.log(1);
        return 1;
    }else if(temp.classList.contains("btn2")){
        // console.log(temp.classList.contains("btn2"));
        // console.log(2);
        return 2;
    }else if(temp.classList.contains("btn3")){
        // console.log(temp.classList.contains("btn3"));
        // console.log(3);
        return 3;
    }else{
        // console.log(temp.classList.contains("btn4"));
        // console.log(4);
        return 4;
    }
}

function levelHeadingUpdate(){
    var levelText = "Level " + levelCount;
    $("h1").text(levelText);
}

// function buttonClickForNextLevel(num){
    
// }

function gameOver(){
    gameOn = false;
    memArr = [];
    levelCount = 0;
    index = 0;
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("h1").text("Game Over, Press Any Key to Restart");
    $("body").toggleClass("game-over");
    setTimeout(function(){
        $("body").toggleClass("game-over");
    },100);
}

function getSoundName(num){
    var soundName = "";
    switch(num){
        case 1:
            soundName = "green.mp3";
            break;
        case 2:
            soundName = "red.mp3"
            break;
        case 3: 
            soundName = "yellow.mp3";
            break;
        case 4:
            soundName = "blue.mp3";
            break;
    }
    return soundName;
}