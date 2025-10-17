let gameSeq = [];
let userSeq = [];

let btns = ['red','green','yellow','blue'];
let highestScore = 0;

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress",function(){
   if(started == false){
    startGame();  
    console.log("game is started!!");
    started = true;
    
    levelUp();
   }
});

function gameFlash(btn) {
  btn.classList.add("gameflash");
  setTimeout(function(){
    btn.classList.remove("gameflash");
  }, 250); // half second flash
}

function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(function(){
    btn.classList.remove("userflash");
  }, 250); // half second flash
}

function levelUp(){
    userSeq=[];
    level++;
    if(level > highestScore){
        highestScore = level;
    }
    h2.innerText = `Level ${level}`;

    //random btn
    let randIdx = Math.floor(Math.random()*3);
    let gamerandColor = btns[randIdx];
    let randBtn = document.querySelector(`.${gamerandColor}`);
    // console.log(randIdx);
    // console.log(randColor);
    // console.log(randBtn);
    gameSeq.push(gamerandColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}

function checkAns(idx) {
    if (gameSeq[idx] === userSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `GAME OVER! Your score was <b>${level}</b> Highest Score ${highestScore} <br>Press any key to start.`;

        // Flash red
        document.body.classList.add("wrong");

        setTimeout(() => {
            document.body.classList.remove("wrong");
        }, 300);

        reset();
    }
}


function btnPress(){
    // console.log(this);
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function reset(){
    started = false;
    userSeq =[];
    gameSeq =[];
    level =0;
}

// When restarting game
function startGame() {
    document.body.classList.remove("wrong");
    document.body.classList.add("restart");

    setTimeout(() => {
        document.body.classList.remove("restart");
    }, 1000); // Back to default after a moment
}