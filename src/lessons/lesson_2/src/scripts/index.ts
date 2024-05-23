import { UseCanvas } from './canvas/canvas';
import '../main.css';
import { addImageHandler } from './handlers/addImage';
import { onClickGrayscale } from './handlers/clickGrayscale';
import { onClickOrigin } from './handlers/clickOrigin';
import { onClickInverse } from './handlers/clickInverse';

document.addEventListener('DOMContentLoaded', () => {
  UseCanvas.getInstance('canvas');
  addImageHandler('button_load_image');
  onClickGrayscale();
  onClickInverse();
  onClickOrigin();
});
