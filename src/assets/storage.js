const storage = require('electron-json-storage')
const path = require('path')
const _ = require('lodash')
const image = require('./image')
const {initMemesStorage} = require('./init')

const addMeme = (memePath, cb) => {
  const memeName = path.basename(memePath)
  storage.get('memes', (error, data) => {
    if (error) throw error

    data.push({
      title: memeName,
      path: memePath
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

getMemes((memes) => {
  if (Object.keys(memes).length === 0 && memes.constructor === Object) {
    initMemesStorage((memes) => {
      storage.set('memes', memes, (error) => {
        if (error) throw error
      })
    })
  }
})

const saveMeme = (newMeme, texts, cb) => {
  storage.get('memes', (error, memes) => {
    if (error) throw error
    image.saveimage(newMeme, texts, (memePath, error) => {
      if (error) throw error
      addMeme(memePath, (error) => {
        if (error) throw error
        cb()
      })
    })
  })
}

exports.getMemes = getMemes
exports.deleteMeme = deleteMeme
exports.addMeme = addMeme
exports.saveMeme = saveMeme
