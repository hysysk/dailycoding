function setup() {
  createCanvas(500, 500);
  background(255);

  let r = 5;
  let k = 30;
  let grid = [];
  let gridSize = r / Math.SQRT2;
  let active = [];
  let cols = floor(width / gridSize);
  let rows = floor(height / gridSize);

  for(let i=0; i<cols*rows; i++) {
    grid[i] = undefined;
  }

  let x = floor(random(width));
  let y = floor(random(height));
  let i = floor(x / gridSize);
  let j = floor(y / gridSize);
  let pos = createVector(x, y);
  grid[i + j * cols] = pos;
  active.push(pos);

  for(let total=0; total<cols*rows; total++) {
    if(active.length > 0) {
      let randomIndex = floor(random(active.length));
      let pos = active[randomIndex];
      let found = false;
      for(let n=0; n<k; n++) {
        let sample = p5.Vector.random2D();
        let m = random(r, 2 * r);
        sample.setMag(m);
        sample.add(pos);

        let col = floor(sample.x / gridSize);
        let row = floor(sample.y / gridSize);

        if(col > -1 && row > -1 && col < cols && row < rows && !grid[col + row * cols]) {
          let ok = true;
          for(let i=-1; i<=1; i++) {
            for(let j=-1; j<=1; j++) {
              let index = (col + i) + (row + j) * cols;
              let neighbor = grid[index];
              if(neighbor) {
                let d = p5.Vector.dist(sample, neighbor);
                if(d < r) {
                  ok = false;
                }
              }
            }
          }

          if(ok) {
            found = true;
            grid[col + row * cols] = sample;
            active.push(sample);
            point(sample.x, sample.y);
            break;
          }
        }
      }

      if(!found) {
        active.splice(randomIndex, 1);
      }
    }
  }
}