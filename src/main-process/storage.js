const {app, ipcMain, dialog} = require('electron')
const storage = require('electron-json-storage')
const fs = require('fs')
const path = require('path')
const _ = require('lodash')
const memesPath = app.getPath('userData') + '/memes/'

const defaultImages = [
  {
    name: 'baby.jpg',
    title: 'Victory Baby',
    path: memesPath + 'baby.jpg'
  },
  {
    name: 'chapelier.jpg',
    title: 'Creepy Condescending Wonka',
    path: memesPath + 'chapelier.jpg'
  },
  {
    name: 'futurama.jpg',
    title: 'Futurama Fry',
    path: memesPath + 'futurama.jpg'
  },
  {
    name: 'grandma.jpg',
    title: 'Grandma Finds The Internet',
    path: memesPath + 'grandma.jpg'
  },
  {
    name: 'startrek.png',
    title: 'Picard Wtf',
    path: memesPath + 'startrek.png'
  },
  {
    name: 'toystory.png',
    title: 'X, X Everywhere',
    path: memesPath + 'toystory.png'
  },
  {
    name: 'taken.jpg',
    title: 'Liam Neeson Taken',
    path: memesPath + 'taken.jpg'
  }
]

const initmemesStorage = () => {
  fs.mkdir(memesPath, () => defaultImages.forEach(copyMeme))
  storage.set('memes', defaultImages, (error) => {
    if (error) throw error
  })
}

const copyMeme = (meme) => {
  fs.createReadStream(app.getAppPath() + '/src/assets/img/defaults/' + meme.name).pipe(fs.createWriteStream(memesPath + meme.name))
}

const addMeme = (file, cb) => {
  const memeName = path.basename(file)
  fs.createReadStream(file).pipe(fs.createWriteStream(memesPath + memeName))
  storage.get('memes', (error, data) => {
    if (error) throw error

    if (data.find(meme => meme.name === memeName)) {
      cb()
      return
    }
    data.push({
      name: memeName,
      title: memeName,
      path: memesPath + path.basename(file)
    })
    storage.set('memes', data, (error) => {
      if (error) throw error
      cb()
    })
  })
}

storage.get('memes', (error, data) => {
  if (error) throw error

  if (Object.keys(data).length === 0 && data.constructor === Object) {
    initmemesStorage()
  }
})

ipcMain.on('get-memes', (e) => {
  storage.get('memes', (error, memes) => {
    if (error) throw error

    e.sender.send('memes-sended', memes)
  })
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
  storage.get('memes', (error, memes) => {
    if (error) throw error

    storage.set('memes', _.reject(memes, selectedMeme), (error) => {
      if (error) throw error

      e.sender.send('meme-deleted')
    })
  })
})
