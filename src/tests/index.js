'use strict'

const Application = require('spectron').Application
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const path = require('path')
const fs = require('fs')
const os = require('os')

chai.should()
chai.use(chaiAsPromised)

describe('demo app', function () {
  this.timeout(30000)

  let app

  const removeStoredPreferences = function () {
    const productName = require('../../package').name
    let userDataPath
    if (os.type() === 'Darwin') {
      userDataPath = path.join(process.env.HOME, 'Library', 'Application Support', productName)
    } else {
      userDataPath = path.join(process.env.HOME, '.config', productName)
    }
    try {
      fs.unlinkSync(path.join(userDataPath, 'activeDemoButtonId.json'))
    } catch (error) {
      if (error.code !== 'ENOENT') throw error
    }
    try {
      fs.unlinkSync(path.join(userDataPath, 'activeSectionButtonId.json'))
    } catch (error) {
      if (error.code !== 'ENOENT') throw error
    }
  }

  const setupApp = function (app) {
    chaiAsPromised.transferPromiseness = app.transferPromiseness
    return app.client.waitUntilWindowLoaded()
  }

  const startApp = function () {
    app = new Application({
      path: path.join(__dirname, '..', '..', 'node_modules', '.bin', 'electron'),
      args: [
        path.join(__dirname, '..', '..')
      ],
      waitTimeout: 10000
    })

    return app.start().then(setupApp)
  }

  before(function () {
    removeStoredPreferences()
    return startApp()
  })

  after(function () {
    if (app && app.isRunning()) {
      return app.stop()
    }
  })

  it('opens a window displaying the memes', function () {
    return app.client.getWindowCount().should.eventually.equal(2)
      .browserWindow.isMinimized().should.eventually.be.false
      .browserWindow.isDevToolsOpened().should.eventually.be.true
      .browserWindow.isVisible().should.eventually.be.true
      .browserWindow.isFocused().should.eventually.be.true
      .browserWindow.getBounds().should.eventually.have.property('width').and.be.above(0)
      .browserWindow.getBounds().should.eventually.have.property('height').and.be.above(0)
      .getTitle().should.eventually.equal('Electron meme generator')
  })
})
