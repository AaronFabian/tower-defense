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

window.gSounds = {
	['start-song']: new Howl({
		src: ['/sounds/start_song.mp3'],
		loop: true,
	}),
	['pause-button-pressed']: new Howl({
		src: ['/sounds/pause_effect.wav'],
	}),
	['player-get-hit']: new Howl({
		src: ['/sounds/player_get_hit.mp3'],
	}),
	['rock-break']: new Howl({
		src: ['/sounds/rock_break.ogg'],
	}),
	['field-battle']: new Howl({
		src: ['/sounds/field_battle.wav'],
		loop: true,
	}),
	['game-over']: new Howl({
		src: ['/sounds/game_over.ogg'],
	}),
};
