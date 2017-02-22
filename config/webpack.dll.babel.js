import webpack from 'webpack';
import { resolve } from 'path';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';
var pkg = require('../package.json');

export default() => {
  return {
    entry: {
      vendor: [
        'react',
        'react-dom',
        'react-router',
        'react-router-redux',
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
      }),
      new ProgressBarPlugin(),
      new webpack.optimize.UglifyJsPlugin()
    ]
  };
};
