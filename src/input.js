export default class InputHandler {
  constructor(user) {
    this.user = user;
    let x = 0;
    let y = 0;

    document.addEventListener("keydown", event => {
      x = 0;
      y = 0;

      switch (event.keyCode) {
        case 37:
          x = -1;
          break;
        case 38:
          y = -1;
          break;
        case 39:
          x = 1;
          break;
        case 40:
          y = 1;
          break;
        case 13:
          user.setSize(user.size + 30);
          user.alive = true;
          break;
      }
      user.move(x, y);
    });
  }
}
