export default class Brain {
  constructor(game_width, game_height, user, cpu) {
    let x = 0;
    let y = 0;
    let distX = user.x - cpu.x;
    let distY = user.y - cpu.y;

    if (distX < 0) distX *= -1;
    if (distY < 0) distY *= -1;

    if (user.radius < cpu.radius) {
      // If cpu is bigger than user
      if (user.x > cpu.x) x = 1;
      if (user.x < cpu.x) x = -1;
      if (user.y > cpu.y) y = 1;
      if (user.y < cpu.y) y = -1;
      cpu.setColor("#FF0000");
      // If User is bigger than cpu
    } else if (user.radius > cpu.radius) {
      cpu.setColor("#5DFC0A");
      if (distX <= game_width / 2 && distY < game_height / 2) {
        if (user.x > cpu.x) x = -1;
        if (user.x < cpu.x) x = 1;
        if (user.y > cpu.y) y = -1;
        if (user.y < cpu.y) y = 1;
      }
    }
    cpu.move(x, y);
  }
}
