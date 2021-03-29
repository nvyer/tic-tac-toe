// const cellElements = document.querySelectorAll('.square');
// const xScore = document.querySelector('.x-score');
// const oScore = document.querySelector('.o-score');
// const tie = document.querySelector('.middle');
// const board = document.querySelector('.game-display');

// const xClass = 'x-icon';
// const oClass = 'o-icon';

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

// let xTurn = true;


// cellElements.forEach((el) => {
//     el.addEventListener('click', handleClick)
// })


// function handleClick(event) {
//     const cell = event.target;
//     const currentClass = xTurn ? xClass : oClass;
//     placeMark(cell, currentClass);

//     if (checkWinner(currentClass)) {
//         if (currentClass === 'x-icon') {
//             let convertedScore = parseInt(xScore.innerText);
//             xScore.innerText = convertedScore + 1;
//             restartGame();
//         } else if (currentClass === 'o-icon') {
//             let convertedScore = parseInt(oScore.innerText);
//             oScore.innerText = convertedScore + 1;
//             restartGame();
//         }
//     } else if (isTie()) {
//         let convertedScore = parseInt(tie.innerText);
//         tie.innerText = convertedScore + 1;
//         restartGame();
//     }
//     swapTurns();
// }


// function isTie() {
//     return [...cellElements].every(cell => {
//         return cell.classList.contains(xClass) || cell.classList.contains(oClass);
//     });
// }


// function placeMark(cell, currentClass) {
//     cell.classList.add(currentClass);
// }

// function checkWinner(currentClass) {
//     return winningCombinations.some(combination => {
//         return combination.every(index => {
//             return cellElements[index].classList.contains(currentClass);
//         })
//     })
// }

// function restartGame() {
//     cellElements.forEach(container => {
//         return container.classList.remove('x-icon', 'o-icon')
//     })
// }

// function swapTurns() {
//     xTurn = !xTurn;
// };


// // ai minimax

// const isEqual = (a, b, c) => a == b && b == c && a != '';

// const scores = {
//     x: 10,
//     o: -10,
//     tie: 0,
// }

// // const mute = document.querySelector('.mute-icon');

// // mute.addEventListener('click',(event) => {
// //     mute.classList.add('cutted-icon')
// // })

// class Game {
//     constructor() {
//         this.scores = {
//             player_one: 0,
//             player_two: 0,
//             tie: 0,
//         };
//         this.player_one = 'x';
//         this.player_two = 'o';
//         this.turn = 'x';
//         this.computer_mode = false;
//         this.isPlaying = false;
//         this.board = undefined;
//         this.winningCombination = [];

//         document.getElementsByClassName('players')[0].addEventListener('click', this.toggleMode);
//     }

//     toggleMode = () => {
//         this.computer_mode = !this.computer_mode;
//     };

//     toggleTurn = () => {
//         this.turn = this.turn === 'x' ? 'o' : 'x';
//     }

//     renderMatrix = (arr) => {
//         document.getElementById('game-display').innerText = '';
//         for (let i = 0; i < arr.length; i++) {
//             for (let j = 0; j < arr.length; j++) {
//                 const el = document.createElement('div');
//                 el.className = 'element-icon';
//                 el.innerText = arr[i][j];
//                 el.addEventListener('click', () => this.handleClick(i, j), { once: true });
//                 document.getElementById('game-display').append(el);
//             }
//         }
//     }

//     handleClick = (row, col) => {
//         if (!this.isPlaying) return;
//         this.board[row][col] = this.turn;
//         this.renderMatrix(this.board);
//         this.toggleTurn();
//         if (this.computer_mode) {
//             const { i, j } = this.findNextMove();   
//             this.board[i][j] = this.turn;
//             this.renderMatrix(this.board);
//             this.toggleTurn();
//         }

//         const winner = this.checkWinner(this.board);
//         if (winner) {
//             this.end(winner)
//         }
//     }

//     findNextMove = () => {
//         let bestScore = -Infinity;
//         let move = {};
//         for (let i = 0; i < 3; i++) {
//             for (let j = 0; j < 3; j++) {
//                 if (this.board[i][j] == '') {
//                     this.board[i][j] = this.player_two;
//                     let score = this.minimax(this.board, 0, false);
//                     this.board[i][j] = '';
//                     if (score > bestScore) {
//                         bestScore = score;
//                         move = { i, j };
//                     }
//                 }
//             }
//         }
//         return move;
//     }

//     minimax = (board, depth, isMaximizing) => {
//         let result = this.checkWinner(board);
//         if (result) {
//             return scores[result];
//         }

//         if (isMaximizing) {
//             let bestScore = -Infinity;
//             for (let i = 0; i < 3; i++) {
//                 for (let j = 0; j < 3; j++) {
//                     if (board[i][j] == '') {
//                         board[i][j] = this.player_two;
//                         let score = this.minimax(board, depth + 1, false);
//                         board[i][j] = '';
//                         bestScore = Math.max(score, bestScore);
//                     }
//                 }
//             }
//             return bestScore;
//         } else {
//             let bestScore = Infinity;
//             for (let i = 0; i < 3; i++) {
//                 for (let j = 0; j < 3; j++) {
//                     if (board[i][j] == '') {
//                         board[i][j] = this.player_one;
//                         let score = this.minimax(board, depth + 1, true);
//                         board[i][j] = '';
//                         bestScore = Math.min(score, bestScore);
//                     }
//                 }
//             }
//             return bestScore;
//         }
//     }

//     checkWinner = (board) => {
//         let winner = null;

//         for (let i = 0; i < 3; i++) {
//             if (isEqual(board[i][0], board[i][1], board[i][2])) {
//                 winner = board[i][0];
//                 this.winningCombination = new Array(3).map(_ => `${i},0`);
//             }
//         }

//         for (let i = 0; i < 3; i++) {
//             if (isEqual(board[0][i], board[1][i], board[2][i])) {
//                 winner = board[0][i];
//                 this.winningCombination = new Array(3).map(_ => `0,${i}`);
//             }
//         }

//         if (isEqual(board[0][0], board[1][1], board[2][2])) {
//             winner = board[0][0];
//             this.winningCombination = ['0,0', '1,1', '2,2'];
//         }
//         if (isEqual(board[2][0], board[1][1], board[0][2])) {
//             winner = board[2][0];
//             this.winningCombination = ['0,2', '1,1', '2,0'];
//         }

//         const isTie = !board.flat().includes('') && 'tie';

//         return winner || isTie;
//     }

//     start = () => {
//         this.isPlaying = true;
//         this.board = new Array(3).fill([]).map(_ => new Array(3).fill(''));
//         this.renderMatrix(this.board);
//     }

//     end = (winner) => {
//         this.isPlaying = false;
//         if (winner === 'x') {
//             this.scores.player_one += 1;
//         }

//         if (winner === 'o') {
//             this.scores.player_two += 1;
//         }

//         if (winner === 'tie') {
//             this.scores.tie += 1;
//         }

//         this.renderScores();
//         this.animation();
//     }

//     renderScores = () => {
//         const xScore = document.querySelector('.x-score');
//         const oScore = document.querySelector('.o-score');
//         const tie = document.querySelector('.middle');

//         xScore.innerText = this.scores.player_one;
//         oScore.innerText = this.scores.player_two;
//         tie.innerText = this.scores.tie;
//     }

//     animation = () => {
//         // TODO: write animation
//         setTimeout(() => {
//             this.start();
//             this.winningCombination = [];
//         }, 3000);
//     }

// }

// const game = new Game();
// game.start();