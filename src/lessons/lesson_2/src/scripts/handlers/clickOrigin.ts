import { UseCanvas } from '../canvas/canvas';

export const onClickOrigin = () => {
  const button = document.getElementsByClassName('origin')?.[0];
  button?.addEventListener('click', () => {
    const c = UseCanvas.getInstance();
    c.useOrigin();
  });
};
