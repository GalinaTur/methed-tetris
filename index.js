import { Game } from './modules/game.js';
import { View } from './modules/view.js';
import { Controller } from './modules/controller.js';

export const COLUMNS = 10;
export const ROWS = 20;
export const BLOCK_SIZE = 30;

export const game = new Game();
export const view = new View(document.querySelector('.container'));
export const controller = new Controller(game, view);

controller.init('Enter');