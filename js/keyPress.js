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
}