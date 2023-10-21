import { RenderContext } from '../interfaces/RenderContext.js';
import BaseState from '../states/BaseState.js';

class StateMachine implements RenderContext {
	private empty: BaseState;
	private current: BaseState;

	constructor(public states: Map<string, BaseState>) {
		this.empty = <BaseState>{
			render() {},
			update() {},
			processAI() {},
			enter() {},
			exit() {},
		};

		this.current = this.empty;
	}

	change(stateName: string, enterParams: any) {
		if (!this.states.has(stateName)) throw new Error('state must exist !');

		this.current.exit();
		this.current = this.states.get(stateName)!;
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
