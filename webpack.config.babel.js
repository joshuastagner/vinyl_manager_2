import webpack from 'webpack';
import path from 'path';

const config = {
  entry: './albums/client/src/app.jsx',
  output: {
    path: path.join(__dirname, './albums/static/albums'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/,
        include: path.join(__dirname, 'albums/client/src'),
        exclude: ['node_modules'],
        use: [
          { loader: 'babel-loader',
            options: {
              presets: ['react', 'es2015']
            }
          }
        ]
      }
    ]
  }
};

export default config;
