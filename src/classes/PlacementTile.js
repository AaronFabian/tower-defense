class PlacementTile {
	constructor({ position = { x: 0, y: 0 } }) {
		this.position = position;
		this.size = TILE_SIZE;
		this.color = 'rgba(255, 255, 255, 0.15)';
		this.occupied = false;
	}

	update(mouse) {
		if (
			mouse.x > this.position.x &&
			mouse.x < this.position.x + this.size &&
			mouse.y > this.position.y &&
			mouse.y < this.position.y + this.size
		) {
			this.color = 'white';
		} else this.color = 'rgba(255, 255, 255, 0.15)';
	}

	draw() {
		ctx.fillStyle = this.color;
		ctx.fillRect(this.position.x, this.position.y, this.size, this.size);
	}
}

export default PlacementTile;
