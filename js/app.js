import keyData from './keyData.js';
console.log(' keyData= ', keyData);
// console.log('keyData.en[0] = ', keyData.en[0], keyData.en[0].code);
// keyData.en.forEach((item, i) => {
//   console.log('item i= ', i, item);
// })


function size() {
  let size = keyboard.parentNode.clientWidth / 60 + 7;
  console.log('size = ', size);
  console.log('keyboard.parentNode.clientWidth = ', keyboard.parentNode.clientWidth);
  keyboard.style.fontSize = size + 'px';
  const row0FirstCol = document.querySelector(".row0 .key:first-child");
  row0FirstCol.style.fontSize = size + 'px';
  const row0LastCol = document.querySelector(".row0 .key:last-child");
  row0LastCol.style.fontSize = size / 2 + 'px';
  const row1FirstCol = document.querySelector(".row1 .key:first-child");
  row1FirstCol.style.fontSize = size / 2 + 'px';
  const row1LastCol = document.querySelector(".row1 .key:last-child");
  row1LastCol.style.fontSize = size / 2 + 'px';
  const row2FirstCol = document.querySelector(".row2 .key:first-child");
  row2FirstCol.style.fontSize = size / 2 + 'px';
  const row2LastCol = document.querySelector(".row2 .key:last-child");
  row2LastCol.style.fontSize = size / 2 + 'px';
  const row3FirstCol = document.querySelector(".row3 .key:first-child");
  row3FirstCol.style.fontSize = size / 2 + 'px';
  const row3LastCol = document.querySelector(".row3 .key:last-child");
  row3LastCol.style.fontSize = size / 2 + 'px';
  // ---------4---------
  const row4FirstCol = document.querySelector(".row4 .key:first-child");
  row4FirstCol.style.fontSize = size / 2 + 'px';
  const row4LastCol = document.querySelector(".row4 .key:last-child");
  row4LastCol.style.fontSize = size / 2 + 'px';
  const row4Nth2 = document.querySelector(".row4 .key:nth-child(2)");
  row4Nth2.style.fontSize = size / 2 + 'px';
  const row4Nth3 = document.querySelector(".row4 .key:nth-child(3)");
  row4Nth3.style.fontSize = size / 2 + 'px';
  const row4Nth5 = document.querySelector(".row4 .key:nth-child(5)");
  row4Nth5.style.fontSize = size / 2 + 'px';

}

let keyboard = document.querySelector('.keyboard');
window.addEventListener('resize', function (e) {
  size();
});
size();