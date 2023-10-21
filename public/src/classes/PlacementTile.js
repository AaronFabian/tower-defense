import { TILE_SIZE, ctx } from '../base/global.js';
class PlacementTile {
    constructor(world, position) {
        this.world = world;
        this.position = position;
        this.window = window;
        this.size = TILE_SIZE;
        this.color = 'rgba(255, 255, 255, 0.15)';
        this.isOccupied = false;
    }
    update() {
        const mouse = this.world.mouse;
        if (mouse.x > this.position.x &&
            mouse.x < this.position.x + this.size &&
            mouse.y > this.position.y &&
            mouse.y < this.position.y + this.size) {
            this.color = 'white';
        }
        else
            this.color = 'rgba(255, 255, 255, 0.15)';
    }
    render() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, this.size, this.size);
    }
}
export default PlacementTile;
