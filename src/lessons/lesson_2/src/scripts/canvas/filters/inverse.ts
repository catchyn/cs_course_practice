export const inverse = (imageData: ImageData): ImageData => {
  const dataArray = new Uint8ClampedArray(imageData.data.buffer);
  for (let i = 0; i < dataArray.length; i += 4) {
    dataArray[i] = 255 - dataArray[i];
    dataArray[i + 1] = 255 - dataArray[i + 1];
    dataArray[i + 2] = 255 - dataArray[i + 2];
  }
  imageData.data.set(dataArray);
  return imageData;
};
