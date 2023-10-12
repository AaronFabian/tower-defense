// this import here will be available in our project
import './base/global.js'; // will be in windows object

import wayPoints from './base/wayPoints.js';
import placementTilesData from './base/placementTilesData.js';

import Enemy from './classes/Enemy.js';
import Building from './classes/Building.js';
import PlacementTile from './classes/PlacementTile.js';
import Sprite from './classes/Sprite.js';

try {
	canvas.width = 1280;
	canvas.height = 769;

	const placementTilesData2D = [];
	for (let i = 0; i < placementTilesData.length; i += 20) {
		placementTilesData2D.push(placementTilesData.slice(i, i + 20));
	}

	const placementTiles = [];
	placementTilesData2D.forEach((row, y) => {
		row.forEach((symbol, x) => {
			// symbol / col
			if (symbol === 14) {
				// add building placement tile here
				placementTiles.push(
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

	// you can not pass the string, pass the html element instead
	const image = new Image();
	image.src = '../asset/gameMap.png';
	image.onload = () => {
		animate();
	};

	const enemies = [];

	function spawnEnemies(spawnCount) {
		for (let i = 1; i < spawnCount + 1; i++) {
			const xOffset = i * 150;
			enemies.push(new Enemy({ position: { x: wayPoints[0].x - xOffset, y: wayPoints[0].y } }));
		}
	}

	const buildings = [];
	let activeTile = undefined;
	let enemyCount = 3;
	let hearts = 10;
	let coins = 100;
	const explosions = [];

	// first wave
	spawnEnemies(enemyCount);

	function animate() {
		const animationID = requestAnimationFrame(animate);

		ctx.drawImage(image, 0, 0);
		for (let i = enemies.length - 1; i >= 0; i--) {
			const enemy = enemies[i];
			enemy.update();

			// 100 is enemy height
			if (enemy.position.y < -100) {
				hearts -= 1;
				enemies.splice(i, 1);
				document.getElementById('hearts').innerHTML = hearts;

				if (hearts === 0) {
					console.log('game over');
					cancelAnimationFrame(animationID);
					document.getElementById('gameOver').style.display = 'flex';
				}
			}
		}

		// tracking total amount of enemies
		if (enemies.length === 0) {
			enemyCount += 2;
			spawnEnemies(enemyCount);
		}

		// explosions
		for (let i = explosions.length - 1; i >= 0; i--) {
			const explosion = explosions[i];
			explosion.draw();
			explosion.update();

			if (explosion.frames.current > explosion.frames.max - 1) {
				explosions.splice(i, 1);
			}
		}

		placementTiles.forEach(tile => tile.update(mouse));
		buildings.forEach(building => {
			building.update();
			building.target = null;
			const validEnemies = enemies.filter(enemy => {
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
						const enemyIndex = enemies.findIndex(enemy => {
							return projectile.enemy === enemy;
						});

						if (enemyIndex > -1) {
							enemies.splice(enemyIndex, 1);
							coins += 25;
							document.getElementById('coins').innerHTML = coins;
						}
					}

					// remove the projectiles from game
					explosions.push(
						new Sprite({
							position: { x: projectile.position.x, y: projectile.position.y },
							imageSrc: '/asset/explosion.png',
							frames: { max: 4 },
							offset: { x: 0, y: 0 },
						})
					);
					building.projectiles.splice(i, 1);
				}
			}
		});
	}

	const mouse = {
		x: undefined,
		y: undefined,
	};

	canvas.addEventListener('click', event => {
		if (activeTile && !activeTile.isOccupied && coins - 50 >= 0) {
			coins -= 50;
			document.getElementById('coins').innerHTML = coins;
			buildings.push(
				new Building({
					position: {
						x: activeTile.position.x,
						y: activeTile.position.y,
					},
					enemies: enemies,
				})
			);
			activeTile.isOccupied = true;
			buildings.sort((a, b) => {
				return a.position.y - b.position.y;
			});
		}
	});

	window.addEventListener('mousemove', event => {
		mouse.x = event.clientX;
		mouse.y = event.clientY;

		activeTile = null;
		for (let i = 0; i < placementTiles.length; i++) {
			const tile = placementTiles[i];
			if (
				mouse.x > tile.position.x &&
				mouse.x < tile.position.x + tile.size &&
				mouse.y > tile.position.y &&
				mouse.y < tile.position.y + tile.size
			) {
				activeTile = tile;
				break;
			}
		}
	});
} catch (error) {
	console.error(error);
	document.title = 'FATAL ERROR';
}

// last watch 3.01.49
