class Floor {
  constructor(ctx, pos, w, h) {
    this.ctx = ctx;
    this.pos = pos;
    this.w = w;
    this.h = h;
  }

  draw() {
    this.ctx.strokeStyle = 'black';
    this.ctx.strokeRect(this.pos.x, this.pos.y, this.w, this.h);
  }
}

export { Floor };