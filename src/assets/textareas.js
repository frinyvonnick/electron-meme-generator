/**
 * Positionne un textarea relativement à l'image en cours d'édition
 * @param  {[type]}  el    [description]
 * @param  {Boolean} isTop [description]
 * @param  {[type]}  rect  [description]
 * @return {[type]}        [description]
 */
exports.setTextareaPosition = (el, isTop, rect, fontSize) => {
  const textarea = el.getElementsByTagName('textarea')[0]
  el.style.height = parseInt((fontSize * 3), 10) + 'px'
  textarea.style.fontSize = fontSize + 'px'
  textarea.style.lineHeight = fontSize * 1.5 + 'px'
  if (isTop) {
    el.style.top = parseInt(rect.top, 10) + 'px'
  } else {
    el.style.top = `${parseInt(rect.bottom - el.getBoundingClientRect().height, 10)}px`
  }
  el.style.left = `${parseInt(rect.left, 10)}px`
  el.style.right = '0'
}

/**
* Limite le nombre de lignes dans un textarea
* @param  {[type]} textarea [description]
* @return {[type]}          [description]
*/
exports.limitTextarea = (textarea) => {
  const lines = textarea.value.split('\n')
  const limit = textarea.getAttribute('rows')
  const spaces = textarea.getAttribute('cols')

  for (var i = 0; i < lines.length; i++) {
    if (lines[i].length <= spaces) continue
    var j = 0
    var space = spaces
    while (j++ <= spaces) {
      if (lines[i].charAt(j) === ' ') space = j
    }
    lines[i + 1] = lines[i].substring(space + 1) + (lines[i + 1] || '')
    lines[i] = lines[i].substring(0, space)
  }

  if (lines.length > limit) {
    textarea.style.color = 'red'
    setTimeout(function () {
      textarea.style.color = ''
    }, 500)
  }
  textarea.value = lines.slice(0, limit).join('\n')
}
