import { TWEEN, canvas, ctx } from '../../base/global.js';
import BaseState from '../BaseState.js';

class FadeOutState extends BaseState {
	protected r: number;
	protected g: number;
	protected b: number;
	protected opacity: number;
	protected time: number;

	readonly window: any = window as any;

	constructor({ r, g, b }: { r: number; g: number; b: number }, time: number, onFadeComplete: Function) {
		super();

		this.r = r;
		this.g = g;
		this.b = b;

		this.opacity = 1;

		this.time = time;

		new TWEEN.Tween(this)
			.to({ opacity: 0 }, this.time)
			.onComplete(() => {
				this.window.gStateStack.pop();
				onFadeComplete();
			})
			.start();
	}

	render() {
		ctx.fillStyle = `rgba(${this.r}, ${this.g}, ${this.b}, ${this.opacity})`;
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	}
}

export default FadeOutState;
