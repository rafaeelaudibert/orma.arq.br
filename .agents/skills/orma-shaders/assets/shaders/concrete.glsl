// CONCRETE — a nearly-still dark mineral surface with the faintest slow
// movement and a vignette that lets edges recede. Calm on purpose:
// made for the footer, where text should sit comfortably on top.
precision highp float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

// PALETTE — 0..1 RGB. Edit these two to restyle.
const vec3 DARK = vec3(0.075, 0.075, 0.08); // shadowed concrete
const vec3 LIGHT = vec3(0.16, 0.155, 0.15); // lit concrete

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p *= 2.03;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  vec2 p = uv;
  p.x *= u_resolution.x / u_resolution.y;

  // barely-moving mineral surface
  float f = fbm(p * 3.0 + u_time * 0.015); // SPEED — lower is slower

  vec3 col = mix(DARK, LIGHT, f);

  // vignette: darker toward the edges
  float v = smoothstep(1.2, 0.35, distance(uv, vec2(0.5)));
  col *= 0.75 + 0.25 * v;

  col += (hash(gl_FragCoord.xy) - 0.5) * 0.04; // grain

  gl_FragColor = vec4(col, 1.0);
}
