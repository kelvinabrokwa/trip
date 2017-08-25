/**
 *
 */
const regl = require('regl')()

const draw = regl({
  vert: `
    precision mediump float;
    attribute vec2 position;
    attribute vec3 color;
    uniform float angle;
    uniform vec2 offset;
    uniform vec2 translate;
    varying vec3 fcolor;
    void main() {
      fcolor = color;
      gl_Position = vec4(
        cos(angle) * position.x + sin(angle) * position.y + offset.x + translate.x,
        -sin(angle) * position.x + cos(angle) * position.y + offset.y + translate.y,
        0,
        1
      );
    }
  `,

  frag: `
    precision mediump float;
    varying vec3 fcolor;
    void main() {
      gl_FragColor = vec4(fcolor, 1);
    }
  `,

  attributes: {
    position: [
      0.5, 0,
      0, 0.5,
      1, 1,
    ],
    color: ({tick}, props, batchId) => [
      [
        Math.sin(0.02 * ((0.1 + Math.sin(batchId)) * tick + 3.0 * batchId)),
        Math.cos(0.02 * (0.02 * tick + 0.1 * batchId)),
        Math.sin(0.02 * ((0.3 + Math.cos(2.0 * batchId)) * tick + 0.8 * batchId)),
      ],
      [
        Math.sin(0.02 * ((0.3 + Math.cos(2.0 * batchId)) * tick + 0.8 * batchId)),
        Math.sin(0.02 * ((0.1 + Math.sin(batchId)) * tick + 3.0 * batchId)),
        Math.cos(0.02 * (0.02 * tick + 0.1 * batchId)),
      ],
      [
        Math.cos(0.02 * (0.02 * tick + 0.1 * batchId)),
        Math.sin(0.02 * ((0.1 + Math.sin(batchId)) * tick + 3.0 * batchId)),
        Math.sin(0.02 * ((0.3 + Math.cos(2.0 * batchId)) * tick + 0.8 * batchId)),
      ],
    ],
  },

  uniforms: {
    angle: ({tick}) => 0.01 * tick,
    offset: regl.prop('offset'),
    translate: ({tick}, props, batchId) => [
      Math.cos(0.005 * tick * (batchId + 1)),
      Math.sin(0.005 * tick * (batchId + 1))
    ],
  },

  depth: {
    enable: false,
  },

  count: 3,
});

regl.frame(function () {
  regl.clear({
    color: [0, 0, 0, 1],
  });

  draw([
    { offset: [-1, -1] },
    { offset: [-1, 0] },
    { offset: [-1, 1] },
    { offset: [0, -1] },
    { offset: [0, 0] },
    { offset: [0, 1] },
    { offset: [1, -1] },
    { offset: [1, 0] },
    { offset: [1, 1] },
  ]);
});
