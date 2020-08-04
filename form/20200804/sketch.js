function setup() {
  createCanvas(501, 501);
  
  const VERTICAL_LINE_NUMBER = 51;
  const MARGIN = width / (VERTICAL_LINE_NUMBER - 1);

  translate(0.5, 0);

  for(let i=0; i<VERTICAL_LINE_NUMBER; i++) {
    if(i%2 == 0) {
      line(i * MARGIN, 0, i * MARGIN, height - (MARGIN*3));
      line(i * MARGIN, height - (MARGIN*2), i * MARGIN, height);
    } else if(i%4 == 1) {
      line(i * MARGIN, 0, i * MARGIN, height - (MARGIN*8));
      line(i * MARGIN, height - (MARGIN*7), i * MARGIN, height);
    } else if(i%8 == 3) {
      line(i * MARGIN, 0, i * MARGIN, height - (MARGIN*15));
      line(i * MARGIN, height - (MARGIN*14), i * MARGIN, height);
    } else if(i%16 == 7) {
      line(i * MARGIN, 0, i * MARGIN, height - (MARGIN*25));
      line(i * MARGIN, height - (MARGIN*24), i * MARGIN, height);
    } else if(i%32 == 15) {
      line(i * MARGIN, 0, i * MARGIN, height - (MARGIN*40));
      line(i * MARGIN, height - (MARGIN*39), i * MARGIN, height);
    } else {
      line(i * MARGIN, 0, i * MARGIN, height);
    }
  }
}