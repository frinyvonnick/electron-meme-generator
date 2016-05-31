const {ipcRenderer, remote} = require('electron')

const img = document.getElementById('meme')

// On envoit une demande de récupération d'informations sur le template selectionné
ipcRenderer.send('get-selected-meme', {})

// On receptionne les informations du template selectionné
ipcRenderer.on('selected-meme-sended', (e, i) => {
  img.setAttribute('src', i)
})

// Action effectuée au click sur le bouton précédent
document.getElementById('previous').onclick = () => remote.getCurrentWindow().close()
