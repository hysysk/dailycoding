const canvas = document.querySelector('canvas');
const gl = canvas.getContext('webgl2');
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

const shaders = [
  "./vertex.glsl",
  "./hash1d.glsl"
]

Promise.all(
  shaders.map(url => fetch(url).then(res => res.text()))
).then(([vs, fs]) => {
  const glsl = new GLSL(gl, vs, fs, canvas);
  glsl.activate();
});

