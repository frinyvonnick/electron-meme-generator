const {ipcMain, BrowserWindow} = require('electron')
const path = require('path')

let editWindow
let selectedTemplate

ipcMain.on('set-selected-template', (e, i) => {
  selectedTemplate = i
  const modalPath = path.join('file://', __dirname, '../windows/edit.html')
  editWindow = new BrowserWindow({ width: 1000, height: 800 })
  editWindow.on('closed', () => (editWindow = null))
  editWindow.loadURL(modalPath)
  editWindow.webContents.openDevTools()
  editWindow.show()
})

ipcMain.on('get-selected-template', e => e.sender.send('selected-template-sended', selectedTemplate))
