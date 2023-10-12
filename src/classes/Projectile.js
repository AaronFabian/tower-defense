import Sprite from './Sprite.js';

class Projectile extends Sprite {
	constructor({ position = { x: 0, y: 0 }, enemy }) {
		super({ position, imageSrc: '/asset/projectile.png' });
		this.velocity = {
			x: 0,
			y: 0,
		};
		this.enemy = enemy;
		this.radius = 10;
		this.image = new Image();
		this.image.src = '/asset/projectile.png';
	}

	update() {
		this.draw();

		const angle = Math.atan2(this.enemy.center.y - this.position.y, this.enemy.center.x - this.position.x);
		const power = 2;

		this.velocity.x = Math.cos(angle) * power;
		this.velocity.y = Math.sin(angle) * power;

		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;
	}

	// from super class
	// draw() {
	// 	ctx.drawImage(this.image, this.position.x, this.position.y);

	// 	// debug code
	// 	// ctx.beginPath();
	// 	// ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
	// 	// ctx.fillStyle = 'orange';
	// 	// ctx.fill();
	// }
}

export default Projectile;
