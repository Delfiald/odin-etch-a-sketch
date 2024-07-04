const drawer = document.querySelector('#drawer');
const size16 = document.querySelector('#x-16');
const size32 = document.querySelector('#x-32');
const sizeX = document.querySelector('#x-size');
const freeDrawing = document.querySelector('#free-drawing');

const boxes = [];

const setDrawer = (drawerSize) => {
  for(let x = 0; x < drawerSize; x++){
    for(let y = 0; y < drawerSize; y++){
      boxes[y] = document.createElement('div');
      boxes[y].style.flex = `1 1 ${100/drawerSize}%`;
      boxes[y].style.width = `${75/drawerSize}vh`;
      drawer.append(boxes[y]);
    }
  }
}

setDrawer(16);

size16.addEventListener('click', (e) => {
  drawer.innerHTML = '';
  setDrawer(16);
})

size32.addEventListener('click', (e) => {
  drawer.innerHTML = '';
  setDrawer(32);
})

sizeX.addEventListener('click', (e) => {
  drawer.innerHTML = '';
  setDrawer(prompt('Set Size (Max 100)'));
})

freeDrawing.addEventListener('click', (e) => {
  drawer.innerHTML = '';
  const containerHeight = drawer.clientHeight;
  const boxSize = 5;

  const numberOfColumns = Math.floor(1100 / boxSize);
  const numberOfRows = Math.floor(containerHeight / boxSize);
  const totalBoxes = numberOfColumns * numberOfRows;
  console.log(totalBoxes);

  for (let i = 0; i < totalBoxes; i++) {
    const box = document.createElement('div');
    drawer.appendChild(box);
  }
})