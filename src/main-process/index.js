const {ipcMain, dialog} = require('electron')
const {getMemes} = require('../assets/storage')
const {newEditWindow} = require('./edit')

ipcMain.on('get-memes', (e) => {
  getMemes(memes => {
    e.sender.send('memes-sended', memes)
  })
})
