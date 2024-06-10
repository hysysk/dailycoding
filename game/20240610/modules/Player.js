import { Vector2 } from "./Vector2.js";

class Player {
  constructor(pos, speed) {
    this.pos = pos;
    this.speed = speed;
    this.maxSpeed = 3;
    this.acceleration = 0.1;
    this.direction = 1;
    this.isJumping = false;
  }

  update(buttons) {
    if (buttons.left.touchedId) {
      this.direction = -1;
      this.speed.sub(new Vector2(this.acceleration, 0));
    } else if (buttons.right.touchedId) {
      this.direction = 1;
      this.speed.add(new Vector2(this.acceleration, 0));
    }

    if (buttons.a.touchedId) {
      if (this.speed.y === 0 && !this.isJumping) {
        this.speed.y = 0;
        this.isJumping = true;
        this.speed.sub(new Vector2(0, 3));
      }
    }

    // Add gravity
    this.speed.add(new Vector2(0, 0.1));

    if (this.speed.y >= 0 && this.isJumping) {
      this.isJumping = false;
    }

    if (this.direction === 1) {
      this.speed.sub(new Vector2(this.acceleration * 0.6, 0));
      if (this.speed.x < 0) {
        this.speed.x = 0;
      }
      if (this.speed.x > this.maxSpeed) {
        this.speed.x = this.maxSpeed;
      }
    } else if (this.direction === -1) {
      this.speed.add(new Vector2(this.acceleration * 0.6, 0));
      if (this.speed.x > 0) {
        this.speed.x = 0;
      }
      if (this.speed.x < -this.maxSpeed) {
        this.speed.x = -this.maxSpeed;
      }
    }
    this.pos.add(this.speed);
  }

  static create(pos) {
    return new Player(pos.add(new Vector2(0, 0)), new Vector2(0, 0));
  }
}

Player.prototype.size = { w: 20, h: 30 };

export { Player };