// function dragStartHandler(e) {
//     const data = e.target.id;
//     e.dataTransfer.setData('text/plain', data);
// }

// function dragOverHandler(e) {
//     e.preventDefault(); //Prevents cancel drag so that it enables us to recieve the drop event when we get the drop event
// }

// function dropHandler(e) {
//     const data = e.dataTransfer.getData('text/plain'); //We ask for data transfer and assign it as "data"
//     const dragged = document.getElementById(data);  //Once we have "data", we use getElementById
//     e.currentTarget.append(dragged); //We append it to the drop zone which is the source of the drop event
// }   //which we can access through e.currentTarget

// const dropzones = document.querySelectorAll('.dropzone');   //A handler for all dropzones
// for (const dropzone of dropzones) {
//     dropzone.addEventListener('dragover', dragOverHandler);
//     dropzone.addEventListener('drop', dropHandler);
// }

// const divs = document.querySelectorAll('div');      //A handler for all our div element
// for (const div of divs) {
//     div.addEventListener('dragstart', dragStartHandler);    //An event listen for every single div element
// }

// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

//for (let i = 0; i<divs.length; i+=1)
//div[i].addEventListener('drafstart', dragStartHandler);


let newPlayerLetters = [];

function makeRandomLetter() {
    const letters = ["S", "A", "L", "R", "S", "O", "T", "E", "L", "A", "R", "A", "D", "I", "I", "D", "Y", "O", "I", "I",
        "M", "Z", "C", "A", "I", "W", "T", "O", "G", "Y", "G", "U", "M", "V", "X", "P", "E", "I", "E", "U", "A", "N", "E", "P", "R",
        "J", "O", "E", "S", "A", "H", "S", " ", "Q", "N", "O", "A", "W", "E", "D", "O", "D", "F", "I", "N", "N", "U", "B", "E",
        "T", "G", "T", "I", "V", "R", "T", "A", "R", "E", "I", "N", "A", "L", " ", "N", "O", "U", "R", "C", "O", "E", "L", "E",
        "E", "E", "H", "T", "F", "K", "B"];
    for (i = 0; i < 100; i += 1) {
        newPlayerLetters.push(letters[i]);
    }
}
makeRandomLetter();
console.log(newPlayerLetters);


function makeBoard() {
    for (let i = 1; i < 226; i += 1) {
        const newSection = document.createElement("section");
        newSection.id = `dropzone-box${i}`;
        newSection.className = "all-boxes";

        const elemMain = document.getElementById("main1");
        elemMain.appendChild(newSection);
    }
}
makeBoard();



function makePlayerRack() {
    for (let i = 1; i < 8; i += 1) {
        const makeRack = document.createElement("section");
        makeRack.id = `player-rack${i}`;
        makeRack.className = "class-player-rack"

        const elemMain2 = document.getElementById("main2");
        elemMain2.appendChild(makeRack);
    }
}
makePlayerRack();



function makeLetterTile() {
    for (i = 1; i < 8; i += 1) {
        const makeTile = document.createElement("div");
        makeTile.id = `letter-tile${i}`;
        makeTile.className = "letter-tile";
        makeTile.draggable = true;

        // const node = document.createTextNode(`${newPlayerLetters[newPlayerLetters.length - i]}`);
        const node = document.createTextNode(`${newPlayerLetters[i]}`);
        makeTile.appendChild(node);

        const elemDiv = document.getElementById(`player-rack${i}`);
        elemDiv.appendChild(makeTile);
    }
}
makeLetterTile();

function insertOnEmpty() {
    const rack = document.querySelectorAll(".class-player-rack");
    for (const rac of rack) {
        if (rack.children < 1) {
            makeLetterTile();
        }
    }
}
insertOnEmpty();





// Used for having a constant random number
// function mulberry32(a) {
//     return function () {
//       let t = a += 0x6D2B79F5;
//       t = Math.imul(t ^ t >>> 15, t | 1);
//       t ^= t + Math.imul(t ^ t >>> 7, t | 61);
//       return ((t ^ t >>> 14) >>> 0) / 4294967296;
//     };
//   }
//   const rnd = mulberry32(0);
// console.log(mulberry32(0))







// EventHandlers
function dragStartHandler(e) {
    const data = e.target.id;
    e.dataTransfer.setData('text/plain', data);
}

function dragOverHandler(e) {
    e.preventDefault(); //Prevents cancel drag so that it enables us to recieve the drop event when we get the drop event
}

function dropHandler(e) {

    if (e.currentTarget.children.length < 1) {
        const data = e.dataTransfer.getData('text/plain'); //We ask for data transfer and assign it as 'data"
        const dragged = document.getElementById(data);  //Once we have "data", we use getElementById

        e.currentTarget.append(dragged); //We append it to the drop zone which is the source of the drop event
    };
}


// Handler for the dropzone on the board
function boardHandler() {
    for (let i = 1; i < 226; i += 1) {
        const boardDropzone = document.querySelectorAll(`#dropzone-box${i}`);   //A handler for all dropzones
        for (const dropzone1 of boardDropzone) {
            dropzone1.addEventListener('dragover', dragOverHandler);
            dropzone1.addEventListener('drop', dropHandler);
        }
    }
}

// Handlers for the dropzone on the player rack
function playerRackHandler() {
    for (i = 1; i < 8; i += 1) {
        const playerRackDropzone = document.querySelectorAll(`#player-rack${i}`);   //Makes the rack a dropzone
        for (const dropzone2 of playerRackDropzone) {
            dropzone2.addEventListener('dragover', dragOverHandler);
            dropzone2.addEventListener('drop', dropHandler);
        }
    }
}

function letterTileHandler() {
    const divTiles = document.querySelectorAll("div");      //A handler for all our div element
    for (const div of divTiles) {
        div.addEventListener('dragstart', dragStartHandler);    //An event listen for every single div element
    }
}

function allHandlers() {
    boardHandler();
    playerRackHandler();
    letterTileHandler();
}

allHandlers();

















// Board Names

function set3W() {
    const box3Ws = document.querySelectorAll("#dropzone-box1, #dropzone-box8, #dropzone-box15, #dropzone-box106, #dropzone-box120, #dropzone-box211, #dropzone-box218, #dropzone-box225");
    for (const box3W of box3Ws) {
        const node = document.createTextNode("3W");
        box3W.classList.add("dropzone3W");
        box3W.appendChild(node);
    }
}
set3W();


function set3L() {
    const box3Ls = document.querySelectorAll("#dropzone-box21, #dropzone-box25, #dropzone-box77, #dropzone-box81, #dropzone-box85, #dropzone-box89,#dropzone-box137, #dropzone-box141, #dropzone-box145, #dropzone-box149, #dropzone-box201, #dropzone-box205");
    for (const box3L of box3Ls) {
        const node = document.createTextNode("3L");
        box3L.classList.add("dropzone3L");
        box3L.appendChild(node);
    }
}
set3L();


function set2L() {
    const box2Ls = document.querySelectorAll("#dropzone-box4, #dropzone-box12, #dropzone-box37, #dropzone-box39, #dropzone-box46, #dropzone-box53, #dropzone-box60, #dropzone-box93, #dropzone-box97, #dropzone-box99, #dropzone-box103, #dropzone-box109, #dropzone-box117, #dropzone-box123, #dropzone-box127, #dropzone-box129, #dropzone-box133, #dropzone-box166, #dropzone-box173, #dropzone-box180,#dropzone-box187, #dropzone-box189");
    for (const box2L of box2Ls) {
        const node = document.createTextNode("2L");
        box2L.classList.add("dropzone2L");
        box2L.appendChild(node);
    }
}
set2L();


function set2W() {
    const box2Ws = document.querySelectorAll("#dropzone-box17, #dropzone-box29, #dropzone-box33, #dropzone-box43, #dropzone-box49, #dropzone-box57, #dropzone-box65, #dropzone-box71,#dropzone-box155, #dropzone-box161, #dropzone-box169, #dropzone-box177, #dropzone-box183, #dropzone-box193, #dropzone-box197, #dropzone-box209");
    for (const box2W of box2Ws) {
        const node = document.createTextNode("2W");
        box2W.classList.add("dropzone2W");
        box2W.appendChild(node);
    }
}
set2W();
