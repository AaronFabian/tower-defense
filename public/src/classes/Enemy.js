import { ctx } from '../base/global.js';
import wayPoints from '../base/wayPoints.js';
import Sprite from './Sprite.js';
class Enemy extends Sprite {
    constructor(world, position) {
        const orcImage = window.gTextures.get('orc');
        const frames = {
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
        this.center = {
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height / 2,
        };
        this.velocity = {
            x: 0,
            y: 0,
        };
    }
    update() {
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
        this.center = {
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height / 2,
        };
        if (Math.abs(Math.round(this.center.x) - Math.round(wayPoint.x)) < Math.abs(this.velocity.x) &&
            Math.abs(Math.round(this.center.y) - Math.round(wayPoint.y)) < Math.abs(this.velocity.y) &&
            this.wayPointIndex < wayPoints.length - 1) {
            this.wayPointIndex++;
        }
        //
        // -100 off screen at Y coordinate
        if (this.position.y < -100) {
            const index = this.world.enemies.indexOf(this);
            this.world.enemies.splice(index, 1);
            this.world.hearts -= 1;
            window.gSounds.get('player-get-hit').play();
            document.getElementById('hearts').innerHTML = this.world.hearts.toString();
        }
    }
    render() {
        super.render(); // will responsible for sprite animation rendering
        // health bar
        ctx.fillStyle = 'red';
        ctx.fillRect(this.position.x, this.position.y - 15, this.width, 10);
        ctx.fillStyle = 'green';
        ctx.fillRect(this.position.x, this.position.y - 15, this.width * (this.health / 100), 10);
    }
}
export default Enemy;
