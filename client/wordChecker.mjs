import { letterPoint, insertNewLetters } from './index.js';
import { makeUndraggable } from './dragDrop.mjs';


// Checking if word is valid
export async function checkInputWord() {
  const word = document.querySelector('#word');
  const resultInput = document.querySelector('#resultInput');

  if (word.value.length === 0) {
    resultInput.textContent = 'Enter a word to check its validity.';
    return;
  }

  const url = 'https://dictionary-dot-sse-2020.nw.r.appspot.com/' + word.value;
  const response = await fetch(url);

  switch (response.status) {
    case 200:
      resultInput.textContent = 'You can play the word: ' + word.value;
      break;
    case 400:
      resultInput.textContent = 'The value ' + word.value + ' is too short';
      break;
    case 404:
      resultInput.textContent = 'The value ' + word.value + ' is not allowed';
      break;
    default:
      resultInput.textContent = 'The word checking service at the moment is unavailable';
  }
  word.value = '';
}


// Submitting words
const validWords = [];

export async function submitWord(word) {
  const resultInput = document.querySelector('#resultInput');

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

      resultInput.textContent = '';

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
