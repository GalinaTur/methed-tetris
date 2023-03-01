export class Controller {
    constructor(game, view) {
        this.game = game;
        this.view = view;
    }

    init(keyCode) {
        window.addEventListener('keydown', event => {
            if (event.code === keyCode) {
                this.game.gameOver = false;
                this.view.init();
                this.start();
            }
        })
    }

    start() {
        this.view.showArea(this.game.viewArea)
        this.view.stopPreview();
        this.game.createUpdatePanels(this.view.createBlockScore(), this.view.createBlockNextTetromino());
        const tick = () => {
            let time = (1100 - 100 * this.game.lvl);
            if (this.game.gameOver) {
                this.view.gameOverMessage();
                return;
            }
            setTimeout(() => {
                this.game.moveDown();
                this.view.showArea(this.game.viewArea);
                tick()
            }, time > 100? time : 100);
        };

        tick();

        window.addEventListener('keydown', event => {
            let key = event.code;
            switch (key) {
                case 'ArrowUp':
                    this.game.rotateTetromino();
                    this.view.showArea(this.game.viewArea);
                    break;
                case 'ArrowRight':
                    this.game.moveRight();
                    this.view.showArea(this.game.viewArea);
                    break;
                case 'ArrowDown':
                    this.game.moveDown();
                    this.view.showArea(this.game.viewArea);
                    break;
                case 'ArrowLeft':
                    this.game.moveLeft();
                    this.view.showArea(this.game.viewArea);
                    break;
            }
        });

    }
}