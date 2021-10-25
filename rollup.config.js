import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import multi from '@rollup/plugin-multi-entry';
import pkg from './package.json'

export default [
  // browser-friendly UMD build
  // {
  //   input: ['src/ed25519.js', 'src/ads.js'],
  //   output: {
  //     // name: 'Ed25519',
  //     dir: 'output',
  //     // format: 'umd',
  //   },
  //   plugins: [
  //     multi(),
  //     resolve(), // so Rollup can find `ms`
  //     commonjs(), // so Rollup can convert `ms` to an ES module
  //     babel({
  //       exclude: ['node_modules/**'],
  //     }),
  //   ],
  // },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)
  {
    input: ['src/ed25519.js', 'src/ads.js'],
    external: [],
    output: [
      { file: pkg.main, format: 'cjs' },
      // { file: pkg.module, format: 'es' },
    ],
    plugins: [
      multi(),
      babel({
        exclude: ['node_modules/**'],
      }),
    ],
  },
]
