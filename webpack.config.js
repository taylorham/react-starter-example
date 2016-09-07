var webpack = require('webpack')

module.exports = {
  entry: './app/Main.js',
  output: {
    filename: 'public/index.js'
  },
  devServer: {
    inline: true,
    port: 3333
  },
  // externals: {
  //   'react': 'React',
  //   'react-dom': 'ReactDOM'
  // },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          plugins: ['transform-class-properties', 'transform-object-rest-spread'],
          presets: ['latest', 'react']
        }
      }
    ]
  }
}
