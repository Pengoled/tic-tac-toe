const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const cellElements = document.querySelectorAll('[data-cell]');
const boardElement = document.getElementById('board');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const winningMessageElement = document.getElementById('winningMessage');
const restartButton = document.getElementById('restartButton');
let circleTurn; //default is false

startGame();

function startGame() {
    circleTurn = false; 
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.addEventListener('click', handleClick, {once:true});
    })
    setBoardHoverClass();
    winningMessageElement.classList.remove('show');
}
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

restartButton.addEventListener('click', startGame);

function handleClick(e) {
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    //placeMark
    placeMark(cell, currentClass);
    //Check For Win
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) { //Check For Draw
        endGame(true);
    }
    else {
        //Switch Turns
        swapTurns();
        setBoardHoverClass();
    }
}

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.textContent = 'Draw!';
    }
    else {
        winningMessageTextElement.textContent = `${circleTurn ? "O is the winner!" : "X is the winner!"}`;
    }
    winningMessageElement.classList.add('show');
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurns() {
    circleTurn = !circleTurn;
}

function setBoardHoverClass() {
    if (circleTurn) {
        boardElement.classList.add(CIRCLE_CLASS);
        boardElement.classList.remove(X_CLASS);
    }
    else {
        boardElement.classList.add(X_CLASS);
        boardElement.classList.remove(CIRCLE_CLASS);
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}  