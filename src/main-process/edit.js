const {ipcMain, BrowserWindow} = require('electron')
const path = require('path')

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
