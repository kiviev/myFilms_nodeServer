const path = require('path');

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx']
  },
  context: __dirname,
  entry: './app/app.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/public/build')
  },
 module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [{
          loader: "babel-loader",
          options: { presets: ['es2015','stage-2',"react"] }
        }]
      }
    ]
  }
}
/*
    loaders: [
      {
        test: /(\.js|.jsx)$/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-2', 'react']
        }
      }
    ]*/