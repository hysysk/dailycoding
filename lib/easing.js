class Easing {
  static linear(t) {
    return t;
  }

  static circleIn(t) {
    return 1 - Math.sqrt(1 - t * t);
  }

  static circleOut(t) {
    return Math.sqrt(1 - --t * t);
  }

  static circleInOut(t) {
    return ((t *= 2) <= 1 ? 1 - Math.sqrt(1 - t * t) : Math.sqrt(1 - (t -= 2) * t) + 1) / 2;
  }

  static cubicIn(t) {
    return t * t * t;
  }

  static cubicOut(t) {
    return --t * t * t + 1;
  }

  static cubicInOut(t) {
    return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
  }

  static expIn(t) {
    return Math.pow(2, 10 * t - 10);
  }

  static expOut(t) {
    return 1 - Math.pow(2, -10 * t);
  }

  static expInOut(t) {
    return ((t *= 2) <= 1 ? Math.pow(2, 10 * t - 10) : 2 - Math.pow(2, 10 - 10 * t)) / 2;
  }

  static sinIn(t) {
    return 1 - Math.cos(t * Math.PI/2);
  }

  static sinOut(t) {
    return Math.sin(t * Math.PI/2);
  }

  static sinInOut(t) {
    return (1 - Math.cos(Math.PI * t)) / 2;
  }
}
