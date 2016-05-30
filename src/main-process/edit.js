const {ipcMain, BrowserWindow} = require('electron')
const path = require('path')

let editWindow
let selectedMeme

ipcMain.on('set-selected-meme', (e, i) => {
  selectedMeme = i
  const modalPath = path.join('file://', __dirname, '../windows/edit.html')
  editWindow = new BrowserWindow({ width: 1000, height: 800 })
  editWindow.on('closed', () => (editWindow = null))
  editWindow.loadURL(modalPath)
  editWindow.webContents.openDevTools()
  editWindow.show()
})

ipcMain.on('get-selected-meme', e => e.sender.send('selected-meme-sended', selectedMeme))
