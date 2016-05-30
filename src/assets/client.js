const client = require('electron-connect').client.create()
const remote = require('electron').remote

client.on('close', () => {
  remote.getCurrentWindow().close()
})
