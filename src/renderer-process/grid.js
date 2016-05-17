const ipc = require('electron').ipcRenderer

ipc.send('get-defaults-images',{})

ipc.on('defaults-images-sended',(e,images) => {
  document.getElementById('content').innerHTML = images.reduce((prev,next,index,arr) =>
  `${prev}
  <div class="card">
    <div class="img" style="background-image:url(${next.path})"></div>
    <h3><span>${next.name}</span></h3>
  </div>`,'')
})
