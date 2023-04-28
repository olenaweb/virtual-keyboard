import keyData from './keyData.js';
console.log(' keyData= ', keyData);
// console.log('keyData.en[0] = ', keyData.en[0], keyData.en[0].code);
// keyData.en.forEach((item, i) => {
//   console.log('item i= ', i, item);
// })

class Keyboard {
  language = 'ru';
  pressControl = false;
  pressAlt = false;
  keyboard;
  textArea;
  constructor() {
    if (localStorage.getItem('lang') == 'ru') {
      this.language = 'ru';
    } else {
      this.language = 'en';
    }
    localStorage.setItem('lang', this.language);
  }

  init() {
    this.title = document.createElement('h1');
    this.title.textContent = 'RSS Virtual Keyboard';
    this.write = document.createElement('div');
    this.write.classList.add("write");

    this.textArea = document.createElement('textarea');
    this.textArea.classList.add("output");
    this.textArea.setAttribute("autofocus", " ");
    this.textArea.setAttribute("spellcheck", false);
    this.write.append(this.textArea);

    this.repl = document.createElement('p');
    this.repl.innerHTML = `The keyboard was created in the "Windows" operating system, <br>to switch the keyboard language - left Ctrl + Alt`;
    this.repl.classList.add("repl");

    this.keyboard = document.createElement('div');
    this.keyboard.classList.add("keyboard");

    this.row0 = document.createElement('div');
    this.row0.classList.add("keyboard-row");
    this.row0.classList.add("row0");
    this.row0.setAttribute("data-row", "0");

    this.row1 = document.createElement('div');
    this.row1.classList.add("keyboard-row");
    this.row1.classList.add("row1");
    this.row1.setAttribute("data-row", "1");

    this.row2 = document.createElement('div');
    this.row2.classList.add("keyboard-row");
    this.row2.classList.add("row2");
    this.row2.setAttribute("data-row", "2");

    this.row3 = document.createElement('div');
    this.row3.classList.add("keyboard-row");
    this.row3.classList.add("row3");
    this.row3.setAttribute("data-row", "3");

    this.row4 = document.createElement('div');
    this.row4.classList.add("keyboard-row");
    this.row4.classList.add("row4");
    this.row4.setAttribute("data-row", "4");

    if (this.language == 'en') {
      this.addEnRow();
    } else {
      this.addRuRow();
    }

    this.keyboard.append(this.row0);
    this.keyboard.append(this.row1);
    this.keyboard.append(this.row2);
    this.keyboard.append(this.row3);
    this.keyboard.append(this.row4);

    document.body.append(this.title);
    document.body.append(this.write);
    document.body.append(this.keyboard);
    document.body.append(this.repl);

    document.addEventListener('keydown', this.keyDown);
    document.addEventListener('keyup', this.keyUp);
    // this.keyboard.addEventListener('mousedown', this.mouseDown);
    // this.keyboard.addEventListener('mouseup', this.mouseUp);
    this.keyboard.addEventListener('click', (event) => {
      event.stopImmediatePropagation();
      if (event.target.tagName != 'SPAN' && event.target.tagName != 'DIV') { return };
      const pressKey = event.target.tagName;
      if (pressKey != "DIV" && pressKey != "SPAN") { return };
      if (pressKey == "SPAN" && event.target.parentElement.dataset.key != undefined) {
        // console.log(' SPAN event.target.parentElement.dataset.key=', event.target.parentElement.dataset.key);
        // console.log(' event.target.parentElement.classList.contains(input)= ', event.target.parentElement.dataset.class);
        if (event.target.parentElement.dataset.class == "input") {
          this.textArea.value = this.textArea.value + event.target.parentElement.dataset.key;
        }
      } else if (pressKey == "DIV" && event.target.parentElement.dataset.key != undefined) {
        // console.log(' DIV event.target.dataset.key=', event.target.dataset.key);
        if (event.target.dataset.class == "input") {
          this.textArea.value = this.textArea.value + event.target.dataset.key;
        }
      }
      // this.keyboard.blur();
      this.textArea.focus();
      this.textArea.selectionStart = this.textArea.value.length;

    }, true);

    console.log('***********this.keyboard = ', this.keyboard);
    console.log('********this.textArea = ', this.textArea);

  }

  addEnRow() {
    keyData.en.forEach((item, i) => {
      let letter = this.createKey(item);
      switch (item.row) {
        case 0:
          this.row0.append(letter);
          break;
        case 1:
          this.row1.append(letter);
          break;
        case 2:
          this.row2.append(letter);
          break;
        case 3:
          this.row3.append(letter);
          break;
        case 4:
          this.row4.append(letter);
          break;
      }
    })

  }

  addRuRow() {
    keyData.ru.forEach((item, i) => {
      let letter = this.createKey(item);
      switch (item.row) {
        case 0:
          this.row0.append(letter);
          break;
        case 1:
          this.row1.append(letter);
          break;
        case 2:
          this.row2.append(letter);
          break;
        case 3:
          this.row3.append(letter);
          break;
        case 4:
          this.row4.append(letter);
          break;
      }
    })
  }

  createKey(item) {
    let element = document.createElement('div');
    element.classList.add("key");
    // item.value == "⇦" ||
    //  item.value == "⇧" ||
    //   item.value == "⇩" ||
    //   item.value == "⇨") 
    if (item.value == "Backspace" ||
      item.value == "Tab" ||
      item.value == "Delete" ||
      item.value == "CapsLock" ||
      item.value == "Enter" ||
      item.value == "Shift" ||
      item.value == "Ctrl" ||
      item.value == "Alt" ||
      item.value == "Win" ||
      item.value == " "
    ) {
      element.setAttribute("data-class", "special")
    } else {
      element.setAttribute("data-class", "input");
    }
    element.setAttribute("data-key", item.value);
    element.setAttribute("data-shift", item.shift);
    element.setAttribute("data-code", item.code);
    let span = document.createElement('span');
    span.textContent = item.value;
    element.append(span);
    return element;
  }

  activate() {
    this.write.focus();
    this.write.addEventListener('blur', () => {
      this.write.focus();
    });

    this.textArea.addEventListener("keydown", function (event) {
      if (event.code == "Enter") console.log('event.code == Enter');
    })

  }

  keyDown(event) {
    // console.log(event); 
    // console.log(event.type);
    // event.stopImmediatePropagation();
    // this.textArea.focus();

    if (event.repeat) return;
    console.log(event.key);
    console.log(event.code);
    // if (event.type === 'keydown') event.preventDefault();
    // ------------New Lang------------
    if ((event.code == "AltLeft" && event.ctrlKey) ||
      (event.code == "ControlLeft" && event.altKey)) {
      if (this.language == 'en') {
        this.language = 'ru'
      } else {
        this.language = 'en'
      };
      localStorage.setItem('lang', this.language);
      // this.pressControl = false;
      // this.pressAlt = false;
      updateKeys(this.language);
      // lightKey("ControlLeft", "AltLeft");
    } else {
      lightKey(event.code);
    }
  }

  keyUp(event) {
    if ((event.code == "AltLeft" && event.ctrlKey) ||
      (event.code == "ControlLeft" && event.altKey)) {
      lightKey("ControlLeft", "AltLeft");
    } else {
      lightKey(event.code);
    }

  }


  mouseDown(event) {
    function pressKey(item) {

      item.setAttribute('data-pressed', 'on');
      setTimeout(function () {
        item.removeAttribute('data-pressed');
      }, 500);
    }

  }
  // ------------end of class---------
}
// let changKeys = document.querySelectorAll(".key")

function updateKeys(lang) {
  let changKeys = document.querySelectorAll(".key");
  console.log('lang = ', lang);
  if (lang == "en") {
    changKeys.forEach((item) => {
      if (item.dataset.class == "input") {
        const itemCode = item.dataset.code;
        let index = keyData.en.findIndex(e => e.code === itemCode);
        if (index !== -1) {
          item.querySelector('span').textContent = keyData.en[index].value;
          item.setAttribute("data-key", keyData.en[index].value);
          item.setAttribute("data-shift", keyData.en[index].shift);
        }
      }
    })
  } else {
    changKeys.forEach((item) => {
      if (item.dataset.class == "input") {
        const itemCode = item.dataset.code;
        let index = keyData.ru.findIndex(e => e.code === itemCode);
        if (index !== -1) {
          item.querySelector('span').textContent = keyData.ru[index].value;
          item.setAttribute("data-key", keyData.ru[index].value);
          item.setAttribute("data-shift", keyData.ru[index].shift);
        }
      }
    })
  }
}

function lightKey(downkey1, downkey2) {
  let allKeys = document.querySelectorAll(".key");
  allKeys.forEach((item) => {
    if (item.dataset.code == downkey1 || item.dataset.code == downkey2) {
      item.classList.toggle("down-key");
    }
  })
}

function lightKey1(downkey) {
  let allKeys = document.querySelectorAll(".key");
  allKeys.forEach((item) => {
    if (item.dataset.code == downkey && item.classList.contains("down-key")) {
      // item.style.background = "#c9c3c3";
      item.classList.remove("down-key");
    } else if (item.dataset.code == downkey && !item.classList.contains("down-key")) {
      // item.style.background = "#dbc607";
      item.classList.add("down-key");
    }
  })
}



window.addEventListener('resize', function (e) {
  size();
});

document.addEventListener("DOMContentLoaded", function () {
  let board = new Keyboard();
  console.log('board = ', board);
  board.init();
  board.activate();
  size();
  let lang = localStorage.getItem('lang');
  updateKeys(lang);
  console.log('******* board.keyboard= ', board.keyboard);

});

function size() {
  const keyboard = document.querySelector('.keyboard');
  let size = keyboard.parentNode.clientWidth / 60 + 7;
  // console.log('size = ', size);
  // console.log('keyboard.parentNode.clientWidth = ', keyboard.parentNode.clientWidth);
  keyboard.style.fontSize = size + 'px';
  let row0FirstCol = document.querySelector(".row0 .key:first-child");
  row0FirstCol.style.fontSize = size + 'px';
  let row0LastCol = document.querySelector(".row0 .key:last-child");
  row0LastCol.style.fontSize = size / 2 + 'px';
  let row1FirstCol = document.querySelector(".row1 .key:first-child");
  row1FirstCol.style.fontSize = size / 2 + 'px';
  let row1LastCol = document.querySelector(".row1 .key:last-child");
  row1LastCol.style.fontSize = size / 2 + 'px';
  let row2FirstCol = document.querySelector(".row2 .key:first-child");
  row2FirstCol.style.fontSize = size / 2 + 'px';
  let row2LastCol = document.querySelector(".row2 .key:last-child");
  row2LastCol.style.fontSize = size / 2 + 'px';
  let row3FirstCol = document.querySelector(".row3 .key:first-child");
  row3FirstCol.style.fontSize = size / 2 + 'px';
  let row3LastCol = document.querySelector(".row3 .key:last-child");
  row3LastCol.style.fontSize = size / 2 + 'px';
  // ---------4---------
  let row4FirstCol = document.querySelector(".row4 .key:first-child");
  row4FirstCol.style.fontSize = size / 2 + 'px';
  let row4LastCol = document.querySelector(".row4 .key:last-child");
  row4LastCol.style.fontSize = size / 2 + 'px';
  let row4Nth2 = document.querySelector(".row4 .key:nth-child(2)");
  row4Nth2.style.fontSize = size / 2 + 'px';
  let row4Nth3 = document.querySelector(".row4 .key:nth-child(3)");
  row4Nth3.style.fontSize = size / 2 + 'px';
  let row4Nth5 = document.querySelector(".row4 .key:nth-child(5)");
  row4Nth5.style.fontSize = size / 2 + 'px';

}
