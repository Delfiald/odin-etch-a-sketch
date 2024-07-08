const container = document.querySelector("#container");
const wrapper = container.querySelector(".wrapper");
const erase = document.querySelector(".eraser");
const colorPicker = document.querySelector("#color-picker");

const div = [];

let divItem = 3500;

for(let i = 0; i < divItem; i++){
  div[i] = document.createElement("div");
  wrapper.appendChild(div[i]);
}

let isDragged = false;
let isErase = false;


div.forEach((item, index) => {
  item.addEventListener('mousedown', (e) => {
    e.preventDefault();
    item.style.background = colorPicker.value;
    isDragged = true;
  })

  item.addEventListener('mouseup', (e) => {
    isDragged = false;
  })

  item.addEventListener('mousemove', (e) => {
    if(isDragged){
      item.style.background = colorPicker.value;
    }
  })

  erase.addEventListener('click', () => {
    item.style.background = '#fff';
  })
})