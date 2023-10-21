import { Howl } from '../base/global.js';
export function newHowl(src, loop = false) {
    return new Howl({
        src: [src],
        loop: loop,
    });
}
