import webpack from 'webpack';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';

export default() => {
  return {
    entry: {
      vendor: [
        'react',
        'react-dom',
        'react-redux',
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
      path: './node_modules/portfolio_uno',
      library: '[name]'
    },
    plugins: [
      new ProgressBarPlugin(),
      new webpack.DllPlugin({
        name: '[name]',
        path: './node_modules/portfolio_uno/[name].json'
      })
    ]
  };
};
