import BaseState from '../BaseState.js';

class FadeOutState extends BaseState {
	constructor({ r, g, b }, time, onFadeComplete) {
		super();

		this.r = r;
		this.g = g;
		this.b = b;
		this.opacity = 1;

		this.time = time;

		new TWEEN.Tween(this)
			.to({ opacity: 0 }, this.time)
			.onComplete(function () {
				window.gStateStack.pop();
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
