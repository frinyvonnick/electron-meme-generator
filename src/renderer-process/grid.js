const path = require('path')

const defaultMemes = [
  {
    title: 'Victory Baby',
    file: 'baby.jpg'
  },
  {
    title: 'Creepy Condescending Wonka',
    file: 'chapelier.jpg'
  },
  {
    title: 'Futurama Fry',
    file: 'futurama.jpg'
  },
  {
    title: 'Grandma Finds The Internet',
    file: 'grandma.jpg'
  },
  {
    title: 'Picard Wtf',
    file: 'startrek.png'
  },
  {
    title: 'X, X Everywhere',
    file: 'toystory.png'
  },
  {
    title: 'Liam Neeson Taken',
    file: 'taken.jpg'
  }
]

document.getElementById('content').innerHTML = defaultMemes.reduce((prev, next, index, arr) => {
  return `${prev}
  <div class="card meme" data-index="${index}">
  <div class="img" style="background-image:url('${path.join('file://', __dirname, '..', 'assets', 'img', 'defaults', next.file)}')"></div>
  <h3 title="${next.title}"><span>${next.title}</span></h3>
  </div>`
}, '')
