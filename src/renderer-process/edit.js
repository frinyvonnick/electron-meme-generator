const {ipcRenderer, remote} = require('electron')
const {setTextareaPosition, limitTextarea} = require('../assets/textareas')

// Tableau contenant les informations relatives aux deux textareas
const textareas = [
  {
    element: document.getElementsByClassName('top')[0],
    isTop: true,
    text: 'Insert text here'
  },
  {
    element: document.getElementsByClassName('bottom')[0],
    isTop: false,
    text: 'Insert text here'
  }
]

// Le conteneur parent de l'image et des textareas
const editor = document.getElementsByClassName('editor')[0]
const img = editor.getElementsByTagName('img')[0]

/**
* Positionne l'ensemble des textareas
* @return {[type]} [description]
*/
const setTextareasPosition = () => {
  const containerWidth = editor.getBoundingClientRect().width
  const rect = img.getBoundingClientRect()
  textareas.map((t) => {
    setTextareaPosition(t.element, t.isTop, rect, containerWidth)
  })
}

// On envoit une demande de récupération d'informations sur le template selectionné
ipcRenderer.send('get-selected-meme', {})

// On receptionne les informations du template selectionné
ipcRenderer.on('selected-meme-sended', (e, i) => {
  img.onload = () => {
    setTextareasPosition(img, textareas, editor)
    // On initialise le contenu des textareas
    textareas.map((t, index) => {
      t.element.getElementsByTagName('textarea')[0].value = t.text
    })
  }

  img.setAttribute('src', i.path)
})

// Au resize de la fenêtre on repositionne les textareas
window.onresize = () => {
  setTextareasPosition(img, textareas, editor)
}

window.onload = () => {
  // Fix pour focus le premier textarea
  setTimeout(() => {
    textareas[0].element.getElementsByTagName('textarea')[0].focus()
  }, 50)
}

// On limite le nombre de ligne et de caractères dans les textareas
textareas.map((t) => {
  t.element.onkeyup = e => limitTextarea(e.srcElement)
})

// Action effectuée au click sur le bouton précédent
document.getElementById('previous').onclick = () => remote.getCurrentWindow().close()
