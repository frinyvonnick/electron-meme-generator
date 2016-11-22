const {remote} = require('electron')

if (/--debug/.test(remote.process.argv[4])) {
  const client = require('electron-connect').client.create()

  // On install devtron
  require('devtron').install()

  client.on('close', () => {
    remote.getCurrentWindow().close()
  })
}
