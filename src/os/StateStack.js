// ! StateStack will not receive the [enter params]

class StateStack {
	constructor() {
		this.states = [];
	}

	update() {
		this.states[this.states.length - 1].update();
	}

	processAI(params) {
		this.states[this.states.length - 1].processAI(params);
	}

	render() {
		this.states.forEach(state => state.render());
	}

	clear() {
		this.states = {};
	}

	push(state) {
		this.states.push(state);
		state.enter();
	}

	pop() {
		this.states[this.states.length - 1].exit();
		this.states.pop();
	}
}

export default StateStack;
