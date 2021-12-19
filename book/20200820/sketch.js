function setup() {
  createCanvas(501, 501);
  
  const VERTICAL_LINE_NUMBER = 52;
  const MARGIN = width / (VERTICAL_LINE_NUMBER - 1);

  translate(0.5, 0);

  let count = 0;

  drawLines(0, 5);
  drawLines(1, 22);
  drawLines(2, 15);
  drawLines(3, 35);
  drawLines(4, 26);
  drawLines(5, 10);
  drawLines(6, 19);
  drawLines(7, 26);
  drawLines(8, 38);
  drawLines(9, 11);
  drawLines(10, 30);
  drawLines(11, 22);
  drawLines(12, 14);
  drawLines(13, 34);
  drawLines(14, 31);
  drawLines(15, 6);
  drawLines(16, 25);
  drawLines(17, 12);
  drawLines(18, 40);
  drawLines(19, 17);
  drawLines(20, 49);
  drawLines(21, 24);
  drawLines(22, 7);
  drawLines(23, 32);
  drawLines(24, 12);
  drawLines(25, 22);
  drawLines(26, 43);
  drawLines(27, 18);
  drawLines(28, 28);
  drawLines(29, 25);
  drawLines(30, 23);
  drawLines(31, 22);
  drawLines(32, 24);
  drawLines(33, 23);
  drawLines(34, 26);
  drawLines(35, 17);
  drawLines(36, 8);
  drawLines(37, 24);
  drawLines(38, 44);
  drawLines(39, 31);
  drawLines(40, 13);
  drawLines(41, 18);
  drawLines(42, 49);
  drawLines(43, 39);
  drawLines(44, 25);
  drawLines(45, 6);
  drawLines(46, 2);
  drawLines(47, 33);
  drawLines(48, 41);
  drawLines(49, 23);
  drawLines(50, 30);

  function drawLines(x, y) {
    line(x * MARGIN, 0, x * MARGIN, y * MARGIN);
    line(x * MARGIN, (y + 1) * MARGIN, x * MARGIN, height);
  }
}