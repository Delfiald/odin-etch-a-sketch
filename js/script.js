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

    console.log(index);
    switch(index){
      case 0:
        item.classList.add('active');
        setDrawer(16);
        break;
      case 1:
        item.classList.add('active');
        setDrawer(32);
        break;
      case 2:
        if(sizeX.value < 1 || sizeX.value > 100) {
          alert("Size Must be 1 to 100");
          //Set this to pop up with message because alert is bad lol
        }else {
          setDrawer(sizeX.value);
        }
        break;
      case 3:
        item.classList.add('active');
        freeDraw();
        break;
      default:
        break;
    }
  })
})

document.addEventListener('click', (e) => {
  if(e.target.id === 'x-size'){
    sizeX.setAttribute('placeholder', '');
      
    sizeX.addEventListener('blur', function() {
      if (sizeX.value === '') {
        sizeX.setAttribute('placeholder', 'Enter the Size');
      }
    });
    
    document.querySelector('.manual-size .btn').classList.add('show');
  }else if(!e.target.closest('.manual-size .btn')) {
    document.querySelector('.manual-size .btn').classList.remove('show');
  }
})

setDrawer(16);

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