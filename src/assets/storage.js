const {app} = require('electron')
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

const deleteMeme = (selectedMeme, cb) => {
  storage.get('memes', (error, memes) => {
    if (error) throw error

    storage.set('memes', _.reject(memes, selectedMeme), (error) => {
      if (error) throw error

      cb()
    })
  })
}

const getMemes = (cb) => {
  storage.get('memes', (error, memes) => {
    if (error) throw error

    cb(memes)
  })
}

exports.getMemes = getMemes
exports.deleteMeme = deleteMeme
exports.addMeme = addMeme
exports.initmemesStorage = initmemesStorage
exports.copyMeme = copyMeme
exports.defaultImages = defaultImages
