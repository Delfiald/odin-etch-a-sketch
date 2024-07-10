const drawer = document.querySelector('#drawer');
const size = document.querySelectorAll('#size .btn');
const size16 = document.querySelector('#x-16');
const size32 = document.querySelector('#x-32');
const sizeX = document.querySelector('#x-size');
const freeDrawing = document.querySelector('#free-drawing');

const boxes = [];

// Information Content
const informationContent = {
  drawMode: '16x16',
  boxSize: '16x16',
  gridSize: '20px',
  gridShow: 'Off'
}

const info = document.querySelector('#info');

const getColor = document.querySelector('#color');

let subColors = false;

const drawerBg = document.querySelector('#background');
let backgroundColor = drawerBg.value;

// Adding Draw Logic
let mouseDown = false;
document.addEventListener('mousedown', (e) => {
  if (e.target.closest('#drawer div')) {
    e.preventDefault();
    mouseDown = true;
    if(setEraser){
      erase(e);
    }else{
      setPencilColor(e);
    }
  }
});
  
drawer.addEventListener('mouseenter', (e) => {
  if (mouseDown && e.target.closest('div')) {
    if(setEraser){
      erase(e);
    }else{
      setPencilColor(e);
    }
  }
}, true);
  
document.addEventListener('mouseup', () => {
  if (mouseDown) {
    console.log("not clicked");
    mouseDown = false;
  }
});

const erase = (box) => {
  box.target.closest('div').style.background = backgroundColor;
  box.target.closest('div').classList.remove('filled');
}

const setPencilColor = (box) => {
  if(subColors){
    box.target.closest('div').style.background = activeColors;
    box.target.closest('div').classList.add('filled');
  }else{
    box.target.closest('div').style.background = getColor.value;
    box.target.closest('div').classList.add('filled');
  }
}

const setDrawer = (drawerSize) => {
  if(drawerSize === 16){
    informationContent.drawMode = '16x16 Mode';
    informationContent.boxSize = '16x16';
  }else if(drawerSize === 32){
    informationContent.drawMode = '32x32 Mode';
    informationContent.boxSize = '32x32';
  }else{
    informationContent.drawMode = 'Custom Mode';
    informationContent.drawMode = `${drawerSize}x${drawerSize}`;
  }
  const containerHeight = drawer.clientHeight;
  
  drawer.innerHTML = '';
  for(let x = 0; x < drawerSize; x++){
    for(let y = 0; y < drawerSize; y++){
      boxes[y] = document.createElement('div');
      boxes[y].style.flex = `1 1 ${100/drawerSize}%`;
      boxes[y].style.width = `${containerHeight/drawerSize}px`;
      boxes[y].style.background = backgroundColor;
      drawer.append(boxes[y]);
    }
  }

  informationContent.gridSize = `${containerHeight/drawerSize}px`;

}

size.forEach((item, index) => {
  item.addEventListener('click', (e) => {
    size.forEach(i => i.classList.remove('active'));

    switch(index){
      case 0:
        item.classList.add('active');
        drawer.innerHTML = '';
        setDrawer(16);
        break;
      case 1:
        item.classList.add('active');
        drawer.innerHTML = '';
        setDrawer(32);
        break;
      case 2:
        if(sizeX.value < 1 || sizeX.value > 100) {
          info.classList.add('error');
        }else {
          drawer.innerHTML = '';
          setDrawer(sizeX.value);
        }
        break;
      case 3:
        item.classList.add('active');
        drawer.innerHTML = '';
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
  informationContent.drawMode = 'Free Draw Mode';
  
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
      box.style.background = backgroundColor;
    }
  }
  informationContent.boxSize = `${numberOfColumns}x${numberOfRows}`;
  informationContent.gridSize = `${boxSize}px`;
}

const settings = document.querySelector('#settings');
const settingsBtn = document.querySelector('.settings-button');

settingsBtn.addEventListener('click', (e) => {
  settings.classList.toggle('show');
  settingsBtn.classList.toggle('clicked');
})

const infoBtn = document.querySelector('#info-button');
const infoBackBtn = document.querySelectorAll('#info .back-button');

infoBtn.addEventListener('click', (e) => {
  info.classList.add('show');
  setInfoContent();
})

infoBackBtn.forEach((button) => {
  button.addEventListener('click', (e) => {
    info.classList.remove('show');
    info.classList.remove('error');
  })
})

// Adding set draw color that active
// user set 1 of 6 colors that color will active
// Change latest user color to 6 box color
// Color saved when user start using a color they pick on drawer
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.colors .btn');
  if(btn){
    if((btn.tagName === 'INPUT' && btn.type === 'color')
    ){
      subColors = false;
      setEraser = false;
    }else {
      const btnSecondary = btn.querySelector('.background');
      if(btnSecondary){
        setEraser = false;
        subColors = true;
        activeColors = getComputedStyle(btnSecondary).backgroundColor;
      }
    }
  }
})

const colors = document.querySelectorAll('.colors div .background');
getColor.addEventListener('input', () => {
  colors.forEach((color, index) => {
    color.style.backgroundColor = getColor.value;
  })
})

// Eraser
// Change Cursor (maybe(?))
let setEraser = false;
const eraserButton = document.querySelector('.eraser-button');
eraserButton.addEventListener('click', (e) => {
  setEraser = true;
})

// Clear
const clearButton = document.querySelector('.clear-button');
clearButton.addEventListener('click', (e) => {
  drawer.querySelectorAll('div').forEach((box) => {
    box.style.background = backgroundColor;
    box.classList.remove('filled');
  })
})

// Background Colors
// Keep background colors even change size or drawing mode
drawerBg.addEventListener('input', () => {
  drawer.querySelectorAll('div').forEach((box, index) => {
    if(!box.classList.contains('filled')){
      backgroundColor = drawerBg.value
      box.style.background = backgroundColor;
    }
  })
})

// Grid
const gridShow = document.querySelector('#grid');
gridShow.addEventListener('click', (e) => {
  if(gridShow.checked){
    drawer.classList.add('grid');
    informationContent.gridShow = (gridShow.checked);
  }else{
    drawer.classList.remove('grid');
    informationContent.gridShow = (gridShow.checked);
  }
})

const infoContent = document.querySelectorAll('.info-content span')

const setInfoContent = () => {
  console.log('run');
  Object.keys(informationContent).forEach((key, index) => {
    infoContent[index].textContent = informationContent[key];
  })
}