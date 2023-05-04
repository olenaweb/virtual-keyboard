import keyData from "./keyData.js";

class Keyboard {
  language = "en";

  keyboard = {};

  textArea = {};

  static board = {};

  static pressShift = false;

  static pressCapsLock = false;

  static arrow = ["ArrowLeft", "ArrowUp", "ArrowDown", "ArrowRight"];

  constructor() {
    if (localStorage.getItem("lang") === "ru") {
      this.language = "ru";
    } else {
      this.language = "en";
    }
    localStorage.setItem("lang", this.language);
  }

  init() {
    this.title = document.createElement("h1");
    this.title.textContent = "RSS Virtual Keyboard";
    this.write = document.createElement("div");
    this.write.classList.add("write");

    this.textArea = document.createElement("textarea");
    this.textArea.classList.add("output");
    this.textArea.setAttribute("autofocus", " ");
    this.textArea.setAttribute("spellcheck", false);
    this.write.append(this.textArea);

    this.repl = document.createElement("p");
    this.repl.innerHTML = "The keyboard was created in the \"Windows\" operating system, <br>to switch the keyboard language press left Ctrl + Alt - on keyboard, <br>Win - on screen keyboard";
    this.repl.classList.add("repl");

    this.keyboard = document.createElement("div");
    this.keyboard.classList.add("keyboard");

    this.row0 = document.createElement("div");
    this.row0.classList.add("keyboard-row");
    this.row0.classList.add("row0");
    this.row0.setAttribute("data-row", "0");

    this.row1 = document.createElement("div");
    this.row1.classList.add("keyboard-row");
    this.row1.classList.add("row1");
    this.row1.setAttribute("data-row", "1");

    this.row2 = document.createElement("div");
    this.row2.classList.add("keyboard-row");
    this.row2.classList.add("row2");
    this.row2.setAttribute("data-row", "2");

    this.row3 = document.createElement("div");
    this.row3.classList.add("keyboard-row");
    this.row3.classList.add("row3");
    this.row3.setAttribute("data-row", "3");

    this.row4 = document.createElement("div");
    this.row4.classList.add("keyboard-row");
    this.row4.classList.add("row4");
    this.row4.setAttribute("data-row", "4");

    if (this.language === "en") {
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
    document.addEventListener("keydown", (event) => {
      this.keyDown(event);
    });
    document.addEventListener("keyup", (event) => {
      this.keyUp(event);
    });

    // ----------Экранная клавиатура-------------------
    this.keyboard.addEventListener("mousedown", (event) => {
      const press = event.target.parentElement.dataset.key;
      switch (press) {
        case "Shift":
          Keyboard.pressShift = true;
          Keyboard.downShift("pressShift");
          break;
        case "CapsLock":
          Keyboard.lightKey("CapsLock");
          break;
        default:
      }
    });

    this.keyboard.addEventListener("mouseup", (event) => {
      const press = event.target.parentElement.dataset.key;
      switch (press) {
        case "Shift":
          Keyboard.pressShift = false;
          Keyboard.downShift("pressShift");
          break;
        default:
      }
    });

    this.keyboard.addEventListener("click", (event) => {
      this.keyClick(event);
    }, true);
  }

  addRow(keys) {
    keys.forEach((item) => {
      const letter = this.createKey(item);
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
        default:
      }
    });
  }

  createKey(item) {
    this.element = document.createElement("div");
    this.element.classList.add("key");
    // item.value === "⇦" ||
    //  item.value === "⇧" ||
    //   item.value === "⇩" ||
    //   item.value === "⇨")
    if (item.value === "Backspace"
      || item.value === "Tab"
      || item.value === "Delete"
      || item.value === "CapsLock"
      || item.value === "Enter"
      || item.value === "Shift"
      || item.value === "Ctrl"
      || item.value === "Alt"
      || item.value === "Win"
      || item.value === " "
    ) {
      this.element.setAttribute("data-class", "special");
    } else {
      this.element.setAttribute("data-class", "input");
    }
    this.element.setAttribute("data-key", item.value);
    this.element.setAttribute("data-shift", item.shift);
    this.element.setAttribute("data-code", item.code);
    this.span = document.createElement("span");
    this.span.textContent = item.value;
    this.element.append(this.span);
    return this.element;
  }

  areaFocus() {
    this.write.focus();
    this.write.addEventListener("blur", () => {
      this.write.focus();
    });
  }

  keyDown(event) {
    // Клавиатура
    if (event.repeat) { return; }
    if (event.type === "keydown") { event.preventDefault(); }
    event.stopImmediatePropagation();

    // console.log(" *********keyDown**********");
    // console.log("event=", event);
    // console.log("event.type=", event.type);
    // console.log("event.key=", event.key);
    // console.log("event.code=", event.code);
    if (event.ctrlKey && event.code === "KeyC") {
      return;
    }
    if (event.code === "MetaLeft") {
      return;
    }

    const switchLang = (event.code === "AltLeft" && event.ctrlKey)
      || (event.code === "ControlLeft" && event.altKey);
    // ------------New Lang------------
    if (switchLang) {
      const keyLang1 = Keyboard.board.querySelector(".keyboard .key[data-code=\"AltLeft\"]");
      const keyLang2 = Keyboard.board.querySelector(".keyboard .key[data-code=\"ControlLeft\"]");
      keyLang1.style.background = "#deca16";
      keyLang2.style.background = "#deca16";
      this.setLanguage();
    } else {
      Keyboard.lightKey(event.code);
    }

    // ---------Shift----------
    if (event.key === "Shift") {
      Keyboard.pressShift = true;
      Keyboard.downShift("pressShift");
    }
    // --------CapsLock--------

    if (event.key === "CapsLock") {
      Keyboard.pressCapsLock = !Keyboard.pressCapsLock;
      Keyboard.downShift("pressCapsLock");
    }

    const screenKey = this.isKey(event.code);
    const element = this.keyboard.querySelector(`[data-code=${event.code}]`);
    if (!element) return;

    if (screenKey.dataset.class === "special"
      && (event.key !== "Shift"
        && event.key !== "CapsLock"
        && event.key !== "Control"
        && event.key !== "Alt")
    ) {
      this.fillOutput(screenKey.dataset.code);
    }

    // ----клавиша на экранной клавиатуре----
    if (screenKey.dataset.class === "input") {
      this.fillOutput(screenKey.querySelector("span").textContent);
    }
  }

  isKey(downkey) {
    const allKeys = this.keyboard.querySelectorAll(".key");
    let findKey;
    allKeys.forEach((item) => {
      if (item.dataset.code === downkey) {
        findKey = item;
      }
    });
    return findKey;
  }

  keyUp(event) {
    if (event.repeat) { return; }
    // console.log(" *********keyUP**********");
    // console.log("event=", event);
    // console.log("event.type=", event.type);
    if (event.ctrlKey && event.code === "KeyC") {
      return;
    }
    if (event.code === "MetaLeft") {
      return;
    }
    const switchLang = (event.code === "AltLeft" && event.ctrlKey)
      || (event.code === "ControlLeft" && event.altKey);

    if (switchLang) {
      const keyLang1 = Keyboard.board.querySelector(".keyboard .key[data-code=\"AltLeft\"]");
      const keyLang2 = Keyboard.board.querySelector(".keyboard .key[data-code=\"ControlLeft\"]");
      keyLang1.style.removeProperty("background");
      keyLang2.style.removeProperty("background");
    } else if (event.code !== "CapsLock") {
      Keyboard.lightKey(event.code);
    }

    if (event.key === "Shift") {
      Keyboard.pressShift = false;
      Keyboard.downShift("pressShift");
    }
  }

  keyClick(event) {
    if (event.repeat) return;
    if (event.type !== "click") return;

    // console.log(" *********keyClick**********");
    // console.log(" ****keyClick event= ", event);
    // console.log(event.type);

    event.stopImmediatePropagation();
    if (event.target.tagName !== "SPAN") { return; }
    const pressKey = event.target.tagName;
    if (pressKey !== "SPAN") { return; }

    if (pressKey === "SPAN" && event.target.parentElement.dataset.key !== undefined) {
      if (event.target.parentElement.dataset.class === "input") {
        this.fillOutput(event.target.textContent);
      } else if (event.target.parentElement.dataset.class === "special") {
        this.clickSpecial(event);
      }
    }
    this.keyboard.blur(); // убрать фокус с клавиатуры
    this.textArea.focus(); // фокус на клавиатуру
    // this.textArea.selectionStart = this.textArea.value.length;
  }

  clickSpecial(event) {
    const press = event.target.parentElement.dataset.key;

    switch (press) {
      case "Win":
        this.setLanguage();
        Keyboard.lightKey(event.code);
        Keyboard.lightKey(event.code);
        break;

      case "CapsLock":
        Keyboard.pressCapsLock = !Keyboard.pressCapsLock;
        Keyboard.downShift("pressCapsLock");
        break;
      case "Tab":
        this.fillOutput("Tab");
        break;
      case "Enter":
        this.fillOutput("Enter");
        break;
      case "Delete":
        this.fillOutput("Delete");
        break;
      case "Backspace":
        this.fillOutput("Backspace");
        break;
      case " ":
        this.fillOutput("Space");
        break;
      default:
    }
  }

  fillOutput(press) {
    let outStr = this.textArea.value;
    let posCursor = this.textArea.selectionStart;
    const leftText = this.textArea.value.slice(0, posCursor);
    const rightText = this.textArea.value.slice(posCursor);
    let start = 0;
    let end = 0;
    const spac = " ";
    switch (press) {
      case "Tab":
        outStr = `${leftText}\t${rightText}`;
        posCursor += 1;
        break;
      case "Enter":
        outStr = `${leftText}\n${rightText}`;
        posCursor += 1;
        break;
      case "Backspace":
        outStr = `${leftText.slice(0, -1)}${rightText}`;
        posCursor -= 1;
        break;
      case "Delete":
        // -----удаление выделенной части------
        start = this.textArea.selectionStart;
        end = this.textArea.selectionEnd;
        if (start !== end && start !== undefined && end !== undefined) {
          outStr = `${outStr.slice(0, start)}${outStr.slice(end)}`;
          break;
        }
        // -----удаление одного символа справа
        outStr = `${leftText}${rightText.slice(1)}`;
        break;
      case "Space":
        outStr = leftText + spac + rightText;
        posCursor += 1;
        break;
      default:
        // ----ввод символа экранной клавиатуры
        outStr = `${leftText}${press}${rightText}`;
        posCursor += 1;
        break;
    }
    this.textArea.value = outStr;
    this.textArea.selectionStart = posCursor;
    this.textArea.selectionEnd = posCursor;
    // this.textarea.scrollTop = this.textarea.scrollHeight;
  }

  setLanguage() {
    if (this.language === "en") {
      this.language = "ru";
    } else {
      this.language = "en";
    }
    localStorage.setItem("lang", this.language);
    // ----------Смена раскладки клавиатуры------
    Keyboard.updateKeys(this.language);
    if (Keyboard.pressCapsLock === true) {
      Keyboard.lightKey("CapsLock");
      Keyboard.pressCapsLock = false;
    }
  }

  static downShift(pressed) {
    const AllKey = document.querySelectorAll(".keyboard .key");
    let span;
    AllKey.forEach((item) => {
      span = item.querySelector("span");
      if (item.dataset.class === "input" && !Keyboard.arrow.includes(item.dataset.code)) {
        switch (pressed) {
          case "pressShift":
            if (Keyboard.pressShift) {
              span.textContent = item.dataset.shift;
            } else if (!Keyboard.pressShift) {
              span.textContent = item.dataset.key;
            }
            break;
          case "pressCapsLock":
            if (Keyboard.pressCapsLock) {
              span.textContent = item.dataset.shift;
            } else if (!Keyboard.pressCapsLock) {
              span.textContent = item.dataset.key;
            }
            break;
          default:
        }
      }
    });
  }

  static updateKeys(lang) {
    const changKeys = document.querySelectorAll(".key");
    let span;
    let language = (lang !== undefined) ? lang : "en";
    if (lang === undefined) { language = "en"; }
    if (language === "en") {
      changKeys.forEach((item) => {
        span = item.querySelector("span");
        if (item.dataset.class === "input") {
          const itemCode = item.dataset.code;
          const index = keyData.en.findIndex((e) => e.code === itemCode);
          if (index !== -1) {
            span.textContent = keyData.en[index].value;
            item.setAttribute("data-key", keyData.en[index].value);
            item.setAttribute("data-shift", keyData.en[index].shift);
          }
        }
      });
    } else {
      changKeys.forEach((item) => {
        span = item.querySelector("span");
        if (item.dataset.class === "input") {
          const itemCode = item.dataset.code;
          const index = keyData.ru.findIndex((e) => e.code === itemCode);
          if (index !== -1) {
            span.textContent = keyData.ru[index].value;
            item.setAttribute("data-key", keyData.ru[index].value);
            item.setAttribute("data-shift", keyData.ru[index].shift);
          }
        }
      });
    }
  }

  static lightKey(downkey) {
    const allKeys = document.querySelectorAll(".key");
    allKeys.forEach((item) => {
      if (item.dataset.code === downkey) {
        item.classList.toggle("down-key");
      }
    });
  }

  static size() {
    const keyboard = document.querySelector(".keyboard");
    const output = document.querySelector(".output");
    const size = keyboard.parentNode.clientWidth / 60 + 7;
    const sizeOutput = size / 1.2;
    keyboard.style.fontSize = `${size.toString()}px`;
    output.style.fontSize = `${sizeOutput.toString()}px`;
    const rowsColSpecial = document.querySelectorAll(".keyboard .key[data-class=\"special\"]");
    rowsColSpecial.forEach((elem) => {
      elem.style.fontSize = `${size / 2}px`;
    });
    const row0FirstCol = document.querySelector(".row0 .key:first-child");
    row0FirstCol.style.fontSize = `${size}px`;
  }
  // ------------end of class---------
}

window.addEventListener("resize", () => {
  Keyboard.size();
});

document.addEventListener("DOMContentLoaded", () => {
  const lang = localStorage.getItem("lang");
  const newBoard = new Keyboard();
  newBoard.init();
  Keyboard.updateKeys(lang);
  newBoard.areaFocus();
  Keyboard.size();
});
