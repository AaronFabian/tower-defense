import BaseState from '../BaseState.js';

class PauseState extends BaseState {
	update() {
		if (window.wasPressed('Enter')) {
			window.gStateStack.pop();

			gSounds['field-battle'].play();
		}
	}

	render() {
		ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
		ctx.fillRect(canvas.width / 2 - 200, canvas.height / 2 - 65, 400, 100);

		ctx.font = '50px Comic Sans MS';
		ctx.textAlign = 'center';
		ctx.fillStyle = 'white';
		ctx.fillText('Game Paused', canvas.width / 2, canvas.height / 2);

		ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
		ctx.fillRect(canvas.width / 2 - 300, canvas.height / 2 + 65, 600, 60);

		ctx.font = '30px Comic Sans MS';
		ctx.textAlign = 'center';
		ctx.fillStyle = `rgba(255, 255, 255, 1)`;
		ctx.fillText('press enter again to resume the game', canvas.width / 2, canvas.height / 2 + 105);
	}
}

export default PauseState;
