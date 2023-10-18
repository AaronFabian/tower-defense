import BaseState from '../BaseState.js';
import placementTilesData from '../../base/placementTilesData.js';
import PlacementTile from '../../classes/PlacementTile.js';
import Enemy from '../../classes/Enemy.js';
import wayPoints from '../../base/wayPoints.js';
import Building from '../../classes/Building.js';
import Sprite from '../../classes/Sprite.js';
import GameOverState from './GameOverState.js';
import newImage from '../../utils/newImage.js';
import PauseState from './PauseState.js';

class PlayState extends BaseState {
	constructor() {
		super();

		this.image = gTextures['game-map'];

		const placementTilesData2D = [];
		for (let i = 0; i < placementTilesData.length; i += 20) {
			placementTilesData2D.push(placementTilesData.slice(i, i + 20));
		}

		this.placementTiles = [];
		placementTilesData2D.forEach((row, y) => {
			row.forEach((symbol, x) => {
				// symbol / col
				if (symbol === 14) {
					// add building placement tile here
					this.placementTiles.push(
						new PlacementTile({
							position: {
								x: x * TILE_SIZE,
								y: y * TILE_SIZE,
							},
						})
					);
				}
			});
		});

		this.enemies = [];
		this.buildings = [];
		this.explosions = [];
		this.activeTile = undefined;
		this.currentWaves = 1;
		this.enemyCount = 3;
		this.hearts = 5;
		this.coins = 125;

		// first wave
		this.spawnEnemies(this.enemyCount);

		this.mouse = {
			x: undefined,
			y: undefined,
		};

		this.handleCanvasClick = event => {
			if (this.activeTile && !this.activeTile.isOccupied && this.coins - 50 >= 0) {
				this.coins -= 50;
				document.getElementById('coins').innerHTML = this.coins;
				this.buildings.push(
					new Building({
						position: {
							x: this.activeTile.position.x,
							y: this.activeTile.position.y,
						},
						enemies: this.enemies,
					})
				);
				this.activeTile.isOccupied = true;
				this.buildings.sort((a, b) => {
					return a.position.y - b.position.y;
				});
			}
		};
		canvas.addEventListener('click', this.handleCanvasClick);

		this.handleMouseDown = event => {
			this.mouse.x = event.clientX;
			this.mouse.y = event.clientY;

			this.activeTile = null;
			for (let i = 0; i < this.placementTiles.length; i++) {
				const tile = this.placementTiles[i];
				if (
					this.mouse.x > tile.position.x &&
					this.mouse.x < tile.position.x + tile.size &&
					this.mouse.y > tile.position.y &&
					this.mouse.y < tile.position.y + tile.size
				) {
					this.activeTile = tile;
					break;
				}
			}
		};
		window.addEventListener('mousemove', this.handleMouseDown, false);
	}

	enter() {
		this.bgSound = gSounds['field-battle'].play();
	}

	spawnEnemies(spawnCount) {
		for (let i = 1; i < spawnCount + 1; i++) {
			const xOffset = i * 150;
			this.enemies.push(new Enemy({ position: { x: wayPoints[0].x - xOffset, y: wayPoints[0].y } }));
		}
	}

	update() {
		if (window.wasPressed('Enter')) {
			gSounds['pause-button-pressed'].stop();
			gSounds['pause-button-pressed'].play();

			gSounds['field-battle'].pause();
			window.gStateStack.push(new PauseState());
		}

		for (let i = this.enemies.length - 1; i >= 0; i--) {
			const enemy = this.enemies[i];
			enemy.update();

			// 100 is enemy height
			if (enemy.position.y < -100) {
				gSounds['player-get-hit'].play();
				this.hearts -= 1;
				this.enemies.splice(i, 1);
				document.getElementById('hearts').innerHTML = this.hearts;
			}
		}

		if (this.hearts === 0) {
			console.log('game over');
			gSounds['field-battle'].stop();
			window.gStateStack.push(new GameOverState());
		}

		// explosions
		for (let i = this.explosions.length - 1; i >= 0; i--) {
			const explosion = this.explosions[i];
			explosion.update();

			if (explosion.frames.current >= explosion.frames.max - 1) {
				this.explosions.splice(i, 1);
			}
		}

		this.placementTiles.forEach(tile => tile.update(this.mouse));

		this.buildings.forEach(building => {
			building.update();

			building.target = null;
			const validEnemies = this.enemies.filter(enemy => {
				const xDifference = enemy.center.x - building.position.x;
				const yDifference = enemy.center.y - building.position.y;
				const distance = Math.hypot(xDifference, yDifference);

				return distance < enemy.radius + building.radius;
			});

			building.target = validEnemies[0];

			for (let i = building.projectiles.length - 1; i >= 0; i--) {
				const projectile = building.projectiles[i];
				projectile.update();

				const xDifference = projectile.enemy.center.x - projectile.position.x;
				const yDifference = projectile.enemy.center.y - projectile.position.y;
				const distance = Math.hypot(xDifference, yDifference);

				// this when a projectile hits an enemy
				if (distance < projectile.enemy.radius + projectile.radius) {
					// enemy health and enemy removal
					projectile.enemy.health -= 20;
					if (projectile.enemy.health <= 0) {
						const enemyIndex = this.enemies.findIndex(enemy => {
							return projectile.enemy === enemy;
						});

						if (enemyIndex > -1) {
							this.enemies.splice(enemyIndex, 1);
							this.coins += 25;
							document.getElementById('coins').innerHTML = this.coins;
						}
					}

					// remove the projectiles from game
					gSounds['rock-break'].stop();
					gSounds['rock-break'].play();
					this.explosions.push(
						new Sprite({
							position: { x: projectile.position.x, y: projectile.position.y },
							imageSrc: gTextures['explosion'],
							frames: { max: 4 },
							offset: { x: 0, y: 0 },
						})
					);

					building.projectiles.splice(i, 1);
				}
			}
		});

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
			enemy.draw();
		}

		for (let i = this.explosions.length - 1; i >= 0; i--) {
			const explosion = this.explosions[i];
			explosion.draw();
		}

		for (let i = 0; i <= this.placementTiles.length - 1; i++) {
			const tile = this.placementTiles[i];
			tile.draw();
		}

		for (let i = 0; i <= this.buildings.length - 1; i++) {
			const building = this.buildings[i];
			building.draw();

			for (let i = building.projectiles.length - 1; i >= 0; i--) {
				const projectile = building.projectiles[i];
				projectile.draw();
			}
		}

		ctx.font = 'bold 30px Comic Sans MS';
		ctx.fillStyle = 'black';
		ctx.lineWidth = 5;
		ctx.strokeText('Waves : ' + this.currentWaves, 10, 32);

		ctx.fillStyle = 'white';
		ctx.fillText('Waves : ' + this.currentWaves, 10, 32);
	}

	exit() {
		gSounds['field-battle'].stop();
		canvas.removeEventListener('click', this.handleCanvasClick);
		window.removeEventListener('mousemove', this.handleMouseDown);
	}
}

export default PlayState;
