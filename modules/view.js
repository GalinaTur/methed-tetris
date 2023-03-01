import { game, ROWS, COLUMNS, BLOCK_SIZE } from "../index.js";
import { Game } from "./game.js";

export class View {
    constructor(container) {
        this.container = container;
        this.preview();
    }

    colors = {
        J: '#797EF6',
        I: '#96F7D2',
        O: '#FFEB00',
        L: '#ffac28',
        2: '#FA6E4F',
        T: '#CE9DD9',
        S: '#77DD66',
    };

    canvas = document.createElement('canvas');

    preview(){
        const message = document.createElement('div');
        message.classList.add('message');
        message.innerHTML = 'Press <i>"ENTER"</i> to start!';
        this.container.append(message);
        
    }

    gameOverMessage() {
        const message = document.createElement('div');
        message.classList.add('message');
        message.innerHTML = `<span class ="game-over">Game Over!</span><br><br>Total score: ${game.score}`;
        this.container.innerHTML = '';
        this.container.append(message);
        setTimeout(() => window.location.reload(), 3000);
    }

    stopPreview(){
        const message = document.querySelector('.message');
        message.remove();
    }

    init() {
        this.canvas.style.gridArea = 'game';
        this.canvas.classList.add('game-area');
        this.container.append(this.canvas);
        this.canvas.height = BLOCK_SIZE * ROWS;
        this.canvas.width = BLOCK_SIZE * COLUMNS;
    }

    createBlockScore(){
        const scoreBlock = document.createElement('div');
        scoreBlock.style.cssText = `
        border: 1px solid grey;
        font-size: 18px;
        text-align: center;
        padding: 20px;
        grid-area: score;`;

        const linesElem = document.createElement('p');
        const scoreElem = document.createElement('p');
        const levelElem = document.createElement('p');
        const recordElem = document.createElement('p');

        scoreBlock.append(linesElem, scoreElem, levelElem, recordElem);

        this.container.append(scoreBlock);

        
        return (score, lines, lvl, record) => {
            linesElem.textContent = `lines: ${lines}`;
            scoreElem.textContent = `score: ${score}`;
            levelElem.textContent = `level: ${lvl}`;
            recordElem.textContent = `record: ${record}`;
        }
    }

    createBlockNextTetromino() {
        const nextBlock = document.createElement('div');
        nextBlock.style.cssText = `
        width: ${BLOCK_SIZE * 4}px;
        height: ${BLOCK_SIZE * 4}px;
        border: 1px solid grey;
        padding: 10px;
        grid-area: next;
        display: flex;
        align-items: center;
        justify-content: center;`;

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        nextBlock.append(canvas);

        this.container.append(nextBlock);

            return (tetromino) => {
                canvas.width = BLOCK_SIZE * tetromino.length;
                canvas.height = BLOCK_SIZE * tetromino.length;
                context.clearRect(0, 0, canvas.width, canvas.height);

                for (let y = 0; y < tetromino.length; y++) {
                    const line = tetromino[y];
        
                    for (let x = 0; x < line.length; x++) {
                        const block = line[x];
                        if (block !== '0') {
                            context.fillStyle = this.colors[block];
                            context.strokeStyle = 'rgb(248, 231, 209)';
                            context.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                            context.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                        }
                    }
                }
            }
    }

    showArea(area) {
        const context = this.canvas.getContext('2d');
        context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let y = 0; y < area.length; y++) {
            const line = area[y];

            for (let x = 0; x < line.length; x++) {
                const block = line[x];
                if (block !== '0') {
                    context.fillStyle = this.colors[block];
                    context.strokeStyle = 'rgb(248, 231, 209)';
                    context.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                    context.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                }
            }
        }
    }
}
