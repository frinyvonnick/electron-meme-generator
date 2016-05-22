const electron = require('electron')
const client = require('electron-connect').client
const glob = require('glob')
const path = require('path')

// Module to control application life.
const app = electron.app

// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const windowsSize = {
  width: 1000,
  height: 800
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

const initialize = () => {
  loadScripts()

  function createWindow () {
    // Create the browser window.
    mainWindow = new BrowserWindow({width: windowsSize.width, height: windowsSize.height})

    // and load the index.html of the app.
    mainWindow.loadURL('file://' + __dirname + '/windows/index.html')

    // Open the DevTools.
    mainWindow.webContents.openDevTools()

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      mainWindow = null
    })

    // Livereload
    client.create(mainWindow)
  }

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow)

  // Quit when all windows are closed.
  app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
      createWindow()
    }
  })
}

// // Require each JS file in the main-process dir
function loadScripts () {
  let files = glob.sync(path.join(__dirname, 'main-process/**/*.js'))
  files.forEach(function (file) {
    require(file)
  })
}

initialize()
