module.exports = {
  entry: ['./src/main.ts'],
  output: {
    path: 'dist',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.ts', '.js']
  },
  module: {
    loaders: [
      {test: /\.ts(x?)$/, loader: 'ts-loader'}
    ]
  }
};