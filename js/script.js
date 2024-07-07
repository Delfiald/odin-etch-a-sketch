const drawer = document.querySelector('#drawer');
const size = document.querySelectorAll('#size .btn');
const size16 = document.querySelector('#x-16');
const size32 = document.querySelector('#x-32');
const sizeX = document.querySelector('#x-size');
const freeDrawing = document.querySelector('#free-drawing');

const boxes = [];

const setDrawer = (drawerSize) => {
  const containerHeight = drawer.clientHeight;
  
  drawer.innerHTML = '';
  for(let x = 0; x < drawerSize; x++){
    for(let y = 0; y < drawerSize; y++){
      boxes[y] = document.createElement('div');
      boxes[y].style.flex = `1 1 ${100/drawerSize}%`;
      boxes[y].style.width = `${containerHeight/drawerSize}px`;
      drawer.append(boxes[y]);
    }
  }
}

size.forEach((item, index) => {
  item.addEventListener('click', (e) => {
    drawer.innerHTML = '';
    size.forEach(i => i.classList.remove('active'));

    item.classList.add('active');

    console.log(index);
    switch(index){
      case 0:
        setDrawer(16);
        break;
      case 1:
        setDrawer(32);
        break;
      case 2:
        item.setAttribute('placeholder', '');
      
        item.addEventListener('blur', function() {
          if (item.value === '') {
            item.setAttribute('placeholder', 'Enter the Size');
          }
        });

        item.classList.remove('active');

        setDrawer();
        break;
      case 3:
        freeDraw();
        break;
      default:
        break;
    }
  })
})

setDrawer(16);

// size16.addEventListener('click', (e) => {
//   setDrawer(16);
//   size16.classList.add('active');
// })

// size32.addEventListener('click', (e) => {
//   setDrawer(32);
//   size32.classList.add('active');
// })

// sizeX.addEventListener('click', (e) => {
//   setDrawer(prompt('Set Size (Max 100)'));
//   sizeX.classList.add('active');
// })

const freeDraw = () => {
  const containerWidth = drawer.parentElement.clientWidth;
  const containerHeight = drawer.clientHeight;
  drawer.innerHTML = '';
  const boxSize = 5;

  const numberOfColumns = Math.floor(containerWidth / boxSize);
  const numberOfRows = Math.floor(containerHeight / boxSize);
  const totalBoxes = numberOfColumns * numberOfRows;

  for (let i = 0; i < numberOfColumns; i++) {
    for (let j = 0; j < numberOfRows; j++) {
      const box = document.createElement('div');
      drawer.appendChild(box);
    }
  }
}

const settings = document.querySelector('#settings');
const settingsBtn = document.querySelector('.settings-button');

settingsBtn.addEventListener('click', (e) => {
  settings.classList.toggle('show');
  settingsBtn.classList.toggle('clicked');
})

const infoBtn = document.querySelector('#info-button');
const info = document.querySelector('#info');
const infoBackBtn = document.querySelector('#info .back-button');

infoBtn.addEventListener('click', (e) => {
  info.classList.add('show');
})

infoBackBtn.addEventListener('click', (e) => {
  info.classList.remove('show');
})

// Adding Draw Logic

// Change latest user color to 6 box color

// Make drawer color works