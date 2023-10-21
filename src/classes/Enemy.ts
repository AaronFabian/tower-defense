import { ctx } from '../base/global.js';
import { Frames } from '../interfaces/Frames.js';
import { Position } from '../interfaces/Position.js';
import { Velocity } from '../interfaces/Velocity.js';
import BaseState from '../states/BaseState.js';
import wayPoints from '../base/wayPoints.js';
import Sprite from './Sprite.js';
import PlayState from '../states/game/PlayState.js';

class Enemy extends Sprite {
	world: BaseState; // * keep reference to our game
	width: number;
	height: number;
	wayPointIndex: number;
	center: Position;
	radius: number;
	health: number;
	velocity: Velocity;

	constructor(world: BaseState, position: Position) {
		const orcImage = ((window as any).gTextures as Map<string, HTMLImageElement>).get('orc')!;
		const frames = <Frames>{
			max: 7,
			current: 0,
			elapsed: 0,
			hold: 5,
		};
		super(position, orcImage, frames);

		this.world = world;
		this.radius = 50;
		this.height = 100;
		this.health = 100;
		this.width = 100;
		this.wayPointIndex = 0;
		this.center = <Position>{
			x: this.position.x + this.width / 2,
			y: this.position.y + this.height / 2,
		};
		this.velocity = <Velocity>{
			x: 0,
			y: 0,
		};
	}

	override update() {
		super.update(); // will responsible for sprite animation update

		const wayPoint = wayPoints[this.wayPointIndex];
		const yDistance = wayPoint.y - this.center.y;
		const xDistance = wayPoint.x - this.center.x;
		const angle = Math.atan2(yDistance, xDistance);

		const speed = 3;
		this.velocity.x = Math.cos(angle) * speed;
		this.velocity.y = Math.sin(angle) * speed;

		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;

		this.center = <Position>{
			x: this.position.x + this.width / 2,
			y: this.position.y + this.height / 2,
		};

		if (
			Math.abs(Math.round(this.center.x) - Math.round(wayPoint.x)) < Math.abs(this.velocity.x) &&
			Math.abs(Math.round(this.center.y) - Math.round(wayPoint.y)) < Math.abs(this.velocity.y) &&
			this.wayPointIndex < wayPoints.length - 1
		) {
			this.wayPointIndex++;
		}

		//
		// -100 off screen at Y coordinate
		if (this.position.y < -100) {
			const index = (this.world as PlayState).enemies.indexOf(this);
			(this.world as PlayState).enemies.splice(index, 1);
			(this.world as PlayState).hearts -= 1;

			((window as any).gSounds as Map<string, any>).get('player-get-hit').play();
			document.getElementById('hearts')!.innerHTML = (this.world as PlayState).hearts.toString();
		}
	}

	override render() {
		super.render(); // will responsible for sprite animation rendering

		// health bar
		ctx.fillStyle = 'red';
		ctx.fillRect(this.position.x, this.position.y - 15, this.width, 10);

		ctx.fillStyle = 'green';
		ctx.fillRect(this.position.x, this.position.y - 15, this.width * (this.health / 100), 10);
	}
}

export default Enemy;
