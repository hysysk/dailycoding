const canvas = document.querySelector('canvas');
const gl = canvas.getContext('webgl2');
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

const vs = `#version 300 es
in vec4 a_position;

void main() {
  gl_Position = a_position;
}
`;

const fs = `#version 300 es
precision highp float;
out vec4 fragColor;
uniform vec2 u_resolution;

void main() {
  vec2 pos = gl_FragCoord.xy / u_resolution.xy;
  vec3[4] col4 = vec3[](
    vec3(1.0, 0.0, 0.0),
    vec3(0.0, 0.0, 1.0),
    vec3(0.0, 1.0, 0.0),
    vec3(1.0, 1.0, 0.0)
  );
  vec3 col = mix(mix(col4[0], col4[1], pos.x), mix(col4[2], col4[3], pos.x), pos.y);
  fragColor = vec4(col, 1.0);
}
`;

// https://webgl2fundamentals.org/webgl/lessons/webgl-fundamentals.html
const compileShader = (gl, shaderSource, shaderType) => {
  const shader = gl.createShader(shaderType);
  gl.shaderSource(shader, shaderSource);
  gl.compileShader(shader);

  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }
  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
};

const createProgram = (gl, vertexShader, fragmentShader) => {
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  const success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }
  console.log(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
}

const vertexShader = compileShader(gl, vs, gl.VERTEX_SHADER);
const fragmentShader = compileShader(gl, fs, gl.FRAGMENT_SHADER);

const program = createProgram(gl, vertexShader, fragmentShader);

const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
const timeLocation = gl.getUniformLocation(program, "u_time");

const positionBuffer = gl.createBuffer();

gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
  -1, -1,
  1, -1,
  -1, 1,
  -1, 1,
  1, -1,
  1, 1,
]), gl.STATIC_DRAW);

const render = time => {
  time += 1;
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  gl.useProgram(program);

  gl.enableVertexAttribArray(positionAttributeLocation);
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.vertexAttribPointer(
    positionAttributeLocation,
    2,
    gl.FLOAT,
    false,
    0,
    0,
  );

  gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height);
  gl.uniform1f(timeLocation, time);

  const offset = 0;
  const count = 6;
  gl.drawArrays(gl.TRIANGLES, offset, count);

  requestAnimationFrame(render);
}
requestAnimationFrame(render);