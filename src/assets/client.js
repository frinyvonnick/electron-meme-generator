const client = require('electron-connect').client.create()
const {remote} = require('electron')

client.on('close', () => {
  remote.getCurrentWindow().close()
})
