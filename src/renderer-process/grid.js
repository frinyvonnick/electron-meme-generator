const ipc = require('electron').ipcRenderer
const remote = require('electron').remote
const {Menu, MenuItem} = remote

ipc.send('get-memes', {})

ipc.on('memes-sended', (e, images) => {
  document.getElementById('content').innerHTML = images.reduce((prev, next, index, arr) => {
    console.log('path : ', next.path.split('\\').join('\\\\'))
    return `${prev}
    <div class="card meme" data-index="${index}">
    <div class="img" style="background-image:url('${next.path.split('\\').join('\\\\')}')"></div>
    <h3 title="${next.title}"><span>${next.title}</span></h3>
    </div>`
  }, '')

  document.getElementById('content').innerHTML += `<div class="card" id="new-meme">
  <div class="img"></div>
  <h3><span>New</span></h3>
  </div>`
  const elements = document.getElementsByClassName('meme')
  for (var i = 0; i < elements.length; i++) {
    const element = elements[i]

    // Gère le menu contextuel sur un meme
    element.addEventListener('contextmenu', e => {
      e.preventDefault()
      let menu = new Menu()
      menu.append(new MenuItem({label: 'Save as', click (item, browserWindow) { ipc.send('save-from-grid', images[parseInt(element.getAttribute('data-index'), 10)].path) }}))
      menu.append(new MenuItem({label: 'Delete', click (item, browserWindow) { ipc.send('delete-selected-meme', images[parseInt(element.getAttribute('data-index'), 10)]) }}))
      menu.popup(remote.getCurrentWindow())
    })

    element.addEventListener('click', e => {
      ipc.send('set-selected-meme', images[parseInt(element.getAttribute('data-index'), 10)].path)
    })
  }
  document.getElementById('new-meme').addEventListener('click', () => ipc.send('open-file-dialog'))
})

ipc.on('selected-files', () => ipc.send('get-memes', {}))

ipc.on('meme-deleted', () => {
  ipc.send('get-memes', {})

  new Notification('Meme Generator', {
    body: 'Le meme a bien été supprimé'
  })
})

ipc.on('saved-file-grid', function (event, path) {
  if (!path) path = 'No path'
  new Notification('Meme Generator', {
    body: `Le meme a été sauvegardé à l'emplacement ${path}`
  })
})
