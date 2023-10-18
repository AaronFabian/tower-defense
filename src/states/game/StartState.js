import newImage from '../../utils/newImage.js';
import BaseState from '../BaseState.js';
import FadeInState from './FadeInState.js';
import FadeOutState from './FadeOutState.js';
import PlayState from './PlayState.js';

class StartState extends BaseState {
	constructor() {
		super();

		this.image = gTextures['game-map'];
		this.opacity = 1;
		this.blink = false;

		this.interval = setInterval(() => {
			new TWEEN.Tween(this)
				.to({ opacity: this.blink ? 1 : 0 }, 1000)
				.onComplete(() => (this.blink = !this.blink)) // "this" keyword slop to class
				.start();
		}, 1250); // more 250 give TWEEN time to finished
	}

	update() {
		if (window.wasPressed('Enter'))
			window.gStateStack.push(
				new FadeInState({ r: 255, g: 255, b: 255 }, 1500, function () {
					window.gStateStack.pop(); // this state
					window.gStateStack.push(new PlayState());
					window.gStateStack.push(new FadeOutState({ r: 255, g: 255, b: 255 }, 1500, function () {}));
				})
			);
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
		ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
		ctx.fillText('press enter to start the game', canvas.width / 2, canvas.height / 2 + 105);
	}

	exit() {
		clearInterval(this.interval);
		TWEEN.removeAll();
	}
}

export default StartState;
