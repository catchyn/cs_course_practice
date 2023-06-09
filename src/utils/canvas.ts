export class CanvasUtils {
  static getCanvasContext(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
    const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Нет контекста');
    }
    return ctx;
  }

  static inverseEffect(imageData: ImageData): ImageData {
    for (let i = 0; i < imageData.data.length; i = i + 4) {
      imageData.data[i] = (255 - imageData.data[i]) >> 0;
      imageData.data[i + 1] = (255 - imageData.data[i + 1]) >> 0;
      imageData.data[i + 2] = (255 - imageData.data[i + 2]) >> 0;
    }
    return imageData;
  }

  static grayscaleEffect(imageData: ImageData): ImageData {
    for (let i = 0; i < imageData.data.length; i = i + 4) {
      const newColor =
        (0.3 * imageData.data[i] + 0.59 * imageData.data[i + 1] + 0.11 * imageData.data[i + 2]) >>
        0;
      imageData.data[i] = newColor;
      imageData.data[i + 1] = newColor;
      imageData.data[i + 2] = newColor;
    }
    return imageData;
  }

  static getImageData(canvas: HTMLCanvasElement, path: string): Promise<ImageData>;
  static getImageData(canvas: HTMLCanvasElement, path: undefined): ImageData;
  static getImageData(
    canvas: HTMLCanvasElement,
    path: string | undefined,
  ): Promise<ImageData> | ImageData {
    const ctx = this.getCanvasContext(canvas);
    if (typeof path === 'string') {
      return new Promise((resolve) => {
        const image = new Image();
        image.onload = function () {
          canvas.width = image.width;
          canvas.height = image.height;
          ctx.drawImage(image, 0, 0);
          resolve(ctx.getImageData(0, 0, image.width, image.height));
        };
        image.src = path;
      });
    } else {
      return ctx.getImageData(0, 0, canvas.width, canvas.height);
    }
  }

  static applyEffect(
    effect: (imageData: ImageData) => ImageData,
    value: string,
  ): Promise<HTMLCanvasElement>;
  static applyEffect(
    effect: (imageData: ImageData) => ImageData,
    value: HTMLCanvasElement,
  ): HTMLCanvasElement;
  static applyEffect(
    effect: (imageData: ImageData) => ImageData,
    value: string | HTMLCanvasElement,
  ): Promise<HTMLCanvasElement> | HTMLCanvasElement {
    if (typeof value === 'string') {
      return new Promise((resolve) => {
        const canvas = document.createElement('canvas');
        this.getImageData(canvas, value).then((imageData) => {
          const ctx = this.getCanvasContext(canvas);
          ctx?.putImageData(effect(imageData), 0, 0);
          resolve(canvas);
        });
      });
    } else {
      const ctx = this.getCanvasContext(value);
      ctx?.putImageData(effect(this.getImageData(value, undefined)), 0, 0);
      return value;
    }
  }
}
