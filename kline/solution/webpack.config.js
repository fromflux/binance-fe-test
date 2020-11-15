const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/main.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/i,
        include: [
          path.resolve(__dirname, 'src'),
        ],
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: {
                  node: 12,
                },
              },
            ],
            '@babel/preset-react',
          ],
        },
      },
      {
        test: /\.css$/i,
        include: [
          path.resolve(__dirname, 'src'),
        ],
        use: [
          'style-loader',
          'css-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'https://www.binance.com/api/v1/klines?symbol=BTCUSDT&interval=1m',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
      '/stream': {
        target: 'wss://stream.binance.com/stream?streams=btcusdt@kline_1m',
        changeOrigin: true,
        ws: true,
      },
    },
  },
};
