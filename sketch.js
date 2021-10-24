const w = 600;
const h = 600;
const arena = 15;
const sc = 300 / arena;
let product = {x:-1,y:-1};
class Snake {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dir = "x";
    this.tail = [];
  }
  addTail() {
    snake.tail.push({ x: this.x, y: this.y });
  }
  update() {
    if (product.x == this.x && product.y == this.y) {
      this.addTail();
      product = {
        x:Math.floor(Math.random()*(-arena/2+1)+arena-1),
        y:Math.floor(Math.random()*(-arena/2+1)+arena-1)
      };
      console.log(product)
    }
    for (let i = this.tail.length - 1; i > 0; i--) {
      this.tail[i].x = this.tail[i - 1].x;
      this.tail[i].y = this.tail[i - 1].y;
    }
    if (this.tail.length > 0) {
      this.tail[0].x = this.x;
      this.tail[0].y = this.y;
    }
    if (this.dir == "y") {
      this.y += 1;
    }
    if (this.dir == "x") {
      this.x += 1;
    }
    if (this.dir == "-y") {
      this.y -= 1;
    }
    if (this.dir == "-x") {
      this.x -= 1;
    }
    if (
      this.x > Math.floor(arena / 2) - 2 ||
      this.x < -Math.floor(arena / 2) + 2
    ) {
      if (this.x > Math.floor(arena / 2) - 1) {
        this.x = -Math.floor(arena / 2) + 1;
      }
      if (this.x < -Math.floor(arena / 2) + 1) {
        this.x = Math.floor(arena / 2) - 1;
      }
    }
    if (
      this.y > Math.floor(arena / 2) - 2 ||
      this.y < -Math.floor(arena / 2) + 2
    ) {
      if (this.y > Math.floor(arena / 2) - 1) {
        this.y = -Math.floor(arena / 2) + 1;
      }
      if (this.y < -Math.floor(arena / 2) + 1) {
        this.y = Math.floor(arena / 2) - 1;
      }
    }
  }
}
const snake = new Snake(0, 0);
function setup() {
  createCanvas(w, h, WEBGL);
  frameRate(2);
}
let a = 0.4;
function draw() {
  background(255);
  noStroke();
  rectMode(CENTER);
  rotateY(a);
  rotateX(a * 0.5);
  rotateZ(a * 0.8);
  snake.update();
  for (
    let i = -Math.floor(Math.floor(arena / 2));
    i <= Math.floor(Math.floor(arena / 2));
    i++
  ) {
    for (
      let j = -Math.floor(Math.floor(arena / 2));
      j <= Math.floor(Math.floor(arena / 2));
      j++
    ) {
      if (i == snake.x && j == snake.y) {
        fill(100);
        push();
        translate(i * sc, j * sc);
        box(sc, sc, sc);
        pop();
      } else if (snake.tail.some((e) => e.x == i && e.y == j)) {
        fill(100);
        push();
        translate(i * sc, j * sc);
        box(sc, sc, sc);
        pop();
      } else if (i == product.x && j == product.y) {
        fill(100, 0, 22);
        push();
        translate(i * sc, j * sc);
        box(sc, sc, sc);
        pop();
      } else if (
        Math.abs(i) == Math.floor(Math.floor(arena / 2)) ||
        Math.abs(j) == Math.floor(Math.floor(arena / 2))
      ) {
        fill(112, 201, 20, 80);
        push();
        translate(i * sc, j * sc);
        box(sc, sc, sc);
        pop();
      }
    }
  }
}
function keyPressed() {
  if (key == "ArrowRight") {
    snake.dir = "x";
  }
  if (key == "ArrowLeft") {
    snake.dir = "-x";
  }
  if (key == "ArrowUp") {
    snake.dir = "-y";
  }
  if (key == "ArrowDown") {
    snake.dir = "y";
  }
}
function mousePressed() {
  snake.addTail();
  console.log(product)
}
