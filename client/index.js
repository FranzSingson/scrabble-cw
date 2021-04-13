// import { makeUndraggable } from './mod.mjs';
// import { boardHandler, playerRackHandler, letterTileHandler, makeUndraggable } from './mod.mjs';
import { allHandlers } from './dragDrop.mjs';
import { initBoard } from './board.mjs';
import { checkInputWord, submitWord } from './wordChecker.mjs';
// import { set3W } from "board.mjs";

let count = -1;
let newPlayerLetters;
const oldWords = [];

const lettersArr = [
  'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A',
  'B', 'B',
  'C', 'C',
  'D', 'D', 'D', 'D',
  'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
  'F', 'F',
  'G', 'G', 'G',
  'H', 'H',
  'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I',
  'J',
  'K',
  'L', 'L', 'L', 'L',
  'M', 'M',
  'N', 'N', 'N', 'N', 'N', 'N',
  'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O',
  'P', 'P',
  'Q',
  'R', 'R', 'R', 'R', 'R', 'R',
  'S', 'S', 'S', 'S',
  'T', 'T', 'T', 'T', 'T', 'T',
  'U', 'U', 'U', 'U',
  'V', 'V',
  'W', 'W',
  'X',
  'Y', 'Y',
  'Z',
];


// https://www.youtube.com/watch?v=BZKFKfrxU-g&t=195s&ab_channel=zFunxWebDevelopementIdeas
// I adapted the code from the link
function shuffleLettersArr() {
  let n; let m = lettersArr.length;
  for (let i = 0; i < lettersArr.length; i++) {
    n = Math.floor(Math.random() * lettersArr.length);
    m = lettersArr[i];
    lettersArr[i] = lettersArr[n];
    lettersArr[n] = m;
  }
  newPlayerLetters = lettersArr;
}

shuffleLettersArr();

export const letterPoint = {
  A: 1, B: 3, C: 3, D: 2, E: 1, F: 4, G: 2, H: 4, I: 1, J: 8, K: 5, L: 1, M: 3, N: 1, O: 1, P: 3, Q: 10, R: 1, S: 1, T: 1, U: 1, V: 4, W: 4, X: 8, Y: 4, Z: 10,
};


// Board
initBoard();
makePlayerRack();
makeStartingLetters();


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


function makeStartingLetters() {
  for (let i = 0; i < 7; i += 1) {
    const makeTile = document.createElement('div');
    ++count;
    makeTile.id = `letter-tile${count}`;
    makeTile.className = 'letter-tile';
    makeTile.draggable = true;


    const para = document.createElement('p');
    para.className = 'letter-p';
    const paraNode = document.createTextNode(`${lettersArr[count]}`);
    para.appendChild(paraNode);

    const sub = document.createElement('sub');
    sub.className = 'sub-point';
    const subNode = document.createTextNode(letterPoint[lettersArr[count]]);
    sub.append(subNode);


    makeTile.append(para);

    makeTile.append(sub);

    const elemDiv = document.getElementById(`player-rack${i}`);
    elemDiv.appendChild(makeTile);
  }
}

export function insertNewLetters() {
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


// I obtained this code from https://stackoverflow.com/questions/1224433/how-can-i-disable-highlighting-in-html-or-js
window.addEventListener('selectstart', event => event.preventDefault());


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


function playButton() {
  const play = document.querySelector('#play');
  play.addEventListener('click', insertInArrBoard);

  const submitButton = document.querySelector('#check');
  submitButton.addEventListener('click', checkInputWord);
}

playButton();

function insertInArrBoard() {
  const centreBox = document.querySelector('#dropzone-box113');
  const errorText = document.querySelector('#error-message');


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

// 2D array iterator
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


  // Compares newArrWords to oldWords
  for (const newWords of newArrWords) {
    if (!oldWords.includes(newWords)) {
      oldWords.push(newWords);
      submitWord(newWords);
    }
  }
}



//Complete