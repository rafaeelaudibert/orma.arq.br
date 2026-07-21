// INK FLOW — dark, slow-moving liquid gradient, like ink or smoke settling.
// Moody and premium; ideal behind a huge light-colored hero headline.
// Reacts faintly to the mouse. Palette + speed are marked below.
precision highp float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

// PALETTE — 0..1 RGB (hex value / 255). Edit these three to restyle.
const vec3 INK = vec3(0.043, 0.043, 0.055); // near-black base
const vec3 BASALT = vec3(0.16, 0.17, 0.19); // graphite mid-tone
const vec3 PLASTER = vec3(0.84, 0.81, 0.77); // warm light highlights

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
  for (int i = 0; i < 5; i++) {
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

  float t = u_time * 0.05; // SPEED — lower is slower

  // domain-warped noise: noise fed through noise makes the "liquid" look
  vec2 q = vec2(fbm(p + t), fbm(p + vec2(5.2, 1.3) - t));
  float f = fbm(p * 1.6 + q * 2.0 + (u_mouse - 0.5) * 0.4);

  vec3 col = mix(INK, BASALT, smoothstep(0.2, 0.65, f));
  col = mix(col, PLASTER, smoothstep(0.68, 0.98, f) * 0.5);

  // fine grain so the gradient never bands
  col += (hash(gl_FragCoord.xy + fract(u_time)) - 0.5) * 0.03;

  gl_FragColor = vec4(col, 1.0);
}
