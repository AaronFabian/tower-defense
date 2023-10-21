import { canvas, ctx } from '../../base/global.js';
import BaseState from '../BaseState.js';
import FadeInState from './FadeInState.js';
import FadeOutState from './FadeOutState.js';
import StartState from './StartState.js';
class GameOverState extends BaseState {
    constructor(onGameOver = () => { }, onExitGameOver = () => { }) {
        super();
        this.window = window;
        onGameOver();
        this.onExitGameOver = onExitGameOver;
        this.window.gSounds.get('game-over').play();
    }
    update() {
        if (this.window.wasPressed('Enter'))
            this.window.gStateStack.push(new FadeInState({ r: 255, g: 255, b: 255 }, 1500, () => {
                this.window.gStateStack.pop(); // this state
                this.window.gStateStack.pop(); // PlayState
                this.window.gStateStack.push(new StartState()); // PlayState
                this.window.gStateStack.push(new FadeOutState({ r: 255, g: 255, b: 255 }, 1500, () => { })); // PlayState
            }));
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
        this.window.gSounds.get('game-over').stop();
        // if there is some save game mechanics could be here
        this.onExitGameOver();
    }
}
export default GameOverState;
