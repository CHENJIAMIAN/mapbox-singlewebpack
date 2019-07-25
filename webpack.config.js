const path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, './')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }]
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, './'),
    index: "./index.html",
  }
};