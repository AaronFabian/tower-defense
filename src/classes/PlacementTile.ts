import { TILE_SIZE, ctx } from '../base/global.js';
import { Position } from '../interfaces/Position.js';

import { RenderContext } from '../interfaces/RenderContext.js';
import BaseState from '../states/BaseState.js';

class PlacementTile implements RenderContext {
	readonly window: any = window as any;

	size: number;
	color: string;
	isOccupied: boolean;

	constructor(public world: BaseState, public position: Position) {
		this.size = TILE_SIZE;
		this.color = 'rgba(255, 255, 255, 0.15)';
		this.isOccupied = false;
	}

	update() {
		const mouse = (this.world as any).mouse as Position;

		if (
			mouse.x > this.position.x &&
			mouse.x < this.position.x + this.size &&
			mouse.y > this.position.y &&
			mouse.y < this.position.y + this.size
		) {
			this.color = 'white';
		} else this.color = 'rgba(255, 255, 255, 0.15)';
	}

	render() {
		ctx.fillStyle = this.color;
		ctx.fillRect(this.position.x, this.position.y, this.size, this.size);
	}
}

export default PlacementTile;
