class GLSL {
  constructor(gl, vs, fs, canvas, fps) {
    this.gl = gl;
    this.vs = vs;
    this.fs = fs;
    this.canvas = canvas;
    this.program;
    this.positionAttributeLocation;
    this.resolutionLocation;
    this.positionBuffer;
    this.timeLocation;
    this.then = Date.now();
    this.FPS_INTERVAL = 1000 / fps | 1000 / 60;
    this.count = 0;
  }

  activate() {
    const compileShader = (shaderSource, shaderType) => {
      const shader = this.gl.createShader(shaderType);
      this.gl.shaderSource(shader, shaderSource);
      this.gl.compileShader(shader);

      const success = this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS);
      if (success) {
        return shader;
      }
      console.log(this.gl.getShaderInfoLog(shader));
      this.gl.deleteShader(shader);
    };

    const createProgram = (vertexShader, fragmentShader) => {
      const program = this.gl.createProgram();
      this.gl.attachShader(program, vertexShader);
      this.gl.attachShader(program, fragmentShader);
      this.gl.linkProgram(program);

      const success = this.gl.getProgramParameter(program, gl.LINK_STATUS);
      if (success) {
        return program;
      }
      console.log(this.gl.getProgramInfoLog(program));
      this.gl.deleteProgram(program);
    }

    const vertexShader = compileShader(this.vs, this.gl.VERTEX_SHADER);
    const fragmentShader = compileShader(this.fs, this.gl.FRAGMENT_SHADER);

    this.program = createProgram(vertexShader, fragmentShader);

    this.positionAttributeLocation = this.gl.getAttribLocation(this.program, 'a_position');
    this.resolutionLocation = this.gl.getUniformLocation(this.program, 'u_resolution');
    this.timeLocation = this.gl.getUniformLocation(this.program, "u_time");

    this.positionBuffer = this.gl.createBuffer();

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,
      1, -1,
      -1, 1,
      -1, 1,
      1, -1,
      1, 1,
    ]), this.gl.STATIC_DRAW);

    const render = () => {
      requestAnimationFrame(render);

      let now = Date.now();
      let elapsed = now - this.then;
      if (elapsed > this.FPS_INTERVAL) {
        this.then = now - (elapsed % this.FPS_INTERVAL);

        this.count++;

        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.useProgram(this.program);
        this.gl.enableVertexAttribArray(this.positionAttributeLocation);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
        this.gl.vertexAttribPointer(
          this.positionAttributeLocation,
          2,
          this.gl.FLOAT,
          false,
          0,
          0
        );

        this.gl.uniform2f(this.resolutionLocation, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.uniform1f(this.timeLocation, this.count * 0.01);

        this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
      }
    }

    requestAnimationFrame(render);
  }
}