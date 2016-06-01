const {ipcMain, dialog} = require('electron')
const {getMemes} = require('../assets/storage')
const {newEditWindow} = require('./edit')

ipcMain.on('get-memes', (e) => {
  getMemes(memes => {
    e.sender.send('memes-sended', memes)
  })
})

ipcMain.on('open-file-dialog', (event) => {
  dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [{ name: 'Images', extensions: ['jpg', 'png', 'gif'] }]
  }, (files) => {
    if (files) {
      const editWindow = newEditWindow(files[0])
      editWindow.on('close', () => event.sender.send('selected-files'))
    }
  })
})
