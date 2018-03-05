/* global __dirname */

const webpack = require('webpack')
const path = require('path')
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const _compact = require('lodash/fp/compact')

const isDev = process.env.NODE_ENV !== 'production'
const extractScss = new ExtractTextPlugin({
  filename: '[name].[hash].css',
  disable: isDev
})

const extractScssRule = (type) => {
  const use = [
    { loader: 'css-loader' },
    { loader: 'postcss-loader' },
    // { loader: 'resolve-url-loader' }
  ]

  if (type !== 'css') {
    use.push({ loader: 'sass-loader' })
  }

  return {
    use,
    fallback: { loader: 'style-loader', options: { sourceMap: isDev } }
  }
}

module.exports = {
  cache: true,
  devtool: isDev ? 'inline-source-map' : false,
  context: path.join(__dirname, 'app'),

  entry: {
    index: [
      'babel-polyfill',
      'react-hot-loader/patch',
      './styles/index.scss',
      './index',
    ],
  },

  output: {
    filename: '[name].[hash].js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/'
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@app': path.resolve(__dirname, 'app'),
      '@locale': path.resolve(__dirname, 'locale'),
    },
  },

  devServer: {
    contentBase: path.join(__dirname, 'mocks'),
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
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
        use: extractScss.extract(extractScssRule('scss')),
      },
      {
        test: /\.css$/,
        use: extractScss.extract(extractScssRule('css')),
      },
      {
        test: /\.font\.js/,
        use: extractScss.extract({
          use: [
            { loader: 'css-loader' },
            { loader: 'webfonts-loader' }
          ],
          fallback: { loader: 'style-loader', options: { sourceMap: isDev } }
        }),
      },

      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          { loader: 'url-loader', options: { limit: 8192 } },
          { loader: 'image-webpack-loader', options: { bypassOnDebug: true } },
        ],
      },
    ],
  },


  plugins: _compact([
    !isDev && new CleanWebpackPlugin(['dist'], { dry: isDev }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    extractScss,
    new HtmlWebpackPlugin({
      title: '',
      template: './index.html',
    }),
    new webpack.DefinePlugin({
      DEVELOPMENT: JSON.stringify(isDev),
    }),
    // new BundleAnalyzerPlugin(),
  ]),
}
