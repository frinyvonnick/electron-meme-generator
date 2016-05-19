const ipc = require('electron').ipcRenderer
const remote = require('electron').remote
const {Menu, MenuItem} = remote

let menu = new Menu()

menu.append(new MenuItem({label: 'Delete', click (item, browserWindow) { console.log('on va delete...') }}))

ipc.send('get-templates', {})

ipc.on('templates-sended', (e, images) => {
  document.getElementById('content').innerHTML = images.reduce((prev, next, index, arr) =>
  `${prev}
  <div class="card template">
  <div class="img" style="background-image:url('${next.path}')"></div>
  <h3 title="${next.title}"><span>${next.title}</span></h3>
  </div>`, '')
  document.getElementById('content').innerHTML += `<div class="card" id="new-template">
  <div class="img"></div>
  <h3><span>New</span></h3>
  </div>`
  const elements = document.getElementsByClassName('template')
  for (var i = 0; i < elements.length; i++) {
    const element = elements[i]
    element.addEventListener('contextmenu', e => {
      e.preventDefault()
      menu.popup(remote.getCurrentWindow())
    })
  }
  document.getElementById('new-template').addEventListener('click', () => ipc.send('open-file-dialog'))
})
ipc.on('selected-files', () => ipc.send('get-templates', {}))
