const isEqual = (a, b, c) => a == b && b == c && a != '';

const scores = {
    x: 10,
    o: -10,
    tie: 0,
};

class Game {
    constructor () {
        this.scores = {
            player_one: 0,
            player_two: 0,
            tie: 0,
        };
        this.player_one = 'x';
        this.player_two = 'o';
        this.turn = 'x';
        this.computer_mode = true;
        this.isPlaying = false;
        this.board = [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
        ];
        this.winningCombination = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        this.mutted = false;

        const muteBtn = document.querySelector('.mute-icon');


        muteBtn.addEventListener('click', () => {
            muteBtn.classList.toggle('cutted-icon');
            if (muteBtn.classList.contains('cutted-icon')) {
                this.mutted = true;
            } else {
                this.mutted = false;
            }
        });

        document.getElementsByClassName('players')[0].addEventListener('click', this.toggleMode);
    }

    start = () => {
        this.isPlaying = true;
        this.board = new Array(3).fill([]).map(_ => new Array(3).fill(''));
        this.renderMatrix(this.board);
    };

    renderMatrix = (arr) => {
        document.getElementById('game-display').innerText = '';
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr.length; j++) {
                const el = document.createElement('div');
                el.className = 'element-icon';
                el.innerText = arr[i][j];
                el.addEventListener('click', () => this.handleBoardClick(i, j));
                document.getElementById('game-display').append(el);
            }
        }
    };


    handleBoardClick = (row, col) => {
        if (!this.isPlaying) return;
        if (this.board[row][col] === '') {
            let audio = new Audio('./audio/mixkit-arcade-game-jump-coin-216.wav');
            this.board[row][col] = this.turn;
            if (this.mutted === false) {
                audio.play();
            };
            this.renderMatrix(this.board);
            this.toggleTurn();
        }

        if (this.computer_mode) {
            const { i, j } = this.findBesMove();
            // this.findBesMove();
            if (i === undefined && j === undefined) {
                this.checkWinner(this.board);
            } else {
                this.board[i][j] = this.turn;
            }
            this.renderMatrix(this.board);
            this.toggleTurn();
        }

        const winner = this.checkWinner(this.board);
        if (winner) {
            this.end(winner);
        }
    };

    swapGameMode = () => {
        let swapMode = document.querySelector('.player-logo');

        swapMode.addEventListener('click', toggleMode());
    };

    toggleMode = () => {
        let onePlayerLogo = document.querySelector('.one-player-icon');
        let twoPlayerLogo = document.querySelector('.two-player-icon');

        let p1text = document.querySelector('.p1');
        let p2text = document.querySelector('.p2');

        if (p1text.style.display !== 'none') {
            p1text.style.display = 'none';
            p2text.style.display = 'inherit';
        } else {
            p2text.style.display = 'none';
            p1text.style.display = 'inherit';
        }

        if (onePlayerLogo.style.display !== 'none') {
            onePlayerLogo.style.display = 'none';
            twoPlayerLogo.style.display = 'inherit';
        } else {
            onePlayerLogo.style.display = 'inherit';
            twoPlayerLogo.style.display = 'none';
        }

        this.computer_mode = !this.computer_mode;

    };

    toggleTurn = () => {
        this.turn = this.turn === this.player_one ? this.player_two : this.player_one;
    };


    findBesMove = () => {
        let bestScore = -1;
        let move = {};
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.board[i][j] == '') {
                    this.board[i][j] = this.player_two;
                    let score = this.minimax(this.board, 0, false);
                    this.board[i][j] = '';
                    if (score > bestScore) {
                        console.log(i, j);
                        bestScore = score;
                        move = { i, j };
                    }
                }
            }
        }
        return move;
    };

    minimax = (board, depth, isMaximizing) => {
        let result = this.checkWinner(this.board);
        if (result) {
            return scores[result];
        }

        if (!isMaximizing) {
            let bestScore = Infinity;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (board[i][j] === '') {
                        board[i][j] = this.player_one;
                        let score = this.minimax(this.board, depth + 1, true);
                        bestScore = Math.min(bestScore, score);
                        board[i][j] = '';
                    }
                }
            }
            return bestScore;

        } else {
            let bestScore = -Infinity;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (board[i][j] === '') {
                        board[i][j] = this.player_two;
                        let score = this.minimax(this.board, depth + 1, false);
                        bestScore = Math.max(bestScore, score);
                        board[i][j] = '';
                    }
                }
            }
            return bestScore;
        }
    };

    // check winner
    checkWinner = (board) => {
        let winner = null;

        for (let i = 0; i < 3; i++) {
            if (isEqual(board[i][0], board[i][1], board[i][2])) {
                winner = board[i][0];
                // this.winningCombination = new Array(3).map(_ => `${i},0`);
            }
        }

        for (let i = 0; i < 3; i++) {
            if (isEqual(board[0][i], board[1][i], board[2][i])) {
                winner = board[0][i];
                // this.winningCombination = new Array(3).map(_ => `0,${i}`);
            }
        }

        if (isEqual(board[0][0], board[1][1], board[2][2])) {
            winner = board[0][0];
            // this.winningCombination = ['0,0', '1,1', '2,2'];
        }
        if (isEqual(board[2][0], board[1][1], board[0][2])) {
            winner = board[2][0];
            // this.winningCombination = ['0,2', '1,1', '2,0'];
        }

        const isTie = !board.flat().includes('') && 'tie';

        return winner || isTie;
    };


    end = (winner) => {
        this.isPlaying = false;
        if (winner === 'x') {
            this.scores.player_one += 1;
        }

        if (winner === 'o') {
            this.scores.player_two += 1;
        }

        if (winner === 'tie') {
            this.scores.tie += 1;
            this.start();
        }

        this.renderScores();
        this.animation(this.winningCombination);
    };

    renderScores = () => {
        const xScore = document.querySelector('.x-score');
        const oScore = document.querySelector('.o-score');
        const tie = document.querySelector('.middle');

        xScore.innerText = this.scores.player_one;
        oScore.innerText = this.scores.player_two;
        tie.innerText = this.scores.tie;
    };

    animation = () => {
        setTimeout(() => {
            let winningAudio = new Audio('./audio/mixkit-male-voice-cheer-2010.wav');
            if (this.mutted === false) {
                winningAudio.play();
            }
            this.start();
            this.winningCombination = [];
        }, 1000);
    };

}

const game = new Game();
game.start();


