import BaseState from '../BaseState.js';
import StartState from './StartState.js';

class GameOverState extends BaseState {
	constructor() {
		super();

		this.image = new Image();
		this.image.src = '/asset/gameMap.png';
	}

	update() {
		if (window.wasPressed('Enter')) {
			window.gStateStack.pop(); // GameOverState
			window.gStateStack.pop(); // PlayState
			window.gStateStack.push(new StartState());
		}
	}

	render() {
		ctx.font = '50px Comic Sans MS';
		ctx.textAlign = 'center';
		ctx.fillStyle = 'white';
		ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2);

		ctx.font = '30px Comic Sans MS';
		ctx.textAlign = 'center';
		ctx.fillStyle = 'white';
		ctx.fillText('press enter to return to title screen', canvas.width / 2, canvas.height / 2 + 105);
	}
}

export default GameOverState;
