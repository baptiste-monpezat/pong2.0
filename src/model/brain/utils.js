export const callCallback = (promise, callback) => {
  if (callback) {
    promise
      .then((result) => {
        callback(undefined, result)
        return result
      })
      .catch((error) => {
        callback(error)
        return error
      })
  }
  return promise
}

export const saveBlob = async (data, name, type) => {
  const link = document.createElement('a')
  link.style.display = 'none'
  document.body.appendChild(link)
  const blob = new Blob([data], { type })
  link.href = URL.createObjectURL(blob)
  link.download = name
  link.click()
}

export const randomGaussian = (mean = 0, sd = 1) => {
  let y1
  let y2
  let x1
  let x2
  let w
  let previous
  if (previous) {
    y1 = y2
    previous = false
  } else {
    do {
      x1 = randomFloat(0, 2) - 1
      x2 = randomFloat(0, 2) - 1
      w = x1 * x1 + x2 * x2
    } while (w >= 1)
    w = Math.sqrt((-2 * Math.log(w)) / w)
    y1 = x1 * w
    y2 = x2 * w
    previous = true
  }
  return y1 * sd + mean
}
