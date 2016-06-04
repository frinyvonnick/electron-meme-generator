const gulp = require('gulp')
const less = require('gulp-less')

// Instance of ProcessManager
const processManager = require('electron-connect').server.create()

gulp.task('default', ['less'], () => {
  // Start browser process
  processManager.start(process.argv)
  // Restart browser process
  gulp.watch([
    './src/main.js',
    './src/main-process/**/*.js'
  ], () => {
    processManager.broadcast('close')
    processManager.restart(process.argv)
  })
  // Reload renderer process
  gulp.watch([
    './src/index.html',
    './src/renderer-process/**/*.js',
    './src/sections/**/*.html',
    './src/assets/**/*.{less,js,css}'
  ], processManager.reload)
})

gulp.task('less', () => {
  gulp.watch([
    './src/assets/**/*.less'
  ], () => {
    gulp.src('./src/assets/less/main.less')
      .pipe(less())
      .pipe(gulp.dest('./src/assets/css'))
  })
})
