// application entry point
import newImage from '../utils/newImage.js';

// remove annoying browser extension error only for dev purpose
console.clear();

window.canvas = document.getElementById('canvas');
window.ctx = window.canvas.getContext('2d');
window.TILE_SIZE = 64;

window.gTextures = {
	['game-map']: newImage('/asset/gameMap.png'),
	['orc']: newImage('/asset/orc.png'),
	['explosion']: newImage('/asset/explosion.png'),
	['tower']: newImage('/asset/tower.png'),
};
