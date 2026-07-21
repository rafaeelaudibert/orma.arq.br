// WARM HAZE — bright ivory field with soft sand and stone-grey pools of
// light drifting through it, plus a whisper of warmth following the cursor.
// The light-theme option; ideal behind dark text.
precision highp float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

// PALETTE — 0..1 RGB. Edit these three to restyle.
const vec3 IVORY = vec3(0.965, 0.953, 0.929); // paper base
const vec3 SAND = vec3(0.87, 0.8, 0.69); // warm pool
const vec3 STONE = vec3(0.78, 0.79, 0.78); // cool grey pool

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float pool(vec2 p, vec2 center, float tightness) {
  float d = distance(p, center);
  return exp(-d * d * tightness);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  float aspect = u_resolution.x / u_resolution.y;
  vec2 p = vec2(uv.x * aspect, uv.y);

  float t = u_time * 0.1; // SPEED — lower is slower

  vec2 c1 = vec2((0.3 + 0.22 * sin(t * 0.7)) * aspect, 0.62 + 0.18 * cos(t * 0.9));
  vec2 c2 = vec2((0.75 + 0.18 * cos(t * 0.6 + 2.0)) * aspect, 0.35 + 0.22 * sin(t * 0.8 + 1.0));
  vec2 m = vec2(u_mouse.x * aspect, u_mouse.y);

  vec3 col = IVORY;
  col = mix(col, SAND, pool(p, c1, 2.5) * 0.5);
  col = mix(col, STONE, pool(p, c2, 3.0) * 0.45);
  col = mix(col, SAND, pool(p, m, 4.0) * 0.18);
  col += (hash(gl_FragCoord.xy + fract(u_time)) - 0.5) * 0.02; // grain

  gl_FragColor = vec4(col, 1.0);
}
