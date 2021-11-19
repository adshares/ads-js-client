import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import pkg from './package.json'

const plugins = [
  babel({
    babelHelpers: 'runtime',
    exclude: ['node_modules/**'],
    presets: ['@babel/preset-env'],
    plugins: ['@babel/plugin-transform-runtime']
  })
]

export default [
  // browser-friendly UMD build
  {
    input: 'src/client.js',
    output: {
      name: 'AdsClient',
      file: 'dist/index.js',
      format: 'iife',
      globals: {
        crypto: 'Crypto'
      }
    },
    plugins: [
      resolve(),
      commonjs(),
      ...plugins
    ]
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)
  {
    input: 'src/client.js',
    external: [
      '@adshares/ads',
      /@babel\/runtime/,
      'jsonrpc-lite/jsonrpc'
    ],
    output: [
      { file: pkg.main, format: 'cjs', exports: 'default' },
      { file: pkg.module, format: 'es' }
    ],
    plugins: [
      ...plugins
    ]
  }
]
