const webpack = require('webpack');
const path = require('path');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const config = {
  mode: 'development',
  entry: './src/index.js', // входная точка - исходный файл
  output: {
    path: path.resolve(__dirname, 'dist'), // путь к каталогу выходных файлов - папка dist
    filename: 'index.js' // название создаваемого файла
  },
  resolve: {
    extensions: ['.js', '.jsx'], // допустимые расширения файлов
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/, // определяем тип файлов
        use: 'babel-loader', // определяем загрузчик
        exclude: /node_modules/ // исключаем из обработки папку node_modules
      },
      // препроцессор
      {
        test: /\.scss$/, // определяем тип файлов
        use: [ // определяем загрузчики
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      // изображения
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      // шрифты и SVG
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    static: path.resolve(__dirname, './dist'),
    open: true,
    compress: true,
    hot: true,
    port: 3000,
  },
  plugins: [
    // new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
};

module.exports = config;