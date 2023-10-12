import Projectile from './Projectile.js';
import Sprite from './Sprite.js';

class Building extends Sprite {
	constructor({ position = { x: 0, y: 0 } }) {
		super({ position, imageSrc: '/asset/tower.png', frames: { max: 19 }, offset: { x: 0, y: -80 } });
		this.width = TILE_SIZE * 2;
		this.height = TILE_SIZE;
		this.center = {
			x: this.position.x + this.width / 2,
			y: this.position.y + this.height / 2,
		};

		this.projectiles = [];

		this.radius = 250;
		// this.target =
	}

	shoot() {
		this.projectiles.push(
			new Projectile({
				position: {
					x: this.center.x - 20,
					y: this.center.y - 110, // offset,
				},
				enemy: this.target,
			})
		);
	}

	update() {
		this.draw();
		if (this.target || (!this.target && this.frames.current !== 0)) {
			super.update();
		}

		if (this.target && this.frames.current === 6 && this.frames.elapsed % this.frames.hold === 0) this.shoot();
	}

	draw() {
		super.draw();

		// ctx.fillStyle = 'blue';
		// ctx.fillRect(this.position.x, this.position.y, this.width, 64);

		// ctx.beginPath();
		// ctx.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2);
		// ctx.fillStyle = 'rgba(0, 0, 255, 0.2)';
		// ctx.fill();
	}
}

export default Building;
