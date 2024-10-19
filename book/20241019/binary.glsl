#version 300 es
precision highp float;
precision highp int;
out vec4 fragColor;
uniform float u_time;
uniform vec2 u_resolution;

void main() {
    vec2 pos = gl_FragCoord.xy / u_resolution.xy;
    pos *= vec2(32.0f, 9.0f);
    uint[9] a = uint[](uint(u_time), 0xbu, 9u, 0xbu ^ 9u, 0xffffffffu, 0xffffffffu + uint(u_time), floatBitsToUint(floor(u_time)), floatBitsToUint(-floor(u_time)), floatBitsToUint(11.5625f));
    if(fract(pos.x) < 0.1f) {
        if(floor(pos.x) == 1.0f) {
            fragColor = vec4(1, 0, 0, 1);
        } else if(floor(pos.x) == 9.0f) {
            fragColor = vec4(0, 1, 0, 1);
        } else {
            fragColor = vec4(0.5f, 0.5f, 0.5f, 1.0f);
        }
    } else if(fract(pos.y) < 0.1f) {
        fragColor = vec4(0.5f, 0.5f, 0.5f, 1.0f);
    } else {
        uint b = a[int(pos.y)];
        b = (b << uint(pos.x)) >> 31;
        fragColor = vec4(vec3(b), 1.0f);
    }
}