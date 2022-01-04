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
#define TWO_PI 6.28318530718

precision highp float;
uniform vec2 u_resolution;
uniform float u_time;
out vec4 FragColor;

vec3 hsb2rgb(in vec3 c) {
  vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),
    6.0)-3.0)-1.0,
    0.0,
    1.0);
  rgb = rgb * rgb * (3.0 - 2.0 * rgb);
  return c.z * mix(vec3(1.0), rgb, c.y);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  vec3 color = vec3(0.0);

  vec2 toCenter = vec2(0.5) - uv;
  float angle = atan(toCenter.y, toCenter.x) + u_time * 0.001;
  float radius = step(length(toCenter) * 2.0, 0.8);

  color = hsb2rgb(vec3((angle / TWO_PI) + 0.5, radius, 1.0));
  FragColor = vec4(color, 1.0);
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