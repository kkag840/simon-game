// Initialize game, user, and other variables
let game = [];
let user = [];
let start = false;
let level = 0;
let colorBtn = ["red", "green", "yellow", "blue"];
let h2 = document.querySelector("h2");

// Event listener for starting the game on keypress
document.addEventListener("keypress", function() {
    if (start == false) {
        start = true;
        levelUp();
    }
});

// Function to flash a button
function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 500);
}

// Function to level up the game
function levelUp() {
    user = [];
    h2.innerText = `Level ${++level}`;
    let randIdx = Math.floor(Math.random() * 4);
    let randColor = colorBtn[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    game.push(randColor);
    btnFlash(randBtn);
}

// Function to check user's answer
function checkAns(idx) {
    if (user[idx] === game[idx]) {
        if (user.length == game.length)
            setTimeout(levelUp, 1000);
    } else {
        h2.innerHTML = `Game over with score: <b>${level}</b>!<br>Press any key to start`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(() => {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
    }
}

// Function to handle button press
function btnPress() {
    btnFlash(this);
    let userColor = this.getAttribute("id");
    user.push(userColor);
    checkAns(user.length - 1);
}

// Add event listeners to all buttons
let allBtns = document.querySelectorAll(".box");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

// Function to reset the game
function reset() {
    start = false;
    level = 0;
    game = [];
    user = [];
}
