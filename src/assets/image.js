const {app} = require('electron')
const path = require('path')
const memesPath = app.getPath('userData') + '/memes/'
const Jimp = require('jimp')

exports.saveimage = (file, texts, cb) => {
  Jimp.read(file).then((image) => {
    Jimp.loadFont(Jimp.FONT_SANS_32_WHITE).then((font) => {
      if (Array.isArray(texts) && texts.length === 2) {
        image.print(font, 0, 0, texts[0])
        image.print(font, 0, image.bitmap.height - 32, texts[1])
      }
      const memePath = path.join(memesPath, Date.now() + '-' + path.basename(file))
      image.write(memePath, () => {
        cb(memePath)
      })
    })
  }).catch((err) => {
    cb(null, err)
  })
}

exports.getImageInfos = (file, cb) => {
  Jimp.read(file).then((image) => {
    cb({
      width: image.bitmap.width,
      height: image.bitmap.height
    })
  })
}
