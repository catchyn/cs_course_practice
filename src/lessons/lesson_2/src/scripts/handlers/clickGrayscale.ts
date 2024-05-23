import { UseCanvas } from '../canvas/canvas';
import { grayscale } from '../canvas/filters/grayscale';

export const onClickGrayscale = () => {
  const button = document.getElementsByClassName('grayscale')?.[0];
  button?.addEventListener('click', () => {
    const c = UseCanvas.getInstance();
    const imdt = grayscale(c.imageData);
    c.applyImageData(imdt);
  });
};
