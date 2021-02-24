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


function makeBoard() {
    for (let i = 1; i < 226; i += 1) {
        const newSection = document.createElement("section");
        newSection.id = "dropZoneBox";
        // const node = document.createTextNode(i);
        // newSection.appendChild(node);

        const elemMain = document.getElementById("main1");
        elemMain.appendChild(newSection);
    }
}
makeBoard();


function makePlayerRack() {
    for (let i = 1; i < 8; i += 1) {
        const makeRack = document.createElement("section");
        makeRack.id = "player-rack";
        // const node = document.createTextNode(i);
        // makeRack.appendChild(node);

        const elemMain2 = document.getElementById("main2");
        elemMain2.appendChild(makeRack);
    }
}
makePlayerRack();


function makeLetterTile() {
    const makeTile = document.createElement("div");
    makeTile.id = "letter-tile";
    makeTile.draggable = true;
    const node = document.createTextNode("A");
    // const makePara = document.createElement("p");
    // const node = document.createTextNode("A");
    // makePara.appendChild(node);
    makeTile.appendChild(node);

    const elemDiv = document.getElementById("player-rack");
    elemDiv.appendChild(makeTile);
}
makeLetterTile();



function makeRandomLetter() {
    const letters = [
        letterA = ['A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A'],
        letterB = ['B', 'B'],
        letterC = ['C', 'C'],
        letterD = ['D', 'D', 'D', 'D'],
        letterE = ['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'],
        letterF = ['F', 'F'],
        letterG = ['G', 'G', 'G'],
        letterH = ['H', 'H'],
        letterI = ['I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I'],
        letterJ = ['J'],
        letterK = ['K'],
        letterL = ['L', 'L', 'L', 'L'],
        letterM = ['M', 'M'],
        letterN = ['N', 'N', 'N', 'N', 'N'],
        letterO = ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        letterP = ['P', 'P'],
        letterQ = ['Q'],
        letterR = ['R', 'R', 'R', 'R', 'R', 'R'],
        letterS = ['S', 'S', 'S', 'S'],
        letterT = ['T', 'T', 'T', 'T', 'T', 'T'],
        letterU = ['U', 'U', 'U', 'U',],
        letterV = ['V', 'V'],
        letterW = ['W', 'W'],
        letterX = ['X'],
        letterY = ['Y', 'Y'],
        letterZ = ['Z']
    ];
    // console.log(letters[Math.round(Math.random() * 26) - 1][0])

    // console.log(Math.round(Math.random() * 26) - 1)
}
makeRandomLetter();











// EventHandlers
function dragStartHandler(e) {
    const data = e.target.id;
    e.dataTransfer.setData('text/plain', data);
}

function dragOverHandler(e) {
    e.preventDefault(); //Prevents cancel drag so that it enables us to recieve the drop event when we get the drop event
}

function dropHandler(e) {
    const data = e.dataTransfer.getData('text/plain'); //We ask for data transfer and assign it as 'data"
    const dragged = document.getElementById(data);  //Once we have "data", we use getElementById
    e.currentTarget.append(dragged); //We append it to the drop zone which is the source of the drop event
}   //which we can access through e.currentTarget


// Handler for the dropzone on the board
const dropzones = document.querySelectorAll("#dropZoneBox");   //A handler for all dropzones
for (const dropzone of dropzones) {
    dropzone.addEventListener('dragover', dragOverHandler);
    dropzone.addEventListener('drop', dropHandler);
}

// Handlers for the dropzone on the player rack
const dropzones2 = document.querySelectorAll("#player-rack");   //A handler for all dropzones
for (const dropzone of dropzones2) {
    dropzone.addEventListener('dragover', dragOverHandler);
    dropzone.addEventListener('drop', dropHandler);
}


const divs = document.querySelectorAll('div');      //A handler for all our div element
for (const div of divs) {
    div.addEventListener('dragstart', dragStartHandler);    //An event listen for every single div element
}
