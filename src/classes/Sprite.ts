import { RenderContext } from '../interfaces/RenderContext.js';
import { Position } from '../interfaces/Position.js';
import { Frames } from '../interfaces/Frames.js';
import { ctx } from '../base/global.js';

class Sprite implements RenderContext {
	constructor(
		public position: Position,
		public image: HTMLImageElement,
		public frames: Frames = <Frames>{
			max: 1,
			current: 0,
			elapsed: 0,
			hold: 5,
		},
		public offset: Position = <Position>{ x: 0, y: 0 }
	) {}

	update() {
		this.frames.elapsed++;
		if (this.frames.elapsed % this.frames.hold === 0) {
			this.frames.current++;

			if (this.frames.current >= this.frames.max) {
				this.frames.current = 0;
			}
		}
	}

	render() {
		const cropWidth = this.image.width / this.frames.max;
		const crop = {
			position: <Position>{
				x: cropWidth * this.frames.current,
				y: 0,
			},
			width: cropWidth,
			height: this.image.height,
		};

		ctx.drawImage(
			// src
			this.image,

			// the square
			crop.position.x,
			crop.position.y,
			crop.width,
			crop.height,

			// .
			this.position.x + this.offset.x,
			this.position.y + this.offset.y,
			crop.width,
			crop.height
		);
	}
}

export default Sprite;
