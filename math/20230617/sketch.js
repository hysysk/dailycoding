const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

class Tile {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 100);
    ctx.lineTo(125, 100);
    ctx.lineTo(125, 0);
    ctx.closePath();
    ctx.stroke();
    ctx.font = "bold 40px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("F", 62, 50);
    ctx.restore();
  }
}

for (let i = 0; i < 4; i++) {
  let tile = new Tile(i * 125, 0);
  tile.draw();
}