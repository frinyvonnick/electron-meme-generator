const gulp = require('gulp')
// Instance of ProcessManager
const processManager = require('electron-connect').server.create()

gulp.task('default', function () {
  // Start browser process
  processManager.start()
  // Restart browser process
  gulp.watch([
    './src/main.js',
    './src/main-process/**/*.js'
  ], () => {
    processManager.broadcast('close')
    processManager.restart()
  })
  // Reload renderer process
  gulp.watch([
    './src/index.html',
    './src/renderer-process/**/*.js',
    './src/sections/**/*.html',
    './src/assets/**/*.{less,js}'
  ], processManager.reload)
})
