const {ipcMain, dialog} = require('electron')
const {
  getMemes,
  addMeme,
  deleteMeme,
  initmemesStorage
} = require('../assets/storage')

getMemes(memes => {
  if (Object.keys(memes).length === 0 && memes.constructor === Object) {
    initmemesStorage()
  }
})

ipcMain.on('get-memes', (e) => {
  getMemes(memes => e.sender.send('memes-sended', memes))
})

ipcMain.on('open-file-dialog', (event) => {
  dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [{ name: 'Images', extensions: ['jpg', 'png', 'gif'] }]
  }, (files) => {
    if (files) {
      addMeme(files[0], () => event.sender.send('selected-files'))
    }
  })
})

ipcMain.on('delete-selected-meme', (e, selectedMeme) => {
  deleteMeme(selectedMeme, () => {
    e.sender.send('meme-deleted')
  })
})
