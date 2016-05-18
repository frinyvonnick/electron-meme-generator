const {app,ipcMain,dialog} = require('electron')
const storage = require('electron-json-storage');
const fs = require('fs');
const path = require('path');
const templatesPath = app.getPath('userData') + '/templates/';

const defaultImages = [
  {
    name: 'baby.jpg',
    title: 'Victory Baby',
    path: templatesPath + 'baby.jpg'
  },
  { 
    name: 'chapelier.jpg',
    title: 'Creepy Condescending Wonka',
    path: templatesPath + 'chapelier.jpg'
  },
  {
    name: 'futurama.jpg',
    title: 'Futurama Fry',
    path: templatesPath + 'futurama.jpg'
  },
  {
    name: 'grandma.jpg',
    title: 'Grandma Finds The Internet',
    path: templatesPath + 'grandma.jpg'
  },
  {
    name: 'startrek.png',
    title: 'Picard Wtf',
    path: templatesPath + 'startrek.png'
  },
  {
    name: 'toystory.png',
    title: 'X, X Everywhere',
    path: templatesPath + 'toystory.png'
  },
  {
    name: 'taken.jpg',
    title: 'Liam Neeson Taken',
    path: templatesPath + 'taken.jpg'
  }
]

const initTemplatesStorage = () => {
  fs.mkdir(app.getPath('userData') + '/templates/', () => defaultImages.forEach(copyTemplate));
  storage.set('templates', defaultImages, (error) => {
    if (error) throw error;
  });
}

const copyTemplate = (template) => {
  fs.createReadStream(app.getAppPath() + '/src/assets/img/defaults/' + template.name).pipe(fs.createWriteStream(templatesPath + template.name));
}

const addTemplate = (file,cb) => {
  const templateName = path.basename(file);
  fs.createReadStream(file).pipe(fs.createWriteStream(templatesPath + templateName));
  storage.get('templates', (error, data) => {
    if (error) throw error;
    
    if (data.find(template => template.name == templateName)) {
      cb();
      return;
    }
    data.push({
       name: templateName,
       title: templateName,
       path: templatesPath + path.basename(file)
    });
    storage.set('templates', data, (error) => {
      if (error) throw error;
      cb();
    });
  });
}

storage.get('templates', (error, data) => {
  if (error) throw error;

  if (Object.keys(data).length === 0 && data.constructor === Object) {
    initTemplatesStorage();
  }
});



ipcMain.on('get-templates',(e,arg) => {
  storage.get('templates', (error, templates) => {
    if (error) throw error;

    e.sender.send('templates-sended', templates);
  });
  
})

ipcMain.on('open-file-dialog', (event) => {
  dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [{name: 'Images', extensions: ['jpg', 'png', 'gif']}]
  }, (files) => {
    if (files) {
      addTemplate(files[0], () => event.sender.send('selected-files'));
    }
  })
})
