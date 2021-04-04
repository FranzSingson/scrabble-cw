function dragStartHandler(e) {
  const data = e.target.id;
  e.dataTransfer.setData('text/plain', data);
}

function dragOverHandler(e) {
  e.preventDefault();
}

function dropHandler(e) {
  if (e.currentTarget.children.length < 1) {
    const data = e.dataTransfer.getData('text/plain');
    const dragged = document.getElementById(data);

    e.currentTarget.append(dragged);
  }
}


export function boardHandler() {
  const boardDropzone = document.querySelectorAll('.all-boxes');
  for (const dropzone1 of boardDropzone) {
    dropzone1.addEventListener('dragover', dragOverHandler);
    dropzone1.addEventListener('drop', dropHandler);
  }
}

export function playerRackHandler() {
  const playerRackDropzone = document.querySelectorAll('.class-player-rack');
  for (const dropzone2 of playerRackDropzone) {
    dropzone2.addEventListener('dragover', dragOverHandler);
    dropzone2.addEventListener('drop', dropHandler);
  }
}

export function letterTileHandler() {
  const divTiles = document.querySelectorAll('.letter-tile');
  for (const div of divTiles) {
    div.addEventListener('dragstart', dragStartHandler);
  }
}

export function makeUndraggable() {
  const allBoxes = document.querySelectorAll('.all-boxes');
  for (const allBox of allBoxes) {
    if (allBox.children.length > 0) {
      const elems = document.querySelectorAll('#main-board>div .letter-tile');
      for (const elem of elems) {
        elem.draggable = false;
      }
    }
  }
}
