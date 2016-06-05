/**
 * Calcul le coefficient en fonction d'un largeur et d'une hauteur
 * @param  {[type]} width  [description]
 * @param  {[type]} height [description]
 * @return {[type]}        [description]
 */
exports.computeCoef = (width, height) => height / width

/**
 * Calcul la hauteur en fonction de la largeur et d'un coefficient
 * @param  {[type]} width [description]
 * @param  {[type]} coef  [description]
 * @return {[type]}       [description]
 */
exports.computeHeight = (width, coef) => coef * width

/**
 * Calcul la largeur en fonction de la hauteur et d'un coefficient
 * @param  {[type]} height [description]
 * @param  {[type]} coef   [description]
 * @return {[type]}        [description]
 */
exports.computeWidth = (height, coef) => height / coef

/**
 * Calcul la taille d'un texte à partir du coefficient entre une largeur
 * d'origine et une largeur de destination
 * @param  {[type]} destWidth [description]
 * @param  {[type]} width     [description]
 * @return {[type]}           [description]
 */
exports.computeFont = (destWidth, width) => parseInt(width / destWidth * 32, 10)

/**
 * Calcul la largeur d'un texte en pixels
 * @param  {[type]} text [description]
 * @param  {[type]} font [description]
 * @param  {[type]} size [description]
 * @return {[type]}      [description]
 */
exports.computeTextWidth = (text, font, size) => {
  const c = document.createElement('canvas')
  const ctx = c.getContext('2d')
  ctx.font = size + 'px ' + font
  return ctx.measureText(text).width
}
