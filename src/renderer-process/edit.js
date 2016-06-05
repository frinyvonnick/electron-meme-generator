const {ipcRenderer, remote} = require('electron')
const {setTextareaPosition, limitTextarea} = require('../assets/textareas')
const {computeCoef, computeHeight, computeFont} = require('../assets/compute')

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
const wrapper = document.getElementById('wrapper')
const img = editor.getElementsByTagName('img')[0]

/**
* Positionne l'ensemble des textareas
* @return {[type]} [description]
*/
const setTextareasPosition = (wrapper, textareas, fontSize) => {
  textareas.map((t) => {
    setTextareaPosition(t.element, t.isTop, wrapper, fontSize)
  })
}

// On envoit une demande de récupération d'informations sur le template selectionné
ipcRenderer.send('get-new-meme', {})

// On receptionne les informations du template selectionné
ipcRenderer.on('new-meme-sended', (e, i) => {
  // Au chargement de l'image on effectue son redimenssionnement et son
  // positionement puis on dispose les textareas
  img.onload = () => {
    let wrapperRect = wrapper.getBoundingClientRect()
    const fontSize = computeFont(1024, wrapperRect.width)

    // On va cropper l'image pour qu'elle rentre dans le format d'image choisi
    // On calcule la hauteur du wrapper par rapport à sa largeur
    const wrapperHeight = parseInt(computeHeight(wrapperRect.width, computeCoef(16, 9)), 10)
    wrapper.style.height = wrapperHeight + 'px'
    wrapperRect = wrapper.getBoundingClientRect()
    // On centre l'image verticalement dans le wrapper
    img.style.top = parseInt((wrapperRect.height - img.getBoundingClientRect().height) / 2, 10) + 'px'

    // On positionne les textareas
    setTextareasPosition(wrapperRect, textareas, fontSize)
    // On initialise le contenu des textareas
    textareas.map((t, index) => {
      t.element.getElementsByTagName('textarea')[0].value = t.text
    })
  }

  img.setAttribute('src', i)
})

// Au resize de la fenêtre on repositionne les textareas
window.onresize = () => {
  setTextareasPosition(wrapper, textareas, editor)
}

window.onload = () => {
  // Fix pour focus le premier textarea
  setTimeout(() => {
    textareas[0].element.getElementsByTagName('textarea')[0].focus()
  }, 50)
}

textareas.map((t) => {
  // On limite le nombre de ligne et de caractères dans les textareas
  t.element.onkeyup = e => {
    limitTextarea(e.srcElement)
    t.text = e.srcElement.value
  }
})

// Action effectuée au click sur le bouton précédent
document.getElementById('previous').onclick = () => remote.getCurrentWindow().close()

// Action effectuée au click sur le bouton save
document.getElementById('save').onclick = () => {
  ipcRenderer.send('save-meme', textareas.map((t) => {
    return {
      isTop: t.isTop,
      text: t.text
    }
  }))
}

// On ferme la fenêtre quand le meme est saved
ipcRenderer.on('meme-saved', () => {
  const notification = new Notification('Meme Generator', {
    body: 'Le meme a bien été sauvegardé'
  })
  notification.onshow = () => {
    remote.getCurrentWindow().close()
  }
})
