const gulp = require('gulp');
const electron = require('electron-connect').server.create();

gulp.task('default', function () {
  // Start browser process
  electron.start();
  // Restart browser process
  gulp.watch([
    './src/main.js',
    './src/main-process/**/*.js'
  ], electron.restart);
  // Reload renderer process
  gulp.watch([
    './src/index.html',
    './src/renderer-process/**/*.js',
    './src/sections/**/*.html',
    './src/assets/**/*.{less,js}'
  ], electron.reload);
});
