import keyData from './keyData.js';
console.log(' keyData= ', keyData);
console.log('keyData.en[0] = ', keyData.en[0], keyData.en[0].code);
keyData.en.forEach((item, i) => {
  console.log('item i= ', i, item);
})


function size() {
  var size = keyboard.parentNode.clientWidth / 90;
  keyboard.style.fontSize = size + 'px';
  console.log(size);
}

let keyboard = document.querySelector('.keyboard');
window.addEventListener('resize', function (e) {
  size();
});
size();