if (/--debug/.test(process.argv[4])) {
  const {remote} = require('electron')
  const client = require('electron-connect').client.create()

  client.on('close', () => {
    remote.getCurrentWindow().close()
  })
}
