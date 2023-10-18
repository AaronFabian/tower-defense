class StateMachine {
	constructor(states = {}) {
		this.empty = {
			render: function () {},
			update: function () {},
			processAI: function () {},
			enter: function () {},
			exit: function () {},
		};
		this.states = states;
		this.current = this.empty;
	}

	change(stateName, enterParams) {
		if (!this.states[stateName]) throw new Error('state must exit :StateMachine 15');
		this.current.exit();
		this.current = this.states[enterParams];
		this.current.enter();
	}

	update() {
		this.current.update();
	}

	render() {
		this.current.render();
	}
}

export default StateMachine;
