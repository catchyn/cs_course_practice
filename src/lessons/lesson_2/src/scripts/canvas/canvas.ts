export class UseCanvas {
  static _instance: UseCanvas | undefined;
  id = '';
  private readonly _ctx: CanvasRenderingContext2D;
  imageCoords: { x: number; y: number; w: number; h: number };
  _origin: ImageData | undefined;

  constructor(id: string) {
    this.id = id;
    this._ctx = this.getElement().getContext('2d');
    this.imageCoords = {
      x: 0,
      y: 0,
      w: this._ctx.canvas.width,
      h: this._ctx.canvas.height,
    };
  }

  getElement(): HTMLCanvasElement {
    return document.getElementById(this.id) as HTMLCanvasElement;
  }

  get context() {
    return this._ctx;
  }

  drawImage(img, x, y, w, h) {
    this.coords = { x, y, w, h };
    this._ctx.drawImage(img, x, y, w, h);
    this._origin = this._ctx.getImageData(x, y, w, h);
  }

  set coords(coords) {
    this.imageCoords = coords;
  }

  get coords() {
    return this.imageCoords;
  }

  get imageData() {
    const { x, y, w, h } = this.coords;
    return this._ctx.getImageData(x, y, w, h);
  }

  useOrigin() {
    this.applyImageData(this._origin);
  }

  applyImageData(imageData: ImageData) {
    const { x, y } = this.coords;
    this._ctx.putImageData(imageData, x, y);
  }

  static getInstance(id?: string) {
    if (UseCanvas._instance) {
      return UseCanvas._instance;
    }
    if (!id) {
      throw new Error('Передайте id');
    }
    UseCanvas._instance = new UseCanvas(id);
  }
}

export const addImageToCanvas = (file: File) => {
  const img = new Image();
  img.sizes = 'contain';
  img.onload = function () {
    const useCanvas = UseCanvas.getInstance();
    const canvas = useCanvas.getElement();
    const delh = img.height / img.width;
    const cw = canvas.width;
    const ch = canvas.height;
    let calch = delh * cw;
    let calcw = cw;
    let dx = 0;
    let dy = 0;
    if (calch > ch) {
      calcw = (1 / delh) * ch;
      calch = ch;
    }
    if (calcw < cw) {
      dx = (cw - calcw) / 2;
    }
    if (calch < ch) {
      dy = (ch - calch) / 2;
    }
    useCanvas.drawImage(img, dx, dy, calcw, calch);
  };
  img.src = URL.createObjectURL(file);
};
