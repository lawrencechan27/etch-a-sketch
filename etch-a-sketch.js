// establish vars
const square = document.createElement('div');
square.classList.add('square');
const grid = document.getElementById('grid');
const rowsizebtn = document.getElementById('rowsize-btn');

// function to apply mouseovers to squares
function applyMouseoverListener() {
    // put all squares into array
    var gridSquares = document.getElementsByClassName("square");
    // loop through all squares and add event listeners
    for (i = 0; i < gridSquares.length; i++) {
        gridSquares[i].addEventListener("mouseover", paintSquare);
    }
}

// function to change background colour of squares on mouseover
function paintSquare(event) {
    //event.target.style.backgroundColor = 'black';
    //event.target.style.backgroundColor = "rgba(0,0,0,0.1)";

    // get current alpha, use computedStyle 
    let rgba = window.getComputedStyle(event.target, null).getPropertyValue("background-color");
    // extract the alpha value only
    let alpha = rgba.split(',')[3].slice(0,-1);
    // add 0.1 to existing alpha value
    let newAlpha = Number(alpha) + 0.1;

    console.log(newAlpha);

    event.target.style.backgroundColor = `rgba(0,0,0,${newAlpha})`;

    //console.log(event.target.style.backgroundColor);

}

// function to initialise grid
function createGrid(rowSize){
    // wipe current grid
    grid.innerHTML = '';
    // set square size to fit in new grid
    square.style.width = 800 / rowSize + 'px';
    square.style.height = 800 / rowSize + 'px';
    // get grid size from row size
    let gridSize = rowSize * rowSize;
    // add squares back in to grid
    for (i = 0; i < gridSize; i++) {
        grid.appendChild(square.cloneNode(true));
    }

    // run function to apply mouseovers
    applyMouseoverListener();
}

// initial 4x4 grid
createGrid(4);

// function to set new grid
rowsizebtn.addEventListener("click", askRowSize);
function askRowSize() {
    // ask for new row size, validate input to 2-100 and be a number
    let rowSize;
    while (rowSize < 2 || rowSize > 100 || isNaN(rowSize)) {
        rowSize = prompt("Enter row size (2-100)");
    }
    createGrid(rowSize);
}