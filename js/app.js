/** Virtual KeyBoard */
"use strict"

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
  keyboard = {};
  textArea = {};
  static board = {};
  static pressShift = false;
  static pressCapsLock = false;
  static arrow = ["ArrowLeft", "ArrowUp", "ArrowDown", "ArrowRight"];

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
    this.repl.innerHTML = `The keyboard was created in the "Windows" operating system, <br>to switch the keyboard language - left Ctrl + Alt on keyboard, <br>Win- on screen keyboard`;
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
      this.addRow(keyData.en);
    } else {
      this.addRow(keyData.ru);
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
    Keyboard.board = this.keyboard;
    // ------------Клавиатура---------------------------
    // document.addEventListener('keydown', this.keyDown);
    // document.addEventListener('keyup', this.keyUp);
    document.addEventListener('keydown', (event) => {
      this.keyDown(event);
    });
    document.addEventListener('keyup', (event) => {
      this.keyUp(event);
    });
    this.keyboard.addEventListener('mousedown', (event) => {
      let press = event.target.parentElement.dataset.key;
      switch (press) {
        case "Shift":
          Keyboard.pressShift = true;
          Keyboard.downShift("pressShift");
          return;
      }
    });

    this.keyboard.addEventListener('mouseup', (event) => {
      let press = event.target.parentElement.dataset.key;
      switch (press) {
        case "Shift":
          Keyboard.pressShift = false;
          Keyboard.downShift("pressShift");
          return;
      }
    });

    // ----------Экранная клавиатура-------------------
    this.keyboard.addEventListener('click', (event) => {
      this.keyClick(event);
    }, true);

    // console.log('***********this.keyboard = ', this.keyboard);
    // console.log('********this.textArea = ', this.textArea);

  }

  addRow(keys) {
    // keyData.en.forEach((item, i) => {
    keys.forEach((item, i) => {
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
      item.value == "Del" ||
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
    // if (item.value == "AltLeft") { Keyboard.keyAltLeft = element; }
    // if (item.value == "ControlLeft") { Keyboard.keyCtrlLeft = element; }
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
    // Клавиатура
    if (event.repeat) return;
    console.log(' *********keyDown**********');
    console.log(event);
    console.log(event.type);
    console.log(event.key);
    console.log(event.code);
    // console.log('**** KeyDown  this.keyboard = ', this.keyboard);
    // event.stopImmediatePropagation();
    // this.textArea.focus();

    if (event.type === 'keydown') event.preventDefault();
    // ------------New Lang------------
    if ((event.code == "AltLeft" && event.ctrlKey) ||
      (event.code == "ControlLeft" && event.altKey)) {
      this.setLanguage();
      Keyboard.lightKey("ControlLeft");
      Keyboard.lightKey("AltLeft");
    } else {
      Keyboard.lightKey(event.code);
    }

    // ---------Shift----------
    if (event.key == 'Shift') {
      Keyboard.pressShift = true;
      Keyboard.downShift("pressShift");
    }
    //--------CapsLock---------
    if (event.key == 'CapsLock') {
      Keyboard.pressCapsLock = !Keyboard.pressCapsLock;
      console.log('========== Keyboard.pressCapsLock= ', Keyboard.pressCapsLock);
      Keyboard.downShift("pressCapsLock");
    }
  }

  keyUp(event) {
    if (event.repeat) return;
    console.log(' *********keyUP**********');
    console.log(event);
    console.log(event.type);

    if ((event.code == "AltLeft" && event.ctrlKey) ||
      (event.code == "ControlLeft" && event.altKey)) {

      Keyboard.lightKey("ControlLeft");
      Keyboard.lightKey("AltLeft");
    } else {
      if (event.code != 'CapsLock') {
        Keyboard.lightKey(event.code);
      }
    }

    if (event.key == 'Shift') {
      Keyboard.pressShift = false;
      Keyboard.downShift("pressShift");
    }
  }

  keyClick(event) {
    console.log(' *********keyClick**********');
    console.log(' ****keyClick event= ', event);
    console.log(event.type);
    console.log('event.target.parentElement.dataset.key = ', event.target.parentElement.dataset.key);

    event.stopImmediatePropagation();
    if (event.target.tagName != 'SPAN') { return };
    const pressKey = event.target.tagName;
    if (pressKey != "SPAN") { return };
    if (pressKey == "SPAN" && event.target.parentElement.dataset.key != undefined) {
      // console.log(' SPAN event.target.parentElement.dataset.key=', event.target.parentElement.dataset.key);
      // console.log(' event.target.parentElement.classList.contains(input)= ', event.target.parentElement.dataset.class);
      if (event.target.parentElement.dataset.class == "input") {
        // this.textArea.value = this.textArea.value + event.target.parentElement.dataset.key;
        this.textArea.value = this.textArea.value + event.target.textContent;
      } else if (event.target.parentElement.dataset.class == "special") {
        this.clickSpecial(event);
      }
    }
    // this.keyboard.blur(); // убрать фокус с клавиатуры
    // this.textArea.focus(); // фокус на клавиатуру
    this.textArea.selectionStart = this.textArea.value.length; // курсор - за последний символ value
  }

  clickSpecial(event) {
    let press = event.target.parentElement.dataset.key;
    console.log('press = ', press);
    switch (press) {
      case "Win":
        console.log('====clickSpecial  Win"= ');
        this.setLanguage();
        Keyboard.lightKey(event.code);
        Keyboard.lightKey(event.code);
        return;

      case "CapsLock":
        Keyboard.pressCapsLock = !Keyboard.pressCapsLock;
        console.log('clickSpecial=== Keyboard.pressCapsLock= ', Keyboard.pressCapsLock);
        Keyboard.downShift("pressCapsLock");
        return;
    };

  }
  mouseDown(event) {
    function pressKey(item) {

      item.setAttribute('data-pressed', 'on');
      setTimeout(function () {
        item.removeAttribute('data-pressed');
      }, 500);
    }

  }

  setLanguage() {
    console.log('====setLanguage = ', this.language);
    if (this.language == 'en') {
      this.language = 'ru'
    } else {
      this.language = 'en'
    };
    localStorage.setItem('lang', this.language);
    // ----------Смена раскладки клавиатуры------
    Keyboard.updateKeys(this.language);
  }

  static downShift(pressed) {
    // console.log('*** downShift Keyboard.pressShift = ', Keyboard.pressShift);
    // const AllKey = this.keyboard.querySelectorAll(".keyboard .key");

    const AllKey = document.querySelectorAll(".keyboard .key");
    AllKey.forEach((item) => {
      if (item.dataset.class == "input" && !Keyboard.arrow.includes(item.dataset.code)) {
        // if (Keyboard.pressShift || Keyboard.pressCapsLock) {
        switch (pressed) {
          case 'pressShift':
            if (Keyboard.pressShift) {
              item.querySelector("span").textContent = item.dataset.shift;
            } else if (!Keyboard.pressShift) {
              item.querySelector("span").textContent = item.dataset.key;
            }
            break;
          case 'pressCapsLock':
            if (Keyboard.pressCapsLock) {
              item.querySelector("span").textContent = item.dataset.shift;
            } else if (!Keyboard.pressCapsLock) {
              item.querySelector("span").textContent = item.dataset.key;
            }
            break;
        }
      }
    })
  }

  static updateKeys(lang) {
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
  static lightKey(downkey1, downkey2) {
    let allKeys = document.querySelectorAll(".key");
    allKeys.forEach((item) => {
      if (item.dataset.code == downkey1 || item.dataset.code == downkey2) {
        item.classList.toggle("down-key");
        return;
      }
    })
  }
  // ------------end of class---------
}




window.addEventListener('resize', function (e) {
  size();
});

document.addEventListener("DOMContentLoaded", function () {
  let lang = localStorage.getItem('lang');
  let newBoard = new Keyboard();
  newBoard.init();
  Keyboard.updateKeys(lang);
  newBoard.activate();
  size();
  // console.log('******* newBoard = ', newBoard);
  // console.log('******* newBoard.keyboard= ', newBoard.keyboard);

});

function size() {
  const keyboard = document.querySelector('.keyboard');
  let size = keyboard.parentNode.clientWidth / 60 + 7;
  // console.log('size = ', size);
  // console.log('keyboard.parentNode.clientWidth = ', keyboard.parentNode.clientWidth);
  let rowsColSpecial = document.querySelectorAll(".keyboard .key[data-class=\"special\"]");
  rowsColSpecial.forEach((item) => {
    item.style.fontSize = size / 2 + 'px';
  })
  keyboard.style.fontSize = size + 'px';
  let row0FirstCol = document.querySelector(".row0 .key:first-child");
  row0FirstCol.style.fontSize = size + 'px';
}
