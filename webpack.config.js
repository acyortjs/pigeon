const webpack = require('webpack')
const WebpackMd5Hash = require('webpack-md5-hash')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')
const isProd = process.env.NODE_ENV === 'production'

const config = {
  entry: {
    build: './src'
  },

  output: {
    publicPath: '/',
    path: '/',
    filename: '[name].js'
  },

  resolve: {
    extensions: ['.js', '.vue']
  },

  plugins: [
    new HtmlWebpackPlugin({ template: 'src/index.html' })
  ],

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },

  devServer: {
    historyApiFallback: true,
    noInfo: true,
    host: '0.0.0.0',
    port: 1234
  },

  devtool: '#eval-source-map'
}

if (isProd) {
  config.entry.vendors = ['axios', 'vue', 'vuex', 'vue-router']
  config.output = {
    path: `${__dirname}/dist`,
    publicPath: '/',
    filename: '[name].[chunkhash:8].js',
    chunkFilename: '[name].[chunkhash:8].js'
  }
  config.plugins = [
    new WebpackMd5Hash(),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"production"' }),
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendors', 'manifest']
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: 'body',
      inlineSource: 'manifest+',
      minify: {
        removeComments: true,
        minifyJS: true,
        minifyCSS: true,
        collapseWhitespace: true
      }
    }),
    new HtmlWebpackInlineSourcePlugin(),
    new ExtractTextPlugin('[name].[contenthash:8].css')
  ]
  config.module.rules[0].options = {
    loaders: {
      postcss: ExtractTextPlugin.extract({
        use: [
          {
            loader: 'css-loader',
            options: {
              minimize: true
            }
          },
          'postcss-loader'
        ],
        fallback: 'vue-style-loader'
      })
    }
  }
  config.devtool = false
}

module.exports = config
