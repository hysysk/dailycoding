import { Vector2 } from "./Vector2.js";

const SPEED_NORMAL_MAX = 1.5;
const SPEED_DASH_MAX = 3;
const JUMP_POWER_NORMAL = 3;
const JUMP_POWER_DASH = 3.8;

class Player {
  constructor(pos, speed) {
    this.pos = pos;
    this.speed = speed;
    this.maxSpeed = SPEED_NORMAL_MAX;
    this.acceleration = 0.1;
    this.direction = 1;
    this.isJumping = false;
    this.isDashing = false;
  }

  update(buttons) {
    if (buttons.left.touchedId) {
      this.direction = -1;
      this.speed.sub(new Vector2(this.acceleration, 0));
      if (this.speed.x < -this.maxSpeed) {
        this.speed.x = -this.maxSpeed;
      }
    } else if (buttons.right.touchedId) {
      this.direction = 1;
      this.speed.add(new Vector2(this.acceleration, 0));
      if (this.speed.x > this.maxSpeed) {
        this.speed.x = this.maxSpeed;
      }
    }

    if (buttons.a.touchedId) {
      if (this.speed.y === 0 && !this.isJumping) {
        this.speed.y = 0;
        this.isJumping = true;
        if (this.isDashing) {
          this.speed.sub(new Vector2(0, JUMP_POWER_DASH));
        } else {
          this.speed.sub(new Vector2(0, JUMP_POWER_NORMAL));
        }
      }
    }

    if (buttons.b.touchedId) {
      this.isDashing = true;

      // Prevent the player from dashing in the air.
      if (!this.isJumping) {
        this.maxSpeed = SPEED_DASH_MAX;
      }
    } else {
      this.maxSpeed = SPEED_NORMAL_MAX;

      // If this flag is changed to false immediately, the player will not be able to dash jump.
      setTimeout(() => {
        this.isDashing = false;
      }, 300);
    }

    // Add gravity
    this.speed.add(new Vector2(0, 0.1));

    if (this.direction === 1) {
      if (!buttons.right.touchedId) {
        this.speed.sub(new Vector2(0.05, 0));
        if (this.speed.x < 0) {
          this.speed.x = 0;
        }
      }

      if (this.speed.x > this.maxSpeed) {
        this.speed.x = this.maxSpeed;
      }
    } else if (this.direction === -1) {
      if (!buttons.left.touchedId) {
        this.speed.add(new Vector2(0.05, 0));
        if (this.speed.x > 0) {
          this.speed.x = 0;
        }
      }
      if (this.speed.x < -this.maxSpeed) {
        this.speed.x = -this.maxSpeed;
      }
    }
    this.pos.add(this.speed);
  }

  checkFloor(floor) {
    if (this.pos.y + this.size.h > floor.pos.y) {
      this.pos.y = floor.pos.y - this.size.h;
      this.speed.y = 0;
      this.isJumping = false;
    }
  }

  draw(ctx) {
    ctx.fillStyle = "black";
    ctx.fillRect(this.pos.x, this.pos.y, this.size.w, this.size.h);
  }

  static create(pos) {
    return new Player(pos.add(new Vector2(0, 0)), new Vector2(0, 0));
  }
}

Player.prototype.size = { w: 20, h: 30 };

export { Player };