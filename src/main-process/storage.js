const {app,ipcMain} = require('electron')

const defaultImages = [
  {
    path: app.getAppPath()+'/src/assets/img/defaults/baby.jpg',
    name: 'Victory Baby'
  },
  {
    path: app.getAppPath()+'/src/assets/img/defaults/chapelier.jpg',
    name: 'Creepy Condescending Wonka'
  },
  {
    path: app.getAppPath()+'/src/assets/img/defaults/futurama.jpg',
    name: 'Futurama Fry'
  },
  {
    path: app.getAppPath()+'/src/assets/img/defaults/grandma.jpg',
    name: 'Grandma Finds The Internet'
  },
  {
    path: app.getAppPath()+'/src/assets/img/defaults/startrek.png',
    name: 'Picard Wtf'
  },
  {
    path: app.getAppPath()+'/src/assets/img/defaults/toystory.png',
    name: 'X, X Everywhere'
  },
  {
    path: app.getAppPath()+'/src/assets/img/defaults/taken.jpg',
    name: 'Liam Neeson Taken'
  }
]

ipcMain.on('get-defaults-images',(e,arg) => {
  e.sender.send('defaults-images-sended',defaultImages);
})
