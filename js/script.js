const drawer = document.querySelector('#drawer');
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

setDrawer(16);

size16.addEventListener('click', (e) => {
  setDrawer(16);
})

size32.addEventListener('click', (e) => {
  setDrawer(32);
})

sizeX.addEventListener('click', (e) => {
  setDrawer(prompt('Set Size (Max 100)'));
})

freeDrawing.addEventListener('click', (e) => {
  const containerWidth = drawer.parentElement.clientWidth;
  const containerHeight = drawer.clientHeight;
  drawer.innerHTML = '';
  const boxSize = 5.005;

  const numberOfColumns = Math.floor(containerWidth / boxSize);
  const numberOfRows = Math.floor(containerHeight / boxSize);
  const totalBoxes = numberOfColumns * numberOfRows;

  for (let i = 0; i < numberOfColumns; i++) {
    for (let j = 0; j < numberOfRows; j++) {
      const box = document.createElement('div');
      drawer.appendChild(box);
    }
  }
})