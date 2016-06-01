const ipc = require('electron').ipcRenderer

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
})
