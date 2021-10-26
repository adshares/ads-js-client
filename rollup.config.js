import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import pkg from './package.json'

export default [
  // browser-friendly UMD build
  {
    input: 'src/ads.js',
    output: {
      name: 'Ads',
      file: pkg.browser,
      format: 'umd',
      globals: {
        crypto: 'Crypto'
      }
    },
    plugins: [
      resolve({
        // jsnext: true,
        // main: false
      }),
      commonjs({
        // include: [ "./src/ed25519.js", "node_modules/**" ],
        // ignoreGlobal: false,
        // sourceMap: false,
      }),
      babel({
        babelHelpers: 'runtime',
        exclude: ['node_modules/**'],
        presets: ['@babel/preset-env'],
        plugins: ["@babel/plugin-transform-runtime"],
      }),
    ],
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)
  {
    input: 'src/ads.js',
    external: [
      /@babel\/runtime/,
      'bignumber.js',
      'crypto-js',
      'jsonrpc-lite/jsonrpc',
      'tweetnacl',
    ],
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
    ],
    plugins: [
      babel({
        babelHelpers: 'runtime',
        exclude: ['node_modules/**'],
        presets: ['@babel/preset-env'],
        plugins: ["@babel/plugin-transform-runtime"],
      }),
    ],
  },
]
