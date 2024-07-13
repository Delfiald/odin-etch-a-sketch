const drawer = document.querySelector('#drawer');
const size = document.querySelectorAll('#size .btn');
const sizeX = document.querySelector('#x-size');
const info = document.querySelector('#info');
const getColor = document.querySelector('#color');
const drawerBg = document.querySelector('#background');
let backgroundColor = drawerBg.value;

const boxes = [];

// Information Content
const informationContent = {
  drawMode: '16x16',
  boxSize: '16x16',
  gridSize: '20px',
  gridShow: 'Off'
}

// Draw Logic
let subColors = false;
let mouseDown = false;

document.addEventListener('mousedown', (e) => onMouseDown(e));
document.addEventListener('mouseup', () => onMouseUp());
drawer.addEventListener('mouseenter', (e) => onMouseEnter(e), true);

const onMouseDown = (e) => {
  if (e.target.closest('#drawer div')) {
    e.preventDefault();
    mouseDown = true;
    handleDrawing(e);
  }
}

const onMouseUp = () => {
  if (mouseDown) {
    mouseDown = false;
  }
}

const onMouseEnter = (e) => {
  if (mouseDown && e.target.closest('div')) {
    handleDrawing(e);
  }
}

const handleDrawing = (e) => {
  if(!setEraser){
    setPencilColor(e);
  }else{
    erase(e);
  }
}

const setPencilColor = (box) => {
  const targetBox = box.target.closest('div');
  if(subColors){
    targetBox.style.background = activeColors;
  }else{
    targetBox.style.background = getColor.value;
  }
  targetBox.classList.add('filled');
}

// Eraser
const erase = (box) => {
  const targetBox = box.target.closest('div');
  if(targetBox){
    targetBox.style.background = backgroundColor;
    targetBox.classList.remove('filled');
  }
};

document.addEventListener('click', (e) => {
  const colorsButton = e.target.closest('.colors .btn');
  if(colorsButton){
    handleColor(colorsButton);
  }

  const manualSize = e.target.closest('#x-size');
  const manualSubmitButton = document.querySelector('.manual-size .btn');
  if(manualSize){
    sizeX.setAttribute('placeholder', '');
      
    sizeX.addEventListener('blur', function handleBlur() {
      if (sizeX.value === '') {
        sizeX.setAttribute('placeholder', 'Enter the Size');
      }
      sizeX.removeEventListener('blur', handleBlur);
    });
    
    manualSubmitButton.classList.add('show');
  }else if(!e.target.closest('.manual-size .btn')) {
    manualSubmitButton.classList.remove('show');
  }
});

const handleColor = (btn) => {
  document.body.style.cursor = 'default';
  setEraser = false;
  if(btn.tagName === 'INPUT' && btn.type === 'color'){
    subColors = false;
  }else {
    const btnSecondary = btn.querySelector('.background');
    if(btnSecondary){
      subColors = true;
      activeColors = getComputedStyle(btnSecondary).backgroundColor;
    }
  }
}

// Set SubColor
const listColor = [];

const addColorList = (currentColor) => {
  if (listColor.length === 6) {
    listColor.pop();
  }
  listColor.unshift(currentColor);
}

getColor.addEventListener('change', () => {
  addColorList(getColor.value);
  const colors = document.querySelectorAll('.colors div .background');
  colors.forEach((color, index) => {
    color.style.backgroundColor = listColor[index] || '#fff';
  });
});

// Set Drawer
const setInformationContent = (drawerSizeX ,drawerSizeY, size) => {
  if(size === 5){
    informationContent.drawMode = 'Free Draw Mode';
    informationContent.boxSize = `${drawerSizeX}x${drawerSizeY}`;
  }else{
    if(drawerSizeX === drawerSizeY){
      if(drawerSizeX === 16){
        informationContent.drawMode = '16x16 Mode';
        informationContent.boxSize = '16x16';
      }else if(drawerSizeX === 32){
        informationContent.drawMode = '32x32 Mode';
        informationContent.boxSize = '32x32';
      }else{
        informationContent.drawMode = 'Custom Mode';
        informationContent.drawMode = `${drawerSizeX}x${drawerSizeY}`;
      }
    }
  }
  informationContent.gridSize = `${size}px`;
}

const createBoxes = (drawer, drawerSizeX, drawerSizeY, height, width, backgroundColor) => {
  boxes.length = 0;

  console.log(drawerSizeX);
  console.log(drawerSizeY);
  for(let x = 0; x < drawerSizeX; x++){
    for(let y = 0; y < drawerSizeY; y++){
      boxes[y] = document.createElement('div');
      boxes[y].style.flex = `1 1 ${height}`;
      boxes[y].style.width = `${width}`;
      boxes[y].style.background = backgroundColor;
      drawer.append(boxes[y]);
    }
  }
}

const setDrawer = (drawerSize) => {
  const containerHeight = drawer.clientHeight;
  drawer.innerHTML = '';

  const height = `${100/drawerSize}%`;
  const width = containerHeight/drawerSize;

  createBoxes(drawer, drawerSize, drawerSize, height, `${width}px`, backgroundColor);
  setInformationContent(drawerSize, drawerSize, width);
}

const freeDraw = () => {
  const containerWidth = drawer.parentElement.clientWidth;
  const containerHeight = drawer.clientHeight;
  const boxSize = 5;

  drawer.innerHTML = '';

  const numberOfColumns = Math.floor(containerWidth / boxSize);
  const numberOfRows = Math.floor(containerHeight / boxSize);

  createBoxes(drawer, numberOfColumns, numberOfRows, `${boxSize}px`, `${boxSize}px`, backgroundColor);

  setInformationContent(numberOfColumns, numberOfRows, boxSize);
}

size.forEach((item, index) => {
  item.addEventListener('click', (e) => {
    size.forEach(i => i.classList.remove('active'));

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
        const customSize = parseInt(sizeX.value, 10);
        if(customSize < 1 || customSize > 100) {
          info.classList.add('error');
        }else {
          setDrawer(customSize);
        }
        break;
      case 3:
        item.classList.add('active');
        freeDraw();
        break;
      default:
        console.error('Invalid drawer size index');
        break;
    }
  })
})

// Initial Size
setDrawer(16);

// Settings
const settings = document.querySelector('#settings');
const settingsBtn = document.querySelector('.settings-button');

settingsBtn.addEventListener('click', (e) => {
  settings.classList.toggle('show');
  settingsBtn.classList.toggle('clicked');
})

// Info Button
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

// Info Content
const infoContent = document.querySelectorAll('.info-content span')

const setInfoContent = () => {
  console.log('run');
  Object.keys(informationContent).forEach((key, index) => {
    infoContent[index].textContent = informationContent[key];
  })
}

// Eraser
let setEraser = false;
const eraserButton = document.querySelector('.eraser-button');
eraserButton.addEventListener('click', (e) => {
  setEraser = true;
  document.body.style.cursor = 'url(../assets/eraser-cursor.png), auto';
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
drawerBg.addEventListener('input', () => {
  drawer.querySelectorAll('div').forEach(box => {
    if(!box.classList.contains('filled')){
      backgroundColor = drawerBg.value
      box.style.background = backgroundColor;
      document.documentElement.style.setProperty('--grid-color', gridColor(backgroundColor));
    }
  })
})

// Grid
const gridShow = document.querySelector('#grid');
gridShow.addEventListener('click', (e) => {
  const isChecked = gridShow.checked;
  drawer.classList.toggle('grid', isChecked);
  informationContent.gridShow = isChecked;
})

const gridColor = (backgroundColor) => {
  backgroundColor = backgroundColor.substring(1);
  const r = parseInt(backgroundColor.slice(0, 2), 16);
  const g = parseInt(backgroundColor.slice(2, 4), 16);
  const b = parseInt(backgroundColor.slice(4, 6), 16);

  const compR = (255 - r).toString(16).padStart(2, '0');
  const compG = (255 - g).toString(16).padStart(2, '0');
  const compB = (255 - b).toString(16).padStart(2, '0');

  return `#${compR}${compG}${compB}`;
}