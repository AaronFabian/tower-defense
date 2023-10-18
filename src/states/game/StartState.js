import BaseState from '../BaseState.js';
import PlayState from './PlayState.js';

class StartState extends BaseState {
	constructor() {
		super();

		this.image = new Image();
		this.image.src = '/asset/gameMap.png';

		this.handleKeyboardDown = event => {};
		window.addEventListener('keypress', this.handleKeyboardDown, false);
	}

	update() {
		if (window.wasPressed('Enter')) {
			window.gStateStack.pop();
			window.gStateStack.push(new PlayState());
		}
	}

	render() {
		ctx.drawImage(this.image, 0, 0);

		ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
		ctx.fillRect(canvas.width / 2 - 200, canvas.height / 2 - 65, 400, 100);

		ctx.font = '50px Comic Sans MS';
		ctx.textAlign = 'center';
		ctx.fillStyle = 'white';
		ctx.fillText('Tower Defense', canvas.width / 2, canvas.height / 2);

		ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
		ctx.fillRect(canvas.width / 2 - 220, canvas.height / 2 + 65, 440, 60);

		ctx.font = '30px Comic Sans MS';
		ctx.textAlign = 'center';
		ctx.fillStyle = 'white';
		ctx.fillText('press enter to start the game', canvas.width / 2, canvas.height / 2 + 105);
	}

	exit() {
		window.removeEventListener('keypress', this.handleKeyboardDown, false);
	}
}

export default StartState;
