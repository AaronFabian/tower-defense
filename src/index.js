// this import here will be available in our project
import './base/global.js'; // will be in windows object

import StateStack from './os/StateStack.js';
import StartState from './states/game/StartState.js';

try {
	canvas.width = 1280;
	canvas.height = 769;

	let msPrev = window.performance.now();
	let fps = 60;
	let fpsInterval = 1000 / fps;

	window.gStateStack = new StateStack();
	window.gStateStack.push(new StartState());

	window.keysPressed = {};

	window.wasPressed = function (key) {
		return window.keysPressed[key];
	};

	function update() {
		window.gStateStack.update();
		window.keysPressed = {};
	}

	function render() {
		ctx.reset(); // clearing our canvas
		window.gStateStack.render();
	}

	function animate(time) {
		const animationID = requestAnimationFrame(animate);

		const msNow = window.performance.now();
		const elapsed = msNow - msPrev;
		if (elapsed < fpsInterval) return;
		msPrev = msNow - (elapsed % fpsInterval);

		TWEEN.update(time);

		update();

		render();
	}

	window.keypressed = function ({ key }) {
		if (key === 'q') console.log('Exit Game');

		// console.log(key);

		window.keysPressed[key] = true;
	};
	window.addEventListener('keypress', keypressed, false);

	requestAnimationFrame(animate);
} catch (error) {
	console.error(error);
	document.title = 'FATAL ERROR';
}

// last watch 3.01.49
