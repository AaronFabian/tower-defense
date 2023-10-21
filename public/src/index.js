// 1. application entry point
import './base/global.js';
import { ctx } from './base/global.js';
import StateStack from './os/StateStack.js';
import StartState from './states/game/StartState.js';
console.log(window); // ! remove
// 2. application setup
window.canvas.width = 1280;
window.canvas.height = 769;
let msPrev = window.performance.now();
let fps = 60;
let fpsInterval = 1000 / fps;
window.gStateStack = new StateStack();
window.gStateStack.push(new StartState());
window.keysPressed = new Map();
window.wasPressed = function (key) {
    // make this function global so we can access the entire game since this event will never remove
    const _keysPressed = window.keysPressed;
    return _keysPressed.get(key);
};
function update(time) {
    window.TWEEN.update(time);
    const stateStack = window.gStateStack;
    stateStack.update();
    window.keysPressed.clear();
}
function render() {
    ctx.reset(); // reset canvas to blank
    const stateStack = window.gStateStack;
    stateStack.render();
}
function animate(time) {
    const _ = requestAnimationFrame(animate);
    // this will treat all computer have the same execute speed
    const msNow = window.performance.now();
    const elapsed = msNow - msPrev;
    if (elapsed < fpsInterval)
        return;
    msPrev = msNow - (elapsed % fpsInterval);
    // collect all logic first here
    update(time);
    // after logic done render to the screen
    render();
}
let allowKey = true;
function keypressed({ key }) {
    // prevent long press, instead will use isDown()
    if (!allowKey)
        return;
    // exit game if there is
    if (key === 'q')
        console.log('Exit Game');
    // assign to window, so we can access them later
    const localKeysPressed = window.keysPressed;
    localKeysPressed.set(key, true);
    // this will prevent the key
    allowKey = false;
}
// this global function will never remove
window.addEventListener('keypress', keypressed);
window.addEventListener('keyup', () => (allowKey = true));
// this element will behave like Enter Button in our keyboard and never be removed
document.getElementById('enterBtn').addEventListener('mousedown', () => keypressed({ key: 'Enter' }));
document.getElementById('enterBtn').addEventListener('mouseup', () => (allowKey = true));
// 3. application start running
requestAnimationFrame(animate);
