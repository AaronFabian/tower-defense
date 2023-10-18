import BaseState from '../BaseState.js';
import FadeInState from './FadeInState.js';
import FadeOutState from './FadeOutState.js';
import StartState from './StartState.js';

class GameOverState extends BaseState {
	constructor() {
		super();

		this.image = new Image();
		this.image.src = '/asset/gameMap.png';
	}

	enter() {
		gSounds['game-over'].play();
	}

	update() {
		if (window.wasPressed('Enter')) {
			window.gStateStack.push(
				new FadeInState({ r: 255, g: 255, b: 255 }, 1500, function () {
					window.gStateStack.pop(); // this state
					window.gStateStack.pop(); // PlayState
					window.gStateStack.push(new StartState());
					window.gStateStack.push(new FadeOutState({ r: 255, g: 255, b: 255 }, 1500, function () {}));
				})
			);
		}
	}

	render() {
		ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
		ctx.fillRect(canvas.width / 2 - 200, canvas.height / 2 - 65, 400, 100);

		ctx.font = '50px Comic Sans MS';
		ctx.textAlign = 'center';
		ctx.fillStyle = 'white';
		ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2);

		ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
		ctx.fillRect(canvas.width / 2 - 300, canvas.height / 2 + 65, 600, 60);

		ctx.font = '30px Comic Sans MS';
		ctx.textAlign = 'center';
		ctx.fillStyle = 'white';
		ctx.fillText('press enter to return to title screen', canvas.width / 2, canvas.height / 2 + 105);
	}

	exit() {
		gSounds['game-over'].stop();
	}
}

export default GameOverState;
