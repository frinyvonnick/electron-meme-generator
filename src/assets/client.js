if (/--debug/.test(process.argv[4])) {
  const {remote} = require('electron')
  const client = require('electron-connect').client.create()

  if (!remote.isDevToolExtensionInstalled('devtron')) {
    // On install devtron
    require('devtron').install()
  }

  client.on('close', () => {
    remote.getCurrentWindow().close()
  })
}
