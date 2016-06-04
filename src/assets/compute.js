exports.computeCoef = (width, height) => height / width

exports.computeHeight = (width, coef) => coef * width

exports.computeWidth = (height, coef) => height / coef

// 32px est la taille de font utilisé pour écrire sur le fichier
exports.computeFont = (destWidth, width) => parseInt(width / destWidth * 32, 10)
