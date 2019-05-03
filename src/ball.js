import Brain from "/src/cpuBrain";

export default class Ball {
  constructor(w, h, x, y, radius, speed, ctx, cpu) {
    this.game_height = h;
    this.game_width = w;

    this.x = x;
    this.y = y;
    this.radius = radius;
    this.size = radius * 2;
    this.color = "#000000";
    this.strokeColor = "#000000";
    this.speed = speed;
    this.ctx = ctx;
    this.dt = 0;
    this.cpu = cpu;
    this.alive = true;
    this.xp = 1;
    this.setSpecial();
  }

  setSpecial() {
    let set = Math.random() * 3;
    if (set == 0) {
      this.xp = 3;
      this.color = "#8A2BE2";
    }
  }

  setSize(size) {
    this.size = size;
    this.radius = this.size / 2;
  }

  setColor(color) {
    this.color = color;
  }

  setY(y) {
    this.y = y;
  }

  getX() {
    return this.x;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    this.ctx.strokeStyle = this.strokeColor;
    this.ctx.stroke();

    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }

  move(xV, yV) {
    xV *= this.speed;
    yV *= this.speed;
    this.x += xV / this.dt;
    this.y += yV / this.dt;
    this.checkBounds();
  }

  checkBounds() {
    let boundX = this.game_width - this.size;
    let boundY = this.game_height - this.size;
    if (this.x <= this.size) this.x = boundX - 1;
    if (this.x >= boundX) this.x = this.size;
    if (this.y <= this.size) this.y = boundY - 1;
    if (this.y >= boundY) this.y = this.size;
  }

  update(dt, user) {
    if (!dt) return;

    if (this.alive == true) {
      this.dt = dt;

      if (this.cpu == true) {
        new Brain(this.game_width, this.game_height, user, this);

        let d = this.dist(user.x, this.x, user.y, this.y);
        if (d < this.size + user.size) this.touch(user);
      }
      this.draw();
    }
  }

  dist(x1, x2, y1, y2) {
    let a = x1 - x2;
    let b = y1 - y2;

    let c = Math.sqrt(a * a + b * b);
    return c;
  }

  touch(user) {
    if (this.size <= user.size) {
      this.setSize(this.size - this.xp);
      user.setSize(user.size + this.xp);
    } else user.setSize(user.size - 5);

    if (user.size < 4) user.alive = false;
    if (this.size < 4) this.alive = false;
  }
}
