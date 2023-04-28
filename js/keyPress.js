class Keyboard {
  pressAnyKey() {

    document.addEventListener('keydown', (event) => {
      console.log(event); // all event related info
      console.log(event.type);
      console.log(event.key);
      console.log(event.code);
      console.log(event.valuecode);
    });

    this.textArea.addEventListener("keydown", function (e) {
      if (e.code == "Enter") console.log('e.code == Enter');
    })
  }



  clickOtherKey() {

    this.textArea.addEventListener("click", function (e) {
      let message = "Click с зажатой клавишей";

      if (e.shiftKey) {
        message += " Shift";
      }
      if (e.altKey) {
        message += " Alt";
      }
      if (e.ctrlKey) {
        message += " Ctrl";
      }
      if (e.metaKey) {
        message += " Meta";
      }

      this.textArea.innerHTML = message;
    });
  }
  clickEventHandler(event) {
    const pressKey = event.target.tagName;
    console.log('event.target.tagName = ', event.target.tagName);
    // this.textArea.innerHTML = this.textArea.innerHTML + event.target.textContent;
    // console.log('this.textArea = ', this.textArea);
    // console.log('this.keyboard = ', this.keyboard);
    // this.textArea.innerHTML = this.textArea.innerHTML + '**********';
    console.log('event.target.textContent=', event.target.textContent);
    // console.log('event.target = ', event.target, 'event.target.dataset.userNumber=', event.target.dataset.userNumber);
    if (event.target.tagName != "div") return;

  }
}
document.addEventListener("keydown", function (e) {
  switch (e.code) {
    case "ArrowLeft":
      moveLeft(div, distance);
      break;
    case "ArrowRight":
      moveRight(div, distance);
      break;
    case "ArrowUp":
      moveUp(div, distance);
      break;
    case "ArrowDown":
      moveDown(div, distance);
      break;
  }
});


document.addEventListener('keydown', function (event) {
  if (event.code == 'KeyZ' && (event.ctrlKey || event.metaKey)) {
    alert('Отменить!')
  }
});


function checkPhoneKey(key) {
  return (key >= '0' && key <= '9') || key == '+' || key == '(' || key == ')' || key == '-' ||
    key == 'ArrowLeft' || key == 'ArrowRight' || key == 'Delete' || key == 'Backspace';
}
{/* <input onkeydown="return checkPhoneKey(event.key)" placeholder="Введите телефон" type="tel"></input> */ }