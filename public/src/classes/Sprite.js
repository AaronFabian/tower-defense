import { ctx } from '../base/global.js';
class Sprite {
    constructor(position, image, frames = {
        max: 1,
        current: 0,
        elapsed: 0,
        hold: 5,
    }, offset = { x: 0, y: 0 }) {
        this.position = position;
        this.image = image;
        this.frames = frames;
        this.offset = offset;
    }
    update() {
        this.frames.elapsed++;
        if (this.frames.elapsed % this.frames.hold === 0) {
            this.frames.current++;
            if (this.frames.current >= this.frames.max) {
                this.frames.current = 0;
            }
        }
    }
    render() {
        const cropWidth = this.image.width / this.frames.max;
        const crop = {
            position: {
                x: cropWidth * this.frames.current,
                y: 0,
            },
            width: cropWidth,
            height: this.image.height,
        };
        ctx.drawImage(
        // src
        this.image, 
        // the square
        crop.position.x, crop.position.y, crop.width, crop.height, 
        // .
        this.position.x + this.offset.x, this.position.y + this.offset.y, crop.width, crop.height);
    }
}
export default Sprite;
