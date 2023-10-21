import { newImage } from '../utils/newImage.js';
import { newHowl as newSound } from '../utils/newHowl.js';
console.clear(); // remove annoying browser extension error (dev purpose)
// dependencies
export const Howl = window.Howl;
export const TWEEN = window.TWEEN;
// constants
export const canvas = document.getElementById('canvas');
export const ctx = canvas.getContext('2d');
export const TILE_SIZE = 64;
// window . global
const gTextures = new Map();
gTextures.set('explosion', newImage('../../asset/explosion.png'));
gTextures.set('game-map', newImage('../../asset/gameMap.png'));
gTextures.set('projectile', newImage('../../asset/projectile.png'));
gTextures.set('orc', newImage('../../asset/orc.png'));
gTextures.set('tower', newImage('../../asset/tower.png'));
const gSounds = new Map();
gSounds.set('field-battle', newSound('../../sounds/field_battle.wav', true));
gSounds.set('game-over', newSound('../../sounds/game_over.ogg'));
gSounds.set('rock-break', newSound('../../sounds/rock_break.ogg'));
gSounds.set('player-get-hit', newSound('../../sounds/player_get_hit.mp3'));
gSounds.set('start-song', newSound('../../sounds/start_song.mp3', true));
window.gTextures = gTextures;
window.gSounds = gSounds;
