// import { makeUndraggable } from './mod.mjs';
// import { boardHandler, playerRackHandler, letterTileHandler, makeUndraggable } from './mod.mjs';
import { allHandlers, makeUndraggable } from './dragDrop.mjs';
import { initBoard } from './board.mjs';
// import { set3W } from "board.mjs";

const newPlayerLetters = ['S', 'A', 'L', 'R', 'S', 'O', 'T', 'E', 'L', 'A', 'R', 'A', 'D', 'I', 'I', 'D', 'Y', 'O', 'R', 'I',
  'M', 'Z', 'C', 'A', 'I', 'W', 'T', 'O', 'G', 'Y', 'G', 'U', 'M', 'V', 'X', 'P', 'E', 'I', 'E', 'U', 'A', 'N', 'E', 'P', 'R',
  'J', 'O', 'E', 'S', 'A', 'H', 'S', ' ', 'Q', 'N', 'O', 'A', 'W', 'E', 'D', 'O', 'E', 'F', 'I', 'N', 'N', 'U', 'B', 'E',
  'T', 'G', 'T', 'I', 'V', 'R', 'T', 'A', 'R', 'E', 'I', 'N', 'A', 'L', ' ', 'N', 'O', 'U', 'I', 'C', 'O', 'E', 'L', 'E',
  'E', 'D', 'H', 'T', 'F', 'K', 'B'];

// const newPlayerLetters = ['L', 'A', 'Z', 'Y', 'H', 'O', 'N', 'P', 'A', 'S', 'T'];

const letterPoint = {
  A: 1,
  B: 3,
  C: 3,
  D: 2,
  E: 1,
  F: 4,
  G: 2,
  H: 4,
  I: 1,
  J: 8,
  K: 5,
  L: 1,
  M: 3,
  N: 1,
  O: 1,
  P: 3,
  Q: 10,
  R: 1,
  S: 1,
  T: 1,
  U: 1,
  V: 4,
  W: 4,
  X: 8,
  Y: 4,
  Z: 10,
};


let count = -1;
const roundsPlayed = 0;

// Board
initBoard();


// Tiles and Letters

function makePlayerRack() {
  const mainRack = document.getElementById('main-rack');

  for (let i = 0; i < 7; i += 1) {
    const makeRack = document.createElement('div');
    makeRack.id = `player-rack${i}`;
    makeRack.className = 'class-player-rack';

    mainRack.appendChild(makeRack);
  }
  const rackSub = document.createElement('sub');
  rackSub.className = 'rack-sub';
  const rackSubNode = document.createTextNode("Player's tiles");
  rackSub.append(rackSubNode);

  mainRack.append(rackSub);
}
makePlayerRack();


function makeStartingLetters() {
  for (let i = 0; i < 7; i += 1) {
    const makeTile = document.createElement('div');
    ++count;
    makeTile.id = `letter-tile${count}`;
    makeTile.className = 'letter-tile';
    makeTile.draggable = true;


    const para = document.createElement('p');
    para.className = 'letter-p';
    const paraNode = document.createTextNode(`${newPlayerLetters[count]}`);
    para.appendChild(paraNode);

    const sub = document.createElement('sub');
    sub.className = 'sub-point';
    const subNode = document.createTextNode(letterPoint[newPlayerLetters[count]]);
    sub.append(subNode);


    makeTile.append(para);

    makeTile.append(sub);

    const elemDiv = document.getElementById(`player-rack${i}`);
    elemDiv.appendChild(makeTile);
  }
}


makeStartingLetters();

function insertNewLetters() {
  const emptyRacks = document.querySelectorAll('.class-player-rack');
  for (const emptyRack of emptyRacks) {
    if (emptyRack.children.length < 1) {
      if (count < newPlayerLetters.length - 1) {
        const makeTile = document.createElement('div');
        count++;
        makeTile.id = `letter-tile${count}`;
        makeTile.className = 'letter-tile';
        makeTile.draggable = true;

        const para = document.createElement('p');
        para.className = 'letter-p';
        const paraNode = document.createTextNode(`${newPlayerLetters[count]}`);
        para.appendChild(paraNode);


        const sub = document.createElement('sub');
        sub.className = 'sub-point';
        const subNode = document.createTextNode(letterPoint[newPlayerLetters[count]]);
        sub.append(subNode);

        makeTile.append(para);
        makeTile.append(sub);

        emptyRack.appendChild(makeTile);
      }
    }
    allHandlers();
  }
}


// Drag and drop handlers
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
  play.addEventListener('click', insertInArrBoard);
}

playButton();

function insertInArrBoard() {
  const centreBox = document.querySelector('#dropzone-box113');
  const errorText = document.querySelector('#error-message');

  // ++roundsPlayed;

  if (centreBox.children.length > 0) {
    errorText.textContent = '';

    const allBoxes = document.querySelectorAll('.all-boxes');
    for (const box of allBoxes) {
      if (box.children.length > 0) {
        const dataY = box.dataset.y;
        const dataX = box.dataset.x;

        const divs = box.querySelectorAll('#main-board>.all-boxes>.letter-tile>p'); // This only selects tiles on the board
        for (const div of divs) {
          const valueLetter = div.textContent;
          const arrY = dataY - 1;
          const arrX = dataX - 1;
          arrBoard[arrY][arrX] = `${valueLetter}`;


          // connectChecker(arrY, arrX, arrBoard);
        }
      } else if (box.children.length >= 0) {
        const dataY = box.dataset.y;
        const dataX = box.dataset.x;
        arrBoard[dataY - 1][dataX - 1] = '';
      }
    }

    looper();
  } else {
    errorText.textContent = 'You must start from the centre box.';
  }
}


function connectChecker(cellY, cellX, array) {
  const Y = cellY + 1;
  const X = cellX + 1;

  // const tile = document.querySelector(`[data-y=${Y}][data-x=${X}]`);

  // if (document.querySelector(`[data-y=${Y + 1}][data-x=${X}]`) || document.querySelector(`[data-y=${Y - 1}][data-x=${X}]`) || document.querySelector(`[data-y=${Y}][data-x=${X + 1}]`) || document.querySelector(`[data-y=${Y}][data-x=${X - 1}]`))


  // if (document.querySelector('[data-y="8"][data-x="8"]').children.draggable = false) {
  // console.log("olool")
  // }

  console.log(document.querySelector(`[data-y="${Y}"][data-x="${X}"]`).children);


  // console.log(document.querySelector('[data-y="8"][data-x="8"]').children.draggble = "true");
}


function looper() {
  const arrWords = [];

  // Verti
  let tempVertArr = [];
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

  const newArrWords = [];
  for (let i = 0; i < arrWords.length; i++) {
    if (arrWords[i].length > 1) {
      newArrWords.push(arrWords[i]);
    }
  }

  // console.log(newArrWords);
  // console.log(oldWords);


  // Compares newArrWords to oldWords
  for (const newWords of newArrWords) {
    if (!oldWords.includes(newWords)) {
      oldWords.push(newWords);
      // const arrDif =+ 1;
      // console.log(arrDif)
      submitWord(newWords);
    }

    // console.log(oldWords);
  }
}

const validWords = [];


async function submitWord(word) {
  const result = document.querySelector('#resultValidWord');
  const errorText = document.querySelector('#error-message');

  if (word.length === 0) {
    result.textContent = 'Enter a word to check its validity.';
    return;
  }

  const url = 'https://dictionary-dot-sse-2020.nw.r.appspot.com/' + word;
  const response = await fetch(url);

  switch (response.status) {
    case 200:
      validWords.push(word);

      const result = document.querySelector('#resultValidWord');
      const elemList = document.createElement('li');
      elemList.classList.add('valid-words');
      const wordText = document.createTextNode(`${word}`);
      elemList.append(wordText);

      result.append(elemList);

      updateScore(word);
      makeUndraggable();
      insertNewLetters();

      break;
    case 400:
      result.textContent = word + ' is too short';
      break;
    case 404:
      errorText.textContent = word + ' is not valid';
      break;
    default:
      result.textContent = 'The word checking service at the moment is unavailable';
  }
  console.log(validWords);
  limitWordList();
}

const eachLetterPoints = [];

function updateScore(word) {
  const score = document.querySelector('#player-score');

  const wordSplitted = word.split('');

  for (let i = 0; i < wordSplitted.length; i++) {
    eachLetterPoints.push(letterPoint[wordSplitted[i]]);
  }

  console.log(eachLetterPoints);

  let playerScore = 0;
  for (const eachLetterPoint of eachLetterPoints) {
    playerScore += eachLetterPoint;
  }
  score.textContent = playerScore;
}


function limitWordList() {
  const listWords = document.querySelectorAll('.valid-words');

  if (listWords.length > 5) {
    for (let i = 0; i < listWords.length - 5; i++) {
      listWords[i].remove();
    }
  }
}

// console.log(makeUndraggable());

// Have the array of words checked in the checkword function, if its good, push to validWords.


// Store the words. Loop through words and accept valid. Push to the end of validWord.


// Check surroundings of the newly dragged letter. Check if the surrounding letter are draggable false. If so, it is a connecting word.
