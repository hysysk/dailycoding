const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

class Tile {
  constructor(x, y, scaleX, scaleY, angle) {
    this.x = x;
    this.y = y;
    this.scaleX = scaleX;
    this.scaleY = scaleY;
    this.angle = angle;
    this.w = 125;
    this.h = 100;
  }
  draw() {
    ctx.save();
    ctx.translate(this.x + this.w / 2, this.y + this.h / 2);
    ctx.scale(this.scaleX, this.scaleY);
    ctx.rotate(this.angle);
    ctx.translate(-this.w / 2, -this.h / 2);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, this.h);
    ctx.lineTo(this.w, this.h);
    ctx.lineTo(this.w, 0);
    ctx.closePath();
    ctx.stroke();
    ctx.font = "bold 40px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("F", this.w / 2, this.h / 2);
    ctx.restore();
  }
}

for (let i = 0; i < 4; i++) {
  let tile = new Tile(125 * i, 0, i % 2 === 0 ? 1 : -1, 1, 0);
  tile.draw();
}