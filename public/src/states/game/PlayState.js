import { TILE_SIZE, canvas, ctx } from '../../base/global.js';
import BaseState from '../BaseState.js';
import Building from '../../classes/Building.js';
import Enemy from '../../classes/Enemy.js';
import placementTilesData from '../../base/placementTilesData.js';
import PlacementTile from '../../classes/PlacementTile.js';
import wayPoints from '../../base/wayPoints.js';
import PauseState from './PauseState.js';
import GameOverState from './GameOverState.js';
class PlayState extends BaseState {
    constructor() {
        super();
        this.window = window;
        this.image = this.window.gTextures.get('game-map');
        this.buildings = [];
        this.enemies = [];
        this.explosions = [];
        this.activeTile = null;
        this.coins = 125;
        this.currentWaves = 1;
        this.enemyCount = 3;
        this.hearts = 5;
        const placementTilesData2D = [];
        for (let i = 0; i < placementTilesData.length; i += 20) {
            placementTilesData2D.push(placementTilesData.slice(i, i + 20));
        }
        this.placementTiles = [];
        placementTilesData2D.forEach((row, y) => {
            row.forEach((symbol, x) => {
                // symbol . col
                if (symbol === 14) {
                    // add building placement tile here
                    const position = { x: x * TILE_SIZE, y: y * TILE_SIZE };
                    this.placementTiles.push(new PlacementTile(this, position));
                }
            });
        });
        // first wave
        this.spawnEnemies(this.enemyCount);
        this.mouse = {
            x: 0,
            y: 0,
        };
        canvas.addEventListener('click', this.handleCanvasClick.bind(this));
        window.addEventListener('mousemove', this.handleMouseDown.bind(this), false);
    }
    enter(params) {
        this.window.gSounds.get('field-battle').play();
    }
    update() {
        if (this.window.wasPressed('Enter')) {
            const fieldSong = this.window.gSounds.get('field-battle');
            fieldSong.pause();
            this.window.gStateStack.push(new PauseState(() => fieldSong.play()));
        }
        for (let i = this.enemies.length - 1; i >= 0; i--) {
            const enemy = this.enemies[i];
            enemy.update();
        }
        for (let i = 0; i < this.placementTiles.length; i++) {
            const placementTile = this.placementTiles[i];
            placementTile.update();
        }
        for (let i = 0; i < this.buildings.length; i++) {
            const building = this.buildings[i];
            building.update();
        }
        for (let i = this.explosions.length - 1; i >= 0; i--) {
            const explosion = this.explosions[i];
            explosion.update();
            if (explosion.frames.current >= explosion.frames.max - 1) {
                this.explosions.splice(i, 1);
            }
        }
        // game over if health is 0
        if (this.hearts === 0) {
            const fieldSong = this.window.gSounds.get('field-battle');
            this.window.gStateStack.push(new GameOverState(() => fieldSong.stop()));
        }
        // tracking total amount of enemies if 0 then go next waves
        if (this.enemies.length === 0) {
            this.currentWaves++;
            this.enemyCount += 2;
            this.spawnEnemies(this.enemyCount);
        }
    }
    render() {
        ctx.drawImage(this.image, 0, 0);
        for (let i = this.enemies.length - 1; i >= 0; i--) {
            const enemy = this.enemies[i];
            enemy.render();
        }
        for (let i = 0; i < this.placementTiles.length; i++) {
            const placementTile = this.placementTiles[i];
            placementTile.render();
        }
        for (let i = 0; i < this.buildings.length; i++) {
            const building = this.buildings[i];
            building.render();
            for (let j = building.projectiles.length - 1; j >= 0; j--) {
                const projectile = building.projectiles[j];
                projectile.render();
            }
        }
        for (let i = this.explosions.length - 1; i >= 0; i--) {
            const explosion = this.explosions[i];
            explosion.render();
        }
        ctx.font = '36px Comic Sans MS';
        ctx.fillStyle = 'white';
        ctx.fillText('Waves : ' + this.currentWaves, 10, 36);
    }
    spawnEnemies(spawnCount) {
        for (let i = 1; i < spawnCount + 1; i++) {
            const xOffset = i * 150;
            const position = { x: wayPoints[0].x - xOffset, y: wayPoints[0].y };
            this.enemies.push(new Enemy(this, position));
        }
    }
    handleCanvasClick(_) {
        if (this.activeTile && !this.activeTile.isOccupied && this.coins - 50 >= 0) {
            this.coins -= 50;
            document.getElementById('coins').innerHTML = this.coins.toString();
            const position = { x: this.activeTile.position.x, y: this.activeTile.position.y };
            this.buildings.push(new Building(this, position));
            this.activeTile.isOccupied = true;
            this.buildings.sort((a, b) => a.position.y - b.position.y);
        }
    }
    handleMouseDown(event) {
        this.mouse.x = event.clientX;
        this.mouse.y = event.clientY;
        this.activeTile = null;
        for (let i = 0; i < this.placementTiles.length; i++) {
            const tile = this.placementTiles[i];
            if (this.mouse.x > tile.position.x &&
                this.mouse.x < tile.position.x + tile.size &&
                this.mouse.y > tile.position.y &&
                this.mouse.y < tile.position.y + tile.size) {
                this.activeTile = tile;
                break;
            }
        }
    }
    exit() {
        this.window.gSounds.get('field-battle').stop();
        canvas.removeEventListener('click', this.handleCanvasClick);
        window.removeEventListener('mousemove', this.handleMouseDown);
    }
}
export default PlayState;
