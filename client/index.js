// import { makeUndraggable } from './mod.mjs';
import { boardHandler, playerRackHandler, letterTileHandler, makeUndraggable } from './mod.mjs';
// import { set3W } from "board.mjs";

const newPlayerLetters = ['S', 'A', 'L', 'R', 'S', 'O', 'T', 'E', 'L', 'A', 'R', 'A', 'D', 'I', 'I', 'D', 'Y', 'O', 'R', 'I',
  'M', 'Z', 'C', 'A', 'I', 'W', 'T', 'O', 'G', 'Y', 'G', 'U', 'M', 'V', 'X', 'P', 'E', 'I', 'E', 'U', 'A', 'N', 'E', 'P', 'R',
  'J', 'O', 'E', 'S', 'A', 'H', 'S', ' ', 'Q', 'N', 'O', 'A', 'W', 'E', 'D', 'O', 'E', 'F', 'I', 'N', 'N', 'U', 'B', 'E',
  'T', 'G', 'T', 'I', 'V', 'R', 'T', 'A', 'R', 'E', 'I', 'N', 'A', 'L', ' ', 'N', 'O', 'U', 'I', 'C', 'O', 'E', 'L', 'E',
  'E', 'D', 'H', 'T', 'F', 'K', 'B'];

// const newPlayerLetters = ['F', 'A', 'R', 'M', 'H', 'O', 'R', 'N', 'P', 'A', 'S', 'T',
//   'E', 'M', 'O', 'B', 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7,];


let count = -1;

// Board

function makeBoard() {
  let boardCount = 0;
  for (let y = 1; y < 16; y += 1) {
    for (let x = 1; x < 16; x += 1) {
      const newDiv = document.createElement('div');
      newDiv.id = `dropzone-box${++boardCount}`;
      newDiv.dataset.y = y;
      newDiv.dataset.x = x;
      newDiv.className = 'all-boxes';

      const elemMain = document.getElementById('main-board');
      elemMain.appendChild(newDiv);
    }
  }
}


function set3W() {
  const box3Ws = document.querySelectorAll('#dropzone-box1, #dropzone-box8, #dropzone-box15, #dropzone-box106, #dropzone-box120, #dropzone-box211, #dropzone-box218, #dropzone-box225');
  for (const box3W of box3Ws) {
    const node = document.createTextNode('3W');
    box3W.classList.add('dropzone3W');
    box3W.appendChild(node);
  }
}

function set3L() {
  const box3Ls = document.querySelectorAll('#dropzone-box21, #dropzone-box25, #dropzone-box77, #dropzone-box81, #dropzone-box85, #dropzone-box89,#dropzone-box137, #dropzone-box141, #dropzone-box145, #dropzone-box149, #dropzone-box201, #dropzone-box205');
  for (const box3L of box3Ls) {
    const node = document.createTextNode('3L');
    box3L.classList.add('dropzone3L');
    box3L.appendChild(node);
  }
}


function set2L() {
  const box2Ls = document.querySelectorAll('#dropzone-box4, #dropzone-box12, #dropzone-box37, #dropzone-box39, #dropzone-box46, #dropzone-box53, #dropzone-box60, #dropzone-box93, #dropzone-box97, #dropzone-box99, #dropzone-box103, #dropzone-box109, #dropzone-box117, #dropzone-box123, #dropzone-box127, #dropzone-box129, #dropzone-box133, #dropzone-box166, #dropzone-box173, #dropzone-box180,#dropzone-box187, #dropzone-box189');
  for (const box2L of box2Ls) {
    const node = document.createTextNode('2L');
    box2L.classList.add('dropzone2L');
    box2L.appendChild(node);
  }
}

function set2W() {
  const box2Ws = document.querySelectorAll('#dropzone-box17, #dropzone-box29, #dropzone-box33, #dropzone-box43, #dropzone-box49, #dropzone-box57, #dropzone-box65, #dropzone-box71,#dropzone-box155, #dropzone-box161, #dropzone-box169, #dropzone-box177, #dropzone-box183, #dropzone-box193, #dropzone-box197, #dropzone-box209');
  for (const box2W of box2Ws) {
    const node = document.createTextNode('2W');
    box2W.classList.add('dropzone2W');
    box2W.appendChild(node);
  }
}

function initBoard() {
  makeBoard();
  set3W();
  set3L();
  set2L();
  set2W();
}

initBoard();


// Tiles and Letters

function makePlayerRack() {
  for (let i = 0; i < 7; i += 1) {
    const makeRack = document.createElement('div');
    makeRack.id = `player-rack${i}`;
    makeRack.className = 'class-player-rack';

    const elemMain2 = document.getElementById('main-rack');
    elemMain2.appendChild(makeRack);
  }
}
makePlayerRack();


function makeStartingLetters() {
  for (let i = 0; i < 7; i += 1) {
    const makeTile = document.createElement('div');
    ++count;
    makeTile.id = `letter-tile${count}`;
    makeTile.className = 'letter-tile remove';
    makeTile.draggable = true;

    const node = document.createTextNode(`${newPlayerLetters[count]}`);
    makeTile.appendChild(node);

    const elemDiv = document.getElementById(`player-rack${i}`);
    elemDiv.appendChild(makeTile);
  }
}
makeStartingLetters();

function insertNewLetters() {
  const emptyRacks = document.querySelectorAll('.class-player-rack');
  for (const emptyRack of emptyRacks) {
    if (emptyRack.children.length < 1) {
      const makeTile = document.createElement('div');
      count++;
      makeTile.id = `letter-tile${count}`;
      makeTile.className = 'letter-tile remove';
      makeTile.draggable = true;


      const node = document.createTextNode(`${newPlayerLetters[count]}`);
      makeTile.appendChild(node);

      emptyRack.appendChild(makeTile);
    }
  }
  allHandlers();
}


function allHandlers() {
  boardHandler();
  playerRackHandler();
  letterTileHandler();
}

allHandlers();


async function checkInputWord() {
  const word = document.querySelector('#word');
  const result = document.querySelector('#resultInput');

  if (word.value.length === 0) {
    result.textContent = 'Enter a word to check its validity.';
    return;
  }

  const url = 'https://dictionary-dot-sse-2020.nw.r.appspot.com/' + word.value;
  const response = await fetch(url);

  switch (response.status) {
    case 200:
      result.textContent = 'You can play the word: ' + word.value;
      break;
    case 400:
      result.textContent = 'The value ' + word.value + ' is too short';
      break;
    case 404:
      result.textContent = 'The value ' + word.value + ' is not allowed';
      break;
    default:
      result.textContent = 'The word checking service at the moment is unavailable';
  }
  word.value = '';
}

function pageLoaded() {
  const submitButton = document.querySelector('#check');
  submitButton.addEventListener('click', checkInputWord);
}

window.addEventListener('load', pageLoaded);


// I obtained this code from https://stackoverflow.com/questions/1224433/how-can-i-disable-highlighting-in-html-or-js

// one-line version
window.addEventListener('selectstart', event => event.preventDefault());


// How to access the value of letters.
// console.log(document.querySelector("#letter-tile6").textContent);

const arrBoard = [
  ['', '', '', '', '', '', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', '', '', '', '', '', ''],
];

const oldWords = [];


// console.log(document.querySelector('[data-y="1"][data-x="1"]'));

function playButton() {
  const play = document.querySelector('#play');
  // play.addEventListener('click', submitWord);
  play.addEventListener('click', insertInArrBoard);
}

playButton();

function insertInArrBoard() {
  // checkMiddleBox();
  const centreBox = document.querySelector("#dropzone-box113");
  const errorText = document.querySelector("#error-message");


  if (centreBox.children.length > 0) {
    errorText.textContent = "";

    const allBoxes = document.querySelectorAll('.all-boxes');
    for (const box of allBoxes) {
      if (box.children.length > 0) {
        const dataY = box.dataset.y;
        const dataX = box.dataset.x;

        const divs = box.querySelectorAll('#main-board>.all-boxes>.remove'); // This only selects tiles on the board
        for (const div of divs) {
          const valueLetter = div.textContent;
          arrBoard[dataY - 1][dataX - 1] = `${valueLetter}`;
        }
      } else if (box.children.length >= 0) {
        const dataY = box.dataset.y;
        const dataX = box.dataset.x;
        arrBoard[dataY - 1][dataX - 1] = '';
      }
    }

    looper();

  } else {
    errorText.textContent = "You must start from the box centre.";
  }
}

// function iterator() {
//   const resultRow = iterateHorizontal(arrBoard);
//   const resultCol = iterateHorizontal(iterateVertical(arrBoard));
//   const newWords = resultRow.concat(resultCol);

//   // let diff = newWords.length - oldWords;
//   console.log(newWords);

//   // Filters the duplicates
//   for (const result of newWords) {
//     if (!oldWords.includes(result)) {
//       oldWords.push(result);
//       // wordLengths.push(result.length);
//     }
//   }
//   console.log(oldWords);
//   checkWord();
// }

// function iterateHorizontal(arr) {
//   let words = [];
//   arr.forEach(row => {
//     // words = words.concat(row.join('').replace(/\s\s+/g, ' ').split(' ').filter(word => word.length > 2));
//     const joinedWord = row.join('').replace(/\s\s+/g, '');
//     const wordValue = joinedWord.split(' ').filter(joinedWord => joinedWord.length > 2);
//     words = words.concat(wordValue);
//   });
//   return words;
// }

// function iterateVertical(arr) {
//   return arr[0].map((_, colIndex) => arr.map(row => row[colIndex]));
// }


function looper() {
  let arrWords = [];

  let tempVertArr = [];

  // Verti
  for (let y = 0; y < arrBoard.length; y++) {
    tempVertArr = [];

    for (let x = 0; x < arrBoard[y].length; x++) {
      if (arrBoard[x][y] !== '') {
        tempVertArr.push(arrBoard[x][y]);
      } else {
        arrWords.push(tempVertArr.join(''));
        tempVertArr = [];
      }
    }
    arrWords.push(tempVertArr.join(''));
  }

  // Horiz
  let tempHorArr = [];
  for (let y = 0; y < arrBoard.length; y++) {
    tempHorArr = [];

    for (let x = 0; x < arrBoard[y].length; x++) {
      if (arrBoard[y][x] !== '') {
        tempHorArr.push(arrBoard[y][x]);
        // console.log(tempHorArr);
      } else {
        arrWords.push(tempHorArr.join(''));
        tempHorArr = [];
      }
    }
    arrWords.push(tempHorArr.join(''));
  }



  let newArrWords = [];


  for (let i = 0; i < arrWords.length; i++) {
    if (arrWords[i].length > 1) {
      newArrWords.push(arrWords[i]);
    }
  }


  // let arrDiff = 0;
  // const diff = newArrWords - oldWords;
  // console.log(diff)


  // Compares newArrWords to oldWords
  for (const newWords of newArrWords) {
    if (!oldWords.includes(newWords)) {
      oldWords.push(newWords);
      // const arrDif =+ 1;
      // console.log(arrDif)
      submitWord(newWords);

      const result = document.querySelector('#resultValidWord');
      const elemList = document.createElement("li");
      elemList.classList.add("valid-words")
      const wordText = document.createTextNode(`${newWords}`)
      elemList.append(wordText);

      result.append(elemList);

    }
  }

  // console.log(oldWords);
  // checkWord();


  // if (oldWords > 1)
  // submitWord();

  limitWordList();
}


// Store letters to arrBoard
// Access/read the letters inside this array.
//    Find horizontal words first
//    Find vertical words second
// When the word is valid, I want it to be deleted from the array.
// Concat the arrays together and store it inside of newWords
// Use arrWords to store played words, if its invalid. Delete that word using i


let validWords = [];

let checkCounter = -1;

// async function checkWord() { // Assuming every word played is valid.
//   const result = document.querySelector('#resultValidWord');
//   const word = oldWords[++checkCounter];

//   if (word.length === 0) {
//     result.textContent = 'Enter a word to check its validity.';
//     return;
//   }

//   const url = 'https://dictionary-dot-sse-2020.nw.r.appspot.com/' + word;
//   const response = await fetch(url);

//   switch (response.status) {
//     case 200:
//       result.textContent = word + ' is a valid word';


//       // validWords.push(word);
//       // console.log(validWords);
//       submitWord();

//       break;
//     case 400:
//       result.textContent = word + ' is too short';
//       break;
//     case 404:
//       result.textContent = word + ' is not allowed';
//       break;
//     default:
//       result.textContent = 'the word checking service seems not to be available at this time';
//   }
//   console.log(word);
// }


let submitCounter = -1;
let acceptedWords = [];

async function submitWord(word) { // Assuming every word played is valid.

  const result = document.querySelector('#resultValidWord');
  // const score = document.querySelector('#player-score');
  // const word = oldWords[++submitCounter];

  if (word.length === 0) {
    result.textContent = 'Enter a word to check its validity.';
    return;
  }

  const url = 'https://dictionary-dot-sse-2020.nw.r.appspot.com/' + word;
  const response = await fetch(url);

  switch (response.status) {
    case 200:
      // result.textContent = 'You just played the word: ' + word;




      validWords.push(word);
      // console.log(validWords);

      makeUndraggable();
      insertNewLetters();

      updateScore();
      acceptedWords.push(word);

      break;
    case 400:
      result.textContent = word + ' is too short';
      break;
    case 404:
      result.textContent = word + ' is not valid';
      break;
    default:
      result.textContent = 'The word checking service at the moment is unavailable';
  }
  console.log(acceptedWords)
}



function updateScore() {
  const score = document.querySelector('#player-score');

  let wordLengths = [];
  for (const validWord of validWords) {
    wordLengths.push(validWord.length);
  }

  // console.log(wordLengths);
  
  let playerScore = 0;
  for (const wordLength of wordLengths) {
    playerScore += wordLength;
  }
  score.textContent = playerScore;

}

function limitWordList() {
  const listWords = document.querySelectorAll(".valid-words");

  if (listWords.length > 5) {
    for (let i = 0; i < listWords.length - 5; i++) {
      listWords[i].remove();
    }
  }
}


// Have the array of words checked in the checkword function, if its good, push to validWords.


// Store the words. Loop through words and accept valid. Push to the end of validWord.


// When submit is pressed, for the first round, check if the centre box has a child.

// checkMiddleBox() {
//   const centreBox = document.querySelector("#dropzone-box113")
//   if (centreBox.children.length > 0) {

//   }
// }