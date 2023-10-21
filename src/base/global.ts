import { newImage } from '../utils/newImage.js';
import { newHowl as newSound } from '../utils/newHowl.js';

console.clear(); // remove annoying browser extension error (dev purpose)

// dependencies
export const Howl = (window as any).Howl;
export const TWEEN = (window as any).TWEEN;

// constants
export const canvas = document.getElementById('canvas') as HTMLCanvasElement;
export const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
export const TILE_SIZE = 64;

// window . global
const gTextures = new Map<string, HTMLImageElement>();
gTextures.set('explosion', newImage('/asset/explosion.png'));
gTextures.set('game-map', newImage('/asset/gameMap.png'));
gTextures.set('projectile', newImage('/asset/projectile.png'));
gTextures.set('orc', newImage('/asset/orc.png'));
gTextures.set('tower', newImage('/asset/tower.png'));

const gSounds = new Map<string, any>();
gSounds.set('field-battle', newSound('/sounds/field_battle.wav', true));
gSounds.set('game-over', newSound('/sounds/game_over.ogg'));
gSounds.set('rock-break', newSound('/sounds/rock_break.ogg'));
gSounds.set('player-get-hit', newSound('/sounds/player_get_hit.mp3'));
gSounds.set('start-song', newSound('/sounds/start_song.mp3', true));

(window as any).gTextures = gTextures;
(window as any).gSounds = gSounds;
