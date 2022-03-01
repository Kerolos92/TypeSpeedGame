/*
Advices
    Always Check The Console
    Take Your Time To Name The Identifiers
    DRY => Don't Rpeat Your Salf

Steps To Create The Project 
[01] Create HTML Markup
[02] Add Styling And Separate From Logic
[03] Create the App Logic
    [01] Add Levels
    [02] Show Level And Seconds
    [03] Add Array of Words
    [04] Add Start Game Button 
    [05] Generate Upcoming Words 
    [06] Disable Copy Word And Paste Event + Focus On Input 
    [07] Start Play Function
    [08] Start The Time And Count Score
    [09] Add The Error And Success Messages
[04] Your Trainings To Add Features
    [01] Save Score To Local Storage With Date        line 143-144
    [02] Choose Levels From Select Box                Done
    [03] Break The Logic to More Functions            Done
    [04] Choose Array Of Words For Every Level        
    [05] Write Game Instruction With Dynamic Values   
    [06] Add 3 Seconds For The First word             
*/

// Catch Selectors
// let startButton = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");
let selectLvl = document.querySelector("select");
let selectOption = document.querySelector("select option");
let Name = document.getElementById("name");
let btnEasy = document.getElementById("Easy");
let btnNormal = document.getElementById("Normal");
let btnHard = document.getElementById("Hard");
var tableData = document.getElementById('tableData');

// setting levels
const lvls = {
  Easy: 5,
  Normal: 3,
  Hard: 4,
};

let defaultLevelName;
let defaultLevelSeconds;

btnEasy.onclick = function () {
  //Array of words Easy Level
  const Easy = [
    "Hello","Lorem",  "Code", //"Town", "text", "type", "ever"
  ];
  console.log(Easy);
  defaultLevelName = "Easy";
  defaultLevelSeconds = lvls[defaultLevelName];
  console.log(defaultLevelName, defaultLevelSeconds);

  this.remove();
  input.focus();
  
  setLevel(Easy)
  generateWords(Easy)
  getWords(Easy)
  startPlay(Easy)
}
  
btnNormal.onclick = function () {
  //Array of words Normal Level
  const Normal = [
    "simply", "Ipsum", "setting", "dummy"
  ];
  console.log(Normal);
  defaultLevelName = "Normal";
  defaultLevelSeconds = lvls[defaultLevelName];
  console.log(defaultLevelName, defaultLevelSeconds);

  this.remove();
  input.focus();

  setLevel(Normal)
  generateWords(Normal)
  getWords(Normal)
  startPlay(Normal)
}

btnHard.onclick = function () {
  //Array of words Hard Level
  const Hard = [
    "Programming", "javascript", "Computer", "printing", "versions"
  ];
  console.log(Hard);
  defaultLevelName = "Hard";
  defaultLevelSeconds = lvls[defaultLevelName];
  console.log(defaultLevelName, defaultLevelSeconds);

  this.remove();
  input.focus();

  setLevel(Hard)
  generateWords(Hard)
  getWords(Hard)
  startPlay(Hard)
}



function setLevel(setMood){
  // Setting Level Name + Seconds + Score
  lvlNameSpan.innerHTML = defaultLevelName;
  secondsSpan.innerHTML = defaultLevelSeconds;
  timeLeftSpan.innerHTML = defaultLevelSeconds;
  scoreTotal.innerHTML = setMood.length
}

// Disable paste Event
input.onpaste = function () {
  return false;
};

// Start Game
startButton.onclick = function () {
  this.remove();
  input.focus();

  // Generate Word Function
  getWords();

  // call start play function
  startPlay();
};

// let lvlSelect = selectLvl.value
// console.log(lvlSelect);

function getWords(getMood) {
  // Get Random Word From Array
  let randomWord = getMood[Math.floor(Math.random() * getMood.length)];

  // get word index
  let wordIndex = getMood.indexOf(randomWord);

  // remove word from array
  getMood.splice(wordIndex, 1);

  // show the random word
  theWord.innerHTML = randomWord;

  // empty upcoming words
  upcomingWords.innerHTML ="";

  // call generateWords
  generateWords(getMood);
  
}

function generateWords(generateMood) {
  // generate words
  for (let i = 0; i < generateMood.length; i++) {
  
    // create div element
    let div = document.createElement("div");
    let txt = document.createTextNode(generateMood[i]);
    div.appendChild(txt);
    upcomingWords.appendChild(div);
  }
}

function startPlay(startMood) {
  timeLeftSpan.innerHTML = defaultLevelSeconds;
  let start = setInterval(() => {
    timeLeftSpan.innerHTML--;
    if (timeLeftSpan.innerHTML === "0") {
      // stop timer
      clearInterval(start);

      // compare words
      if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {

        // empty input field
        input.value = "";

        // increase score
        scoreGot.innerHTML++;

        if (startMood.length > 0) {
          //call generate word function
          getWords(startMood);

          //call start play function
          startPlay(startMood);

        } else {
          spanMassage("good", "You Are very Good")
        }

      } else {
        spanMassage("bad", "Game Over")
      }

      // console.log(scoreGot.innerHTML);
      // localStorage.setItem('Score', JSON.stringify(scoreGot.innerHTML))
    }

  }, 1000);
}

function spanMassage(className, massage){
  let span = document.createElement("span");
  span.className = className;
  let spanText = document.createTextNode(massage);
  span.appendChild(spanText);
  finishMessage.appendChild(span);
}







// players = []

// function getInfo() {
//   player = {
//     playerName: Name.value,
//     playerlvl: chooseLvl.value,
//     playerScore: scoreGot.innerHTML
//   }
//   players.push(player)
//   // console.log(players)
//   Display()
//   clear()
//   localStorage.setItem('allPlayers', JSON.stringify(players))
// }

// function Display() {
//   var crtona = ``;
//   for (i = 0; i < players.length; i++) {
//     crtona += `
//     <tr>
//         <td>${players[i].playerName}</td>
//         <td>${players[i].playerlvl}</td>
//         <td>${players[i].playerScore}</td>
//         <td>2-2-22</td>
//     </tr>`
//   }
//   tableData.innerHTML = crtona;
// }

// function clear() {
//   Name.value = "";
// }
