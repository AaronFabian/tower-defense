import { canvas, ctx } from '../../base/global.js';
import BaseState from '../BaseState.js';
import FadeInState from './FadeInState.js';
import FadeOutState from './FadeOutState.js';
import PlayState from './PlayState.js';

class StartState extends BaseState {
	readonly window: any = window as any;

	protected image: HTMLImageElement;
	protected opacity;
	protected blink;
	protected intervalID: number;

	constructor() {
		super();

		this.image = (this.window.gTextures as Map<string, HTMLImageElement>).get('game-map')!;
		this.opacity = 1;
		this.blink = false;

		this.intervalID = setInterval(() => {
			new this.window.TWEEN.Tween(this)
				.to({ opacity: this.blink ? 1 : 0 }, 1000)
				.onComplete(() => (this.blink = !this.blink))
				.start();
		}, 1000);

		(this.window.gSounds as Map<string, any>).get('start-song').play();
	}

	override update() {
		if (this.window.wasPressed('Enter'))
			this.window.gStateStack.push(
				new FadeInState({ r: 255, g: 255, b: 255 }, 1500, () => {
					this.window.gStateStack.pop(); // this state
					this.window.gStateStack.push(new PlayState());
					this.window.gStateStack.push(new FadeOutState({ r: 255, g: 255, b: 255 }, 1500, () => {}));
				})
			);
	}

	override render() {
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

	override exit() {
		(this.window.gSounds as Map<string, any>).get('start-song').stop();
	}
}

export default StartState;
