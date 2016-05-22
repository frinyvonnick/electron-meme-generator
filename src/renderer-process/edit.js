const {ipcRenderer, remote} = require('electron')

ipcRenderer.send('get-selected-template', {})

ipcRenderer.on('selected-template-sended', (e, i) => {
  document.getElementsByClassName('editor')[0].getElementsByTagName('img')[0].setAttribute('src', i.path)
})

document.getElementById('previous').addEventListener('click', () => remote.getCurrentWindow().close())
