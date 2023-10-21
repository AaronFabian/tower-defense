export function newImage(src: string): HTMLImageElement {
	const image: HTMLImageElement = new Image();
	image.src = src;

	return image;
}
