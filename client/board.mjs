function makeBoard() {
  let boardCount = 0;
  for (let y = 1; y < 16; y += 1) {
    for (let x = 1; x < 16; x += 1) {
      const newSection = document.createElement('section');
      newSection.id = `dropzone-box${++boardCount}`;
      newSection.dataset.x = x;
      newSection.dataset.y = y;
      newSection.className = 'all-boxes';

      const elemMain = document.getElementById('main-board');
      elemMain.appendChild(newSection);
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

export function initBoard() {
  makeBoard();
  set3W();
  set3L();
  set2L();
  set2W();
};