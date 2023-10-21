import { TWEEN, canvas, ctx } from '../../base/global.js';
import BaseState from '../BaseState.js';
class FadeInState extends BaseState {
    constructor({ r, g, b }, time, onFadeComplete) {
        super();
        this.window = window;
        this.r = r;
        this.g = g;
        this.b = b;
        this.opacity = 0;
        this.time = time;
        new TWEEN.Tween(this)
            .to({ opacity: 1 }, this.time)
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
export default FadeInState;
