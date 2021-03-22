import { dragStartHandler } from "./mod.mjs";

let newPlayerLetters = ["S", "A", "L", "R", "S", "O", "T", "E", "L", "A", "R", "A", "D", "I", "I", "D", "Y", "O", "R", "I",
    "M", "Z", "C", "A", "I", "W", "T", "O", "G", "Y", "G", "U", "M", "V", "X", "P", "E", "I", "E", "U", "A", "N", "E", "P", "R",
    "J", "O", "E", "S", "A", "H", "S", " ", "Q", "N", "O", "A", "W", "E", "D", "O", "E", "F", "I", "N", "N", "U", "B", "E",
    "T", "G", "T", "I", "V", "R", "T", "A", "R", "E", "I", "N", "A", "L", " ", "N", "O", "U", "I", "C", "O", "E", "L", "E",
    "E", "D", "H", "T", "F", "K", "B"];
let count = -1;
let playerScore = 0;


// Board

function makeBoard() {
    let boardCount = 0;
    for (let y = 1; y < 16; y += 1) {
        for (let x = 1; x < 16; x += 1) {
            const newSection = document.createElement("section");
            newSection.id = `dropzone-box${++boardCount}`;
            newSection.dataset.x = x;
            newSection.dataset.y = y;
            newSection.className = "all-boxes";

            const elemMain = document.getElementById("main-board");
            elemMain.appendChild(newSection);
        }
    }
}




function set3W() {
    const box3Ws = document.querySelectorAll("#dropzone-box1, #dropzone-box8, #dropzone-box15, #dropzone-box106, #dropzone-box120, #dropzone-box211, #dropzone-box218, #dropzone-box225");
    for (const box3W of box3Ws) {
        const node = document.createTextNode("3W");
        box3W.classList.add("dropzone3W");
        box3W.appendChild(node);
    }
}

function set3L() {
    const box3Ls = document.querySelectorAll("#dropzone-box21, #dropzone-box25, #dropzone-box77, #dropzone-box81, #dropzone-box85, #dropzone-box89,#dropzone-box137, #dropzone-box141, #dropzone-box145, #dropzone-box149, #dropzone-box201, #dropzone-box205");
    for (const box3L of box3Ls) {
        const node = document.createTextNode("3L");
        box3L.classList.add("dropzone3L");
        box3L.appendChild(node);
    }
}


function set2L() {
    const box2Ls = document.querySelectorAll("#dropzone-box4, #dropzone-box12, #dropzone-box37, #dropzone-box39, #dropzone-box46, #dropzone-box53, #dropzone-box60, #dropzone-box93, #dropzone-box97, #dropzone-box99, #dropzone-box103, #dropzone-box109, #dropzone-box117, #dropzone-box123, #dropzone-box127, #dropzone-box129, #dropzone-box133, #dropzone-box166, #dropzone-box173, #dropzone-box180,#dropzone-box187, #dropzone-box189");
    for (const box2L of box2Ls) {
        const node = document.createTextNode("2L");
        box2L.classList.add("dropzone2L");
        box2L.appendChild(node);
    }
}

function set2W() {
    const box2Ws = document.querySelectorAll("#dropzone-box17, #dropzone-box29, #dropzone-box33, #dropzone-box43, #dropzone-box49, #dropzone-box57, #dropzone-box65, #dropzone-box71,#dropzone-box155, #dropzone-box161, #dropzone-box169, #dropzone-box177, #dropzone-box183, #dropzone-box193, #dropzone-box197, #dropzone-box209");
    for (const box2W of box2Ws) {
        const node = document.createTextNode("2W");
        box2W.classList.add("dropzone2W");
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
        const makeRack = document.createElement("section");
        makeRack.id = `player-rack${i}`;
        makeRack.className = "class-player-rack"

        const elemMain2 = document.getElementById("main-rack");
        elemMain2.appendChild(makeRack);
    }
}
makePlayerRack();



function makeStartingLetters() {
    for (let i = 0; i < 7; i += 1) {
        const makeTile = document.createElement("div");
        count++;
        makeTile.id = `letter-tile${count}`;
        makeTile.className = "letter-tile";
        makeTile.draggable = true;

        const node = document.createTextNode(`${newPlayerLetters[count]}`);
        makeTile.appendChild(node);

        const elemDiv = document.getElementById(`player-rack${i}`);
        elemDiv.appendChild(makeTile);
    }
}
makeStartingLetters();

function insertNewLetters() {
    const emptyRacks = document.querySelectorAll(".class-player-rack");
    for (const emptyRack of emptyRacks) {
        if (emptyRack.children.length < 1) {
            const makeTile = document.createElement("div");
            count++;
            makeTile.id = `letter-tile${count}`;
            makeTile.className = "letter-tile";
            makeTile.draggable = true;


            const node = document.createTextNode(`${newPlayerLetters[count]}`);
            makeTile.appendChild(node);

            emptyRack.appendChild(makeTile);
        }
    }
    allHandlers();
}


function storeAcceptedWordsOnBoard() {
    const allBoxes = document.querySelectorAll(".all-boxes");
    for (const allBox of allBoxes) {
        if (allBox.children.length > 0) {
            const elems = document.querySelectorAll("#main-board>section .letter-tile");
            for (const elem of elems) {
                elem.draggable = false;
            }
        }
    }
}


// EventHandlers
// function dragStartHandler(e) {
//     const data = e.target.id;
//     e.dataTransfer.setData('text/plain', data);
// }

function dragOverHandler(e) {
    e.preventDefault();
}

function dropHandler(e) {
    if (e.currentTarget.children.length < 1) {
        const data = e.dataTransfer.getData('text/plain');
        const dragged = document.getElementById(data);

        e.currentTarget.append(dragged);
    };
}


function boardHandler() {
    const boardDropzone = document.querySelectorAll(".all-boxes");
    for (const dropzone1 of boardDropzone) {
        dropzone1.addEventListener('dragover', dragOverHandler);
        dropzone1.addEventListener('drop', dropHandler);
    }
}

function playerRackHandler() {
    const playerRackDropzone = document.querySelectorAll(".class-player-rack");
    for (const dropzone2 of playerRackDropzone) {
        dropzone2.addEventListener('dragover', dragOverHandler);
        dropzone2.addEventListener('drop', dropHandler);
    }
}

function letterTileHandler() {
    const divTiles = document.querySelectorAll(".letter-tile");
    for (const div of divTiles) {
        div.addEventListener('dragstart', dragStartHandler);
    }
}



function allHandlers() {
    boardHandler();
    playerRackHandler();
    letterTileHandler();
}

allHandlers();


























// Word checker stuff underneath
function report(data, error = false, target = '#responses') {
    if (typeof data === 'string') data = [data];

    const list = document.querySelector(target);
    for (const i of data) {
        const li = document.createElement('li');
        li.textContent = i;
        li.classList.toggle('error', error);
        list.append(li);
    }
}

async function checkWord() {
    const word = document.querySelector('#word');
    const result = document.querySelector('#result');
    const score = document.querySelector('#player-score');

    if (word.value.length === 0) {
        result.textContent = 'Enter a word to check its validity.';
        return;
    }

    const url = 'https://dictionary-dot-sse-2020.nw.r.appspot.com/' + word.value;
    const response = await fetch(url);

    switch (response.status) {
        case 200:
            result.textContent = word.value + ' is a valid word';
            playerScore += word.value.length;
            score.textContent = playerScore;
            storeAcceptedWordsOnBoard();
            insertNewLetters();
            break;
        case 400:
            result.textContent = word.value + ' is too short';
            break;
        case 404:
            result.textContent = word.value + ' is not allowed';
            break;
        default:
            result.textContent = 'the word checking service seems not to be available at this time';
    }
    word.value='';
}

function pageLoaded() {
    const submitButton = document.querySelector('#sbmt');
    submitButton.addEventListener('click', checkWord);
}

window.addEventListener('load', pageLoaded);




// I obtained this code from https://stackoverflow.com/questions/1224433/how-can-i-disable-highlighting-in-html-or-js
// window.addEventListener("selectstart", function (event) {
//     event.preventDefault();
// });

//one-line version
addEventListener("selectstart", event => event.preventDefault());




// How to access the value of letters.
// console.log(document.querySelector("#letter-tile6").textContent);
