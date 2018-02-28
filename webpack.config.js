/* global __dirname */

const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const isDev = process.env.NODE_ENV !== 'production'

module.exports = {
  cache: true,
  devtool: isDev ? 'inline-source-map' : false,
  context: path.join(__dirname, 'app'),

  entry: {
    index: [
      'babel-polyfill',
      'react-hot-loader/patch',
      './index',
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@app': path.resolve(__dirname, 'app'),
      '@locale': path.resolve(__dirname, 'locale'),
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

  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new HtmlWebpackPlugin({
      title: '',
      template: './index.html',
    }),
    new webpack.DefinePlugin({
      DEVELOPMENT: JSON.stringify(isDev),
    }),
    // new BundleAnalyzerPlugin(),
  ],
}
