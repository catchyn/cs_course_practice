export const grayscale = (imageData: ImageData): ImageData => {
  const dataArray = new Uint8ClampedArray(imageData.data.buffer);
  for (let i = 0; i < dataArray.length; i += 4) {
    const middle = (dataArray[i] + dataArray[i + 1] + dataArray[i + 2]) / 3;
    dataArray[i] = dataArray[i + 1] = dataArray[i + 2] = middle;
  }
  imageData.data.set(dataArray);
  return imageData;
};
