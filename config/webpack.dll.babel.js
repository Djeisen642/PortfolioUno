import webpack from 'webpack';
import { resolve } from 'path';
var pkg = require('../package.json');

export default() => {
  return {
    entry: {
      vendor: [
        'react',
        'react-dom',
        'react-router',
        'react-router-redux',
        'react-bootstrap',
        'react-router-bootstrap',
        'redux',
        'redux-thunk',
        'axios',
        'moment',
        'classnames'
      ]
    },
    output: {
      filename: '[name].dll.js',
      path: pkg.dllPath,
      library: '[name]'
    },
    plugins: [
      new webpack.DllPlugin({
        name: '[name]',
        path: resolve(pkg.dllPath, '[name].json')
      })
    ]
  };
};
