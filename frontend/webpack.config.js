const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = () => {
  const isDevelopment = process.env.NODE_ENV !== 'production';

  return {
    entry: './src/index.tsx',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      alias: {
        '@Components': path.resolve(__dirname, 'src/components'),
        '@Types': path.resolve(__dirname, 'src/types'),
        '@Hooks': path.resolve(__dirname, 'src/hooks'),
        '@Pages': path.resolve(__dirname, 'src/pages'),
        '@Styles': path.resolve(__dirname, 'src/styles'),
        '@Constants': path.resolve(__dirname, 'src/constants'),
        '@Contexts': path.resolve(__dirname, 'src/contexts'),
        '@Assets': path.resolve(__dirname, 'src/assets'),
        '@Utils': path.resolve(__dirname, 'src/utils'),
      },
    },
    devServer: {
      port: 3000,
      historyApiFallback: true,
      hot: true,
    },
    devtool: isDevelopment ? 'eval-source-map' : 'source-map',
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(ts|tsx)$/,
          use: {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(__dirname, 'tsconfig.json'),
            },
          },
          exclude: /node_modules/,
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'public/index.html',
      }),
    ],
  };
};
