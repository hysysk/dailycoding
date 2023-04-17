window.addEventListener("load", () => {
  /* 
  Smaller than 768 => Mobile
  From 768 to 1280 => Full width
  Larger than 1280 => Fixed width and centered  
  */
  const BREAK_POINTS = [768, 1280];

  function draw() {
    let w = document.body.clientWidth;
    let canvas;
    let aspectRatio;

    if (w >= BREAK_POINTS[0]) {
      canvas = document.getElementById("desktop");
      aspectRatio = 16 / 9;

      if (w >= BREAK_POINTS[1]) {
        w = BREAK_POINTS[1];
      }
    } else if (w < BREAK_POINTS[0]) {
      canvas = document.getElementById("mobile");
      aspectRatio = 9 / 16;
    }

    const h = w / aspectRatio;
    const scale = w / BREAK_POINTS[1]; // BREAK_POINTS[1] is the standard width

    canvas.width = w;
    canvas.height = h;
    
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#f4a7ba";
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = "#000000";
    ctx.arc(200 * scale, 200 * scale, 100 * scale, 0, Math.PI * 2);
    ctx.fillRect(400 * scale, 100 * scale, 200 * scale, 200 * scale);
    ctx.fill();
  }

  draw();

  window.addEventListener("resize", debounce(draw, 300));
});