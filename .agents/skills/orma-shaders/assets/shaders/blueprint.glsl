// BLUEPRINT — deep blue drafting-paper grid, drifting slowly sideways,
// with a soft band of light sweeping across and lines that brighten
// near the cursor. The most literally "architectural" option.
precision highp float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

// PALETTE — 0..1 RGB. Edit these two to restyle.
const vec3 PAPER = vec3(0.051, 0.089, 0.153); // deep blueprint blue
const vec3 LINE = vec3(0.62, 0.72, 0.85); // pale drafting line

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  float unit = u_resolution.y / 14.0; // GRID SIZE — higher divisor = finer grid
  vec2 g = gl_FragCoord.xy / unit;
  g.x -= u_time * 0.02; // SPEED of the sideways drift

  // thin lines every cell, heavier lines every 5 cells
  vec2 cell = fract(g);
  vec2 d = min(cell, 1.0 - cell) * unit;
  float minor = 1.0 - smoothstep(0.5, 1.5, min(d.x, d.y));

  vec2 cell5 = fract(g / 5.0);
  vec2 d5 = min(cell5, 1.0 - cell5) * unit * 5.0;
  float major = 1.0 - smoothstep(0.5, 2.0, min(d5.x, d5.y));

  // a soft band of light sweeping diagonally, like sun over a drawing board
  float band = uv.x + uv.y - (fract(u_time * 0.04) * 3.0 - 0.5);
  float sweep = exp(-band * band * 10.0);

  // the fine grid brightens gently near the cursor
  float cursor = exp(-distance(uv, u_mouse) * 3.0);

  vec3 col = PAPER;
  col = mix(col, LINE, minor * (0.08 + cursor * 0.10));
  col = mix(col, LINE, major * 0.16);
  col += LINE * sweep * 0.05;
  col += (hash(gl_FragCoord.xy) - 0.5) * 0.02; // grain

  gl_FragColor = vec4(col, 1.0);
}
