const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const buildUtil = require('./buildUtil');

module.exports = {
  mode: 'production',
  target: 'web',
  entry: {
    'framework.bundle': './src/index.js'
  },
  output: {
    path: buildUtil.root('dist'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.json'],
    modules: [buildUtil.root('src'), buildUtil.root('node_modules')]
  },
  stats: 'errors-only',
  optimization: {
    splitChunks: {
      automaticNameDelimiter: '_',
      cacheGroups: {
        vendors: {
          // test: /[\\/]node_modules[\\/]/,
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          filename: 'vendors.bundle.js',
          chunks: 'all'
        },
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: 2
        }
      }
    }
  },

  module: {
    rules: [{ test: /.js$/, loader: 'babel-loader' }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: buildUtil.root('src/public/index.html')
    })
  ]
};
