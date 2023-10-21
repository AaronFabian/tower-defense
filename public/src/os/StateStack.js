class StateStack {
    constructor() {
        this.states = [];
    }
    update() {
        this.states[this.states.length - 1].update();
    }
    processAI() {
        this.states.forEach(state => state.processAI());
    }
    render() {
        this.states.forEach(state => state.render());
    }
    push(state) {
        this.states.push(state);
        state.enter({});
    }
    pop() {
        this.states[this.states.length - 1].exit();
        this.states.pop();
    }
}
export default StateStack;
