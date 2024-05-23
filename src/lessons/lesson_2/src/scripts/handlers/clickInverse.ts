import { UseCanvas } from '../canvas/canvas';
import { inverse } from '../canvas/filters/inverse';

export const onClickInverse = () => {
  const button = document.getElementsByClassName('inverse')?.[0];
  button?.addEventListener('click', () => {
    const c = UseCanvas.getInstance();
    const imdt = inverse(c.imageData);
    c.applyImageData(imdt);
  });
};
