const {app} = require('electron')
const fs = require('fs')
const path = require('path')
const memesPath = app.getPath('userData') + '/memes/'

exports.saveimage = (file, texts, cb) => {
  // TODO : Implements here
  const stream = fs.createReadStream(file).pipe(fs.createWriteStream(path.join(memesPath, path.basename(file))))
  stream.on('finish', cb)
}
