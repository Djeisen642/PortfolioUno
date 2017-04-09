import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import autoprefixer from 'autoprefixer';
import { resolve } from 'path';
import { getIfUtils, removeEmpty } from 'webpack-config-utils';
var pkg = require('../package.json');

const srcFolder = './src';
const destFolder = './dist';
var dllConfig = resolve(pkg.dllPath, 'vendor.json');
console.log(dllConfig);
const dllManifest = require(dllConfig);

export default env => {
  const { ifProd, ifNotProd } = getIfUtils(env);
  return {
    cache: ifProd(),
    entry: resolve(srcFolder, 'index.js'),
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
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader',
          query: {
            presets: ['es2015', 'stage-0'],
            plugins: ['transform-decorators-legacy', 'transform-class-properties']
          }
        },
        ifProd({
          test: /\.less$/,
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
              loader: 'less-loader'
            }],
            // use style-loader in development
            fallback: 'style-loader'
          })
        }, {
          test: /\.less$/,
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
            loader: 'less-loader',
            options: {
              sourceMap: true
            }
          }]
        }),
        {
          test: /\.(jpg|png|svg)$/,
          loader: 'url-loader',
          include: [resolve(srcFolder, 'images')],
          options: {
            limit: 25000
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
    resolve: {
      alias: {
        vue: 'vue/dist/vue.esm.js'
      }
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
        context: pkg.dllPath,
        from: '**/*',
        to: 'vendor',
        copyUnmodified: true
      }]),
      new ExtractTextPlugin({
        filename: '[name]-[hash].css',
        allChunks: true
      }),
      ifNotProd(new webpack.HotModuleReplacementPlugin()),
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
    ]),
    devServer: {
      hot: true,
      compress: true,
      contentBase: destFolder,
      port: 3000
    }
  };
};
