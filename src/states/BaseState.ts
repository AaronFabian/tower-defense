import { RenderContext } from '../interfaces/RenderContext.js';

class BaseState implements RenderContext {
	processAI() {}

	enter(params: any) {}

	exit() {}

	update() {}

	render() {}
}

export default BaseState;
