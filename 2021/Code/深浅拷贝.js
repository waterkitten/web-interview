function deepCopy(obj) {
  if (!obj && obj !== 'object') {
    throw new Error('error arguments')
  }
  const targetObj = Array.isArray(obj) ? [] : {}
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      if (object[key] && typeof obj[key] === 'object') {
        targetObj[key] = deepCopy(obj[key])
      } else {
        targetObj[key] = obj[key]
      }
    }
  }
  return targetObj
}