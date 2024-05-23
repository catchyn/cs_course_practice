import { addImageToCanvas } from '../canvas/canvas';

export const addImageHandler = (id: string) => {
  const inputs = document.getElementsByClassName(id);
  if (inputs.length < 1) {
    throw new Error('Кнопка не обнаружена');
  }
  const button = inputs[0] as HTMLInputElement;
  button.addEventListener('change', (e) => {
    const input = e.target as HTMLInputElement;
    if (input.files.length == 1) {
      const file = input.files[0];
      if (!file) {
        throw new Error('Файл не загружен');
      }
      addImageToCanvas(file);
    }
  });
};
