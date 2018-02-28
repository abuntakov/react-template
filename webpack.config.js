/* global __dirname */

'use strict'

const path = require('path')

module.exports = {
  context: path.join(__dirname, 'app'),

  entry: {
    index: [
      './index',
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@app': path.resolve(__dirname, 'app'),
    },
  },

  devServer: {
    contentBase: './dist',
    proxy: {
      '/api': {
        target: 'https://localhost:8080',
        changeOrigin: true,
      },
    }
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, 'app'),
          path.resolve(__dirname, 'locale'),
        ],
        loader: 'babel-loader?cacheDirectory=true',
      },
      {
        test: /\.(ttf|eot|woff2?)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000',
      },
      {
        test: /\.svg/,
        loader: 'svg-url-loader',
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
          { loader: 'resolve-url-loader' },
          { loader: 'sass-loader' }
        ],
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
          { loader: 'resolve-url-loader' }
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          { loader: 'url-loader', options: { limit: 8192 } },
          { loader: 'image-webpack-loader', options: { bypassOnDebug: true } },
        ],
      }
    ],
  },
}
