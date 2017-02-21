import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import autoprefixer from 'autoprefixer';
import { resolve } from 'path';
import { getIfUtils, removeEmpty } from 'webpack-config-utils';

const srcFolder = './src';
const destFolder = './dist';
const dllManifest = require('portfolio_uno/vendor.json');

export default env => {
  const { ifProd, ifNotProd } = getIfUtils(env);
  return {
    cache: ifProd(),
    entry: [
      resolve(srcFolder, 'app.jsx')
    ],
    watch: ifNotProd(),
    devtool: ifProd('source-map', 'inline-sourcemap'),
    output: {
      filename: ifProd('bundle.[name].[chunkhash].js', 'bundle.[name].js'),
      path: resolve(destFolder),
      publicPath: '/'
    },
    module: {
      rules: removeEmpty([
        {
          test: /\.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader',
          query: {
            presets: ['react', 'es2015', 'stage-0'],
            plugins: ['react-html-attrs', 'transform-decorators-legacy', 'transform-class-properties']
          }
        },
        ifProd({
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract({
            loader: [{
              loader: 'css-loader'
            }, {
              loader: 'postcss-loader',
              options: {
                plugins: () => {
                  return [autoprefixer];
                }
              }
            }, {
              loader: 'sass-loader',
            }],
            // use style-loader in development
            fallback: 'style-loader'
          })
        }, {
          test: /\.scss$/,
          use: [{
            loader: 'style-loader'
          }, {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }, {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: () => {
                return [autoprefixer];
              }
            }
          }, {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }]
        }),
        {
          test: /\.(png|svg|jpg|gif)$/,
          loader: 'url-loader',
          include: [resolve(srcFolder, 'images')],
          options: {
            name: './assets/images/[name]-[hash].[ext]',
            limit: 100000
          }
        },
        {
          test: /\.(woff|woff2|eot|ttf|svg)$/,
          include: [resolve(srcFolder, 'fonts')],
          loader: 'url-loader',
          options: {
            name: './assets/fonts/[name]-[hash].[ext]',
            limit: 100000
          }
        }
      ])
    },
    plugins: removeEmpty([
      new HtmlWebpackPlugin({
        template: resolve(srcFolder, 'index.html')
      }),
      new webpack.DllReferencePlugin({
        context: '.',
        manifest: dllManifest
      }),
      new CopyWebpackPlugin([{
        context: resolve('node_modules', 'portfolio_uno'),
        from: '**/*',
        to: 'vendor',
        copyUnmodified: true
      }]),
      new ExtractTextPlugin({
        filename: '[name]-[hash].css',
        allChunks: true
      }),
      ifProd(new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: true
      })),
      ifProd(new webpack.optimize.MinChunkSizePlugin({
        minChunkSize: 1000
      })),
      ifProd(new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 25
      })),
      ifProd(new webpack.optimize.UglifyJsPlugin({
        compress: {
          screw_ie8: true,
          warnings: false
        },
        sourceMap: true
      }))
    ])
  };
};
