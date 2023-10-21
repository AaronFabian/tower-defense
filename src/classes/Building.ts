import { TILE_SIZE } from '../base/global.js';
import { Frames } from '../interfaces/Frames.js';
import { Position } from '../interfaces/Position.js';

import BaseState from '../states/BaseState.js';
import Enemy from './Enemy.js';
import PlayState from '../states/game/PlayState.js';
import Projectile from './Projectile.js';
import Sprite from './Sprite.js';

class Building extends Sprite {
	world: BaseState; // * keep reference to our game
	width: number;
	height: any;
	center: Position;
	projectiles: Projectile[];
	radius: number;
	target: any | null;
	frames: any;
	constructor(world: BaseState, position: Position) {
		const buildingImage = ((window as any).gTextures as Map<string, HTMLImageElement>).get('tower')!;
		const frames = <Frames>{ max: 19, current: 0, elapsed: 0, hold: 5 };
		const offset = <Position>{ x: 0, y: -80 };
		super(position, buildingImage, frames, offset);

		this.world = world;
		this.width = TILE_SIZE * 2;
		this.height = TILE_SIZE;
		this.projectiles = [];
		this.radius = 250;
		this.center = {
			x: this.position.x + this.width / 2,
			y: this.position.y + this.height / 2,
		};
	}

	shoot() {
		this.projectiles.push(
			new Projectile(
				<Position>{
					x: this.center.x - 20,
					y: this.center.y - 110, // offset,
				},
				this.target
			)
		);
	}

	override update() {
		// 1.
		// if there is the target then we will tell Sprite to update animation;
		if (this.target || (!this.target && this.frames.current !== 0)) {
			super.update();
		}

		if (this.target && this.frames.current === 6 && this.frames.elapsed % this.frames.hold === 0) this.shoot();

		// 2 .
		// the target will select the top front enemy first
		this.target = null;
		const filterValidEnemy = (enemy: Enemy) => {
			const xDifference = enemy.center.x - this.position.x;
			const yDifference = enemy.center.y - this.position.y;
			const distance = Math.hypot(xDifference, yDifference);

			return distance < enemy.radius + this.radius;
		};
		const validEnemies = (this.world as PlayState).enemies.filter(filterValidEnemy);
		this.target = validEnemies[0]; // top front

		// 3 .
		for (let i = this.projectiles.length - 1; i >= 0; i--) {
			const projectile = this.projectiles[i];
			projectile.update();

			const xDifference = projectile.enemy.center.x - projectile.position.x;
			const yDifference = projectile.enemy.center.y - projectile.position.y;
			const distance = Math.hypot(xDifference, yDifference);

			// projectile hits as enemy
			if (distance < projectile.enemy.radius + Projectile.radius) {
				projectile.enemy.health -= 20;

				// remove enemy if it hits
				if (projectile.enemy.health <= 0) {
					((window as any).gSounds as Map<string, any>).get('rock-break').play();
					const enemyIndex = (this.world as PlayState).enemies.findIndex(enemy => projectile.enemy === enemy);

					// add coins
					if (enemyIndex > -1) {
						(this.world as PlayState).enemies.splice(enemyIndex, 1);
						(this.world as PlayState).coins += 25;
						document.getElementById('coins')!.innerHTML = (this.world as PlayState).coins.toString();
					}
				}

				// remove the projectile from game even even the enemy not dead yet
				// sound code ...
				const explosionImage = ((window as any).gTextures as Map<string, HTMLImageElement>).get('explosion')!;
				const explosionPosition = <Position>{ x: projectile.position.x, y: projectile.position.y };
				const frames = <Frames>{ max: 4, current: 0, elapsed: 0, hold: 5 };

				(this.world as PlayState).explosions.push(new Sprite(explosionPosition, explosionImage, frames));
				this.projectiles.splice(i, 1);
			}
		}
	}

	override render() {
		super.render();

		// ctx.fillStyle = 'blue';
		// ctx.fillRect(this.position.x, this.position.y, this.width, 64);

		// ctx.beginPath();
		// ctx.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2);
		// ctx.fillStyle = 'rgba(0, 0, 255, 0.2)';
		// ctx.fill();
	}
}

export default Building;
