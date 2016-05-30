/**
* Positionne un textarea relativement à l'image en cours d'édition
* @param  {[type]}  el             [description]
* @param  {Boolean} isTop          [description]
* @param  {[type]}  rect           [description]
* @param  {[type]}  containerWidth [description]
* @return {[type]}                 [description]
*/
exports.setTextareaPosition = (el, isTop, rect, containerWidth) => {
  el.style.height = (rect.height / 4) + 'px'
  el.getElementsByTagName('textarea')[0].style.fontSize = ((rect.height / 4) / 3) + 'px'
  if (isTop) {
    el.style.top = rect.top + 'px'
  } else {
    el.style.top = `${rect.bottom - el.getBoundingClientRect().height}px`
  }
  el.style.left = `${rect.left}px`
  el.style.right = `${containerWidth - (rect.left + rect.width)}px`
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
