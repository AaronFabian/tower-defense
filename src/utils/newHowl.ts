import { Howl } from '../base/global.js';

export function newHowl(src: string, loop: boolean = false): any {
	return new Howl({
		src: [src],
		loop: loop,
	});
}
