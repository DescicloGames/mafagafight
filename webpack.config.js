/**
 * Este é o arquivo de configuração do webpack.
 * 
 * Nem eu entendo, então surgiro que não mexa!
 */
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/main.js',

  output: {
    path: path.resolve(__dirname, 'docs')
  },
  
  devServer: {
  	contentBase: "./docs",
  },

  plugins: [
    new webpack.ProgressPlugin(),
    //new MiniCssExtractPlugin({ filename:'styles.[chunkhash].css' }),
    //new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }), //apagando o index.html
    new HtmlWebpackPlugin({
      title: "MafagaFight · Uma suruba mortal!",
      template: "index.ejs",
      inject: false,
      meta: {
        viewport: `width=device-width, initial-scale=1, user-scalable=no`,
      }
    }),
  ],

  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      include: [path.resolve(__dirname, 'src')],
      loader: 'babel-loader'
    }, {
      test: /\.css$/,
      include: [path.resolve(__dirname, 'css')],

      use: [/*{
        loader: MiniCssExtractPlugin.loader
      },*/ {
        loader: "style-loader"
      }, {
        loader: "css-loader",

        options: {
          sourceMap: true
        }
      }]
    }]
  },

  optimization: {
    minimizer: [new TerserPlugin()],

    splitChunks: {
      cacheGroups: {
        vendors: {
          priority: -10,
          test: /[\\/]node_modules[\\/]/
        }
      },

      chunks: 'async',
      minChunks: 1,
      minSize: 30000,
      name: false
    }
  }
}
