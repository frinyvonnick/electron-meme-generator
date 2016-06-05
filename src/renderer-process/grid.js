const ipc = require('electron').ipcRenderer
const remote = require('electron').remote
const {Menu, MenuItem} = remote

ipc.send('get-memes', {})

ipc.on('memes-sended', (e, images) => {
  document.getElementById('content').innerHTML = images.reduce((prev, next, index, arr) => {
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

    element.addEventListener('click', e => {
      ipc.send('set-selected-meme', images[parseInt(element.getAttribute('data-index'), 10)].path)
    })
  }
  document.getElementById('new-meme').addEventListener('click', () => ipc.send('open-file-dialog'))
})

ipc.on('selected-files', () => ipc.send('get-memes', {}))
