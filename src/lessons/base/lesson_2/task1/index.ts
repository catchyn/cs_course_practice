import { CanvasUtils } from '../../../../utils/canvas.js';

function grayscale(value: string): Promise<HTMLCanvasElement>;
function grayscale(value: HTMLCanvasElement): HTMLCanvasElement;
function grayscale(
  value: string | HTMLCanvasElement,
): Promise<HTMLCanvasElement> | HTMLCanvasElement {
  if (typeof value === 'string') {
    return new Promise((resolve) => {
      CanvasUtils.applyEffect(CanvasUtils.grayscaleEffect, value).then((canvas) => resolve(canvas));
    });
  } else {
    return CanvasUtils.applyEffect(CanvasUtils.grayscaleEffect, value);
  }
}

function inverse(value: string): Promise<HTMLCanvasElement>;
function inverse(value: HTMLCanvasElement): HTMLCanvasElement;
function inverse(
  value: string | HTMLCanvasElement,
): Promise<HTMLCanvasElement> | HTMLCanvasElement {
  if (typeof value === 'string') {
    return new Promise((resolve) => {
      CanvasUtils.applyEffect(CanvasUtils.inverseEffect, value).then((imageData) =>
        resolve(imageData),
      );
    });
  } else {
    return CanvasUtils.applyEffect(CanvasUtils.inverseEffect, value);
  }
}

function render(value: string): Promise<HTMLCanvasElement>;
function render(value: HTMLCanvasElement): HTMLCanvasElement;
function render(value: string | HTMLCanvasElement): Promise<HTMLCanvasElement> | HTMLCanvasElement {
  if (typeof value === 'string') {
    return new Promise((resolve) => {
      CanvasUtils.applyEffect((imageData) => imageData, value).then((imageData) =>
        resolve(imageData),
      );
    });
  } else {
    return CanvasUtils.applyEffect((imageData) => imageData, value);
  }
}

async function load() {
  const container = document.getElementsByClassName('Container')[0];
  let canvas = await render('./sand.jpg');
  container.appendChild(canvas);
  canvas = await inverse('./sand.jpg');
  container.appendChild(canvas);
  canvas = await grayscale('./sand.jpg');
  container.appendChild(canvas);
  canvas = await render('./sand.jpg');
  container.appendChild(grayscale(inverse(canvas)));
}

load().then();
