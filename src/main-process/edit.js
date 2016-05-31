const {ipcMain, BrowserWindow} = require('electron')
const path = require('path')
const {saveMeme} = require('../assets/storage')

let editWindow
let newMeme

exports.newEditWindow = (i) => {
  newMeme = i
  const modalPath = path.join('file://', __dirname, '../windows/edit.html')
  editWindow = new BrowserWindow({ width: 1000, height: 800 })
  editWindow.on('closed', () => (editWindow = null))
  editWindow.loadURL(modalPath)
  editWindow.show()
  return editWindow
}

ipcMain.on('get-new-meme', e => e.sender.send('new-meme-sended', newMeme))

ipcMain.on('save-meme', (e, texts) => {
  saveMeme(newMeme, texts, () => {
    e.sender.send('meme-saved')
  })
})
