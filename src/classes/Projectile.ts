import { Frames } from '../interfaces/Frames.js';
import { Position } from '../interfaces/Position.js';
import { Velocity } from '../interfaces/Velocity.js';
import Enemy from './Enemy.js';
import Sprite from './Sprite.js';

class Projectile extends Sprite {
	static radius = 10;

	velocity: Velocity;
	enemy: Enemy;
	position: Position;

	constructor(position: Position, enemy: Enemy) {
		const projectileImage = ((window as any).gTextures as Map<string, HTMLImageElement>).get('projectile')!;
		super(position, projectileImage);

		this.position = position;
		this.enemy = enemy;
		this.velocity = <Velocity>{
			x: 0,
			y: 0,
		};
	}

	override update() {
		const angle = Math.atan2(this.enemy.center.y - this.position.y, this.enemy.center.x - this.position.x);
		const power = 5;

		this.velocity.x = Math.cos(angle) * power;
		this.velocity.y = Math.sin(angle) * power;

		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;
	}
}

export default Projectile;

// legacy code...
// from super class
// draw() {
// 	ctx.drawImage(this.image, this.position.x, this.position.y);

// 	// debug code
// 	// ctx.beginPath();
// 	// ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
// 	// ctx.fillStyle = 'orange';
// 	// ctx.fill();
// }
