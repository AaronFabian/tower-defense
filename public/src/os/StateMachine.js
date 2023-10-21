class StateMachine {
    constructor(states) {
        this.states = states;
        this.empty = {
            render() { },
            update() { },
            processAI() { },
            enter() { },
            exit() { },
        };
        this.current = this.empty;
    }
    change(stateName, enterParams) {
        if (!this.states.has(stateName))
            throw new Error('state must exist !');
        this.current.exit();
        this.current = this.states.get(stateName);
        this.current.enter(enterParams);
    }
    update() {
        this.current.update();
    }
    render() {
        this.current.render();
    }
}
export default StateMachine;
