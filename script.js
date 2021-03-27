const cellElements = document.querySelectorAll('.square');
const xScore = document.querySelector('.x-score');
// const oScore = document.querySelector('.o-score');
// const tie = document.querySelector('.middle');
// const board = document.querySelector('.game-display');

let xTurn = true;

let humanPlayer = 'X';
let aiPlayer = 'O';


const xClass = 'x-icon';
const oClass = 'o-icon';

// const winningCombinations = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6]
// ];


const elements = [...cellElements];

values = [];
values[0] = elements.splice(0, 3);
values[1] = elements.splice(0, 3);
values[2] = elements.splice(0, 3);

values.forEach((cell) => {
    for (let i = 0; i < cell.length; i++) {
        cell[i].addEventListener('click', handleClick, false)
    }
});

function handleClick(event) {
    let currentClass = xTurn ? xClass : oClass;
    event.target.classList.add(currentClass);
    // checkWinner();
    nextMove(currentClass);
}

function nextMove(currentClass) {
    let bestScore = -Infinity;
    let move;

    if (currentClass === xClass) {
        currentClass = oClass;
    } else {
        currentClass = xClass;
    }

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (!values[i][j].classList.contains('o-icon') && !values[i][j].classList.contains('x-icon')) {
                values[i][j].classList.add(currentClass);
                let score = minimax(values, 0, false, currentClass);
                values[i][j].classList.remove(currentClass);
                if (score > bestScore) {
                    bestScore = score;
                    move = { i, j };
                }
            }
        }
    }
    values[move.i][move.j].classList.add(currentClass);
}

// let scores = {
//     'X': 0,
//     'O': -1,
//     'tie': 0
// }


// function equals3(a, b, c, currentClass) {
//     if (a.classList.contains(currentClass) && b.classList.contains(currentClass) && c.classList.contains(currentClass)) {
//         return true;
//     } else {
//         return false;
//     }
// }

// function checkWinner(currentClass) {
//     let winner = null;

//     // horizontal
//     for (let i = 0; i < 3; i++) {
//         if (equals3(values[i][0], values[i][1], values[i][2], currentClass)) {
//             winner = values[i][0];
//         }
//     }

//     // Vertical
//     for (let i = 0; i < 3; i++) {
//         if (equals3(values[0][i], values[1][i], values[2][i], currentClass)) {
//             winner = values[0][i];
//         }
//     }

//     // Diagonal
//     if (equals3(values[0][0], values[1][1], values[2][2], currentClass)) {
//         winner = values[0][0];
//     }
//     if (equals3(values[2][0], values[1][1], values[0][2], currentClass)) {
//         winner = values[2][0];
//     }

//     let openSpots = 0;
//     for (let i = 0; i < 3; i++) {
//         for (let j = 0; j < 3; j++) {
//             if (!values[i][j].classList.contains(currentClass)) {
//                 openSpots++;
//             }
//         }
//     }

//     if (winner == null && openSpots == 0) {
//         return 'tie';
//     } else {
//         return winner;
//     }
// }


// function isTie() {
//     return [...cellElements].every(cell => {
//         return cell.classList.contains(xClass) || cell.classList.contains(oClass);
//     });
// }

function minimax(values, depth, isMaximizing, currentClass) {
//     let result = checkWinner(currentClass);
//     if (result && currentClass === 'x-icon') {
//         let score = scores['X'];
//         return score;
//     } else if (result && currentClass === 'o-icon') {
//         let score = scores['O'];
//         return score;
//     } else if (isTie()) {
//         let score = scores['tie'];
//         return score;
//     }

//     if (isMaximizing) {
//         let bestScore = -Infinity;
//         for (let i = 0; i < 3; i++) {
//             for (let j = 0; j < 3; j++) {
//                 if (!values[i][j].classList.contains('o-icon') && !values[i][j].classList.contains('x-icon')) {
//                     values[i][j].classList.add('x-icon');
//                     let score = minimax(values, depth + 1, false, currentClass);
//                     values[i][j].classList.remove('x-icon');
//                     if (score > bestScore) {
//                         bestScore = score;

    //                 }
    //             }
    //         }
    //     }
    //     return bestScore;
    // } else {
    //     let bestScore = Infinity;
    //     for (let i = 0; i < 3; i++) {
    //         for (let j = 0; j < 3; j++) {
    //             if (!values[i][j].classList.contains('o-icon') && !values[i][j].classList.contains('x-icon')) {
    //                 values[i][j].classList.add('o-icon');
    //                 let score = minimax(values, depth + 1, true);
    //                 values[i][j].classList.remove('o-icon');
    //                 if (score < bestScore) {
    //                     bestScore = score;

    //                 }
    //             }
    //         }
    //     }
    //     return bestScore;
    // }

        return 1;
}


