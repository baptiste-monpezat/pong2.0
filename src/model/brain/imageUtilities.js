export const imgToPixelArray = (img) => {
  // image image, bitmap, or canvas
  let imgWidth
  let imgHeight
  let inputImg

  if (
    img instanceof HTMLImageElement ||
    img instanceof HTMLCanvasElement ||
    img instanceof HTMLVideoElement ||
    img instanceof ImageData
  ) {
    inputImg = img
  } else if (
    typeof img === 'object' &&
    (img.elt instanceof HTMLImageElement ||
      img.elt instanceof HTMLCanvasElement ||
      img.elt instanceof HTMLVideoElement ||
      img.elt instanceof ImageData)
  ) {
    inputImg = img.elt // Handle p5.js image
  } else if (
    typeof img === 'object' &&
    img.canvas instanceof HTMLCanvasElement
  ) {
    inputImg = img.canvas // Handle p5.js image
  } else {
    inputImg = img
  }

  if (inputImg instanceof HTMLVideoElement) {
    // should be videoWidth, videoHeight?
    imgWidth = inputImg.width
    imgHeight = inputImg.height
  } else {
    imgWidth = inputImg.width
    imgHeight = inputImg.height
  }

  const canvas = document.createElement('canvas')
  canvas.width = imgWidth
  canvas.height = imgHeight

  const ctx = canvas.getContext('2d')
  ctx.drawImage(inputImg, 0, 0, imgWidth, imgHeight)

  const imgData = ctx.getImageData(0, 0, imgWidth, imgHeight)
  return Array.from(imgData.data)
}
