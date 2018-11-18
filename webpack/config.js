const webpack = require('webpack');
const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin')

const paths = {
  source: path.join(__dirname, '../source'),
  assets: path.join(__dirname, '../source/assets/'),
  css: path.join(__dirname, '../source/css/'),
  fonts: [
    path.join(__dirname, '../source/assets/fonts/'),
    path.join(__dirname, '../node_modules/tinymce/skins/lightgray/fonts/'),
    path.join(__dirname, '../node_modules/bootstrap/dist/fonts/'),
  ],
  images: [
    path.join(__dirname, '../source/assets/img'),
    path.join(__dirname, '../node_modules/tinymce/skins/lightgray/fonts/'),
    path.join(__dirname, '../node_modules/tinymce/skins/lightgray/img/')
  ],
  javascript: path.join(__dirname, '../source/js'),
  svg: [
    path.join(__dirname, '../source/assets/svg'),
    path.join(__dirname, '../node_modules/bootstrap/dist/fonts/'),
  ],
  build: path.join(__dirname, '../build'),
};

const outputFiles = require('./output-files').outputFiles;

const NODE_ENV = process.env.NODE_ENV || 'development';
const SERVER_RENDER = process.env.SERVER_RENDER === 'true';
const HYDRATE = process.env.HYDRATE === 'true';
const IS_DEVELOPMENT = NODE_ENV === 'development';
const IS_PRODUCTION = NODE_ENV === 'production';

// ----------
// PLUGINS
// ----------

// Shared plugins
const plugins = [
  // Extracts CSS to a file
  // new MiniCssExtractPlugin({
  //   filename: "style.css",
  //   chunkFilename: "[name].css"
  // }),
  // new ExtractTextPlugin(
  //   {filename: 'style.css'}
  // ),
  new ExtractCssChunks(
    {
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: outputFiles.css,
      chunkFilename: "[id].css",
      hot: true // optional as the plugin cannot automatically detect if you are using HOT, not for production use
    }
  ),
  // Injects env variables to our app
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(NODE_ENV),
      SERVER_RENDER: JSON.stringify(SERVER_RENDER) === 'true',
      HYDRATE: JSON.stringify(HYDRATE) === 'true',
    },
  }),
];

if (IS_DEVELOPMENT) {
  // Shared development plugins
  plugins.push(
    // Enables pretty names instead of index
    new webpack.NamedModulesPlugin()
  );
}

// ----------
// RULES
// ----------

// Shared rules
const rules = [
  // Babel loader
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: ['babel-loader'],
  },
  {
    test: /\.tsx$/,
    use: 'ts-loader',
    exclude: /node_modules/,
  },
  // SVG are imported as react components
  {
    test: /\.svg$/,
    use: [
      {
        loader: 'babel-loader',
      },
      {
        loader: 'react-svg-loader',
        options: {
          svgo: {
            plugins: [
              {
                removeTitle: true,
              },
            ],
            floatPrecision: 3,
          },
        },
      },
    ],
    include: paths.svg,
  },
  // {
  //   test: /\.scss$/,
  //   use:  [  'style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
  // },
  // Images
  {
    test: /\.(png|gif|jpg|svg)$/,
    include: paths.images,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: 'client/assets/[name]-[hash].[ext]',
        },
      },
    ],
  },
  // Fonts
  {
    test: /\.(eot|ttf|woff|woff2)$/,
    include: [paths.fonts],
    use: [
      {
        loader: 'file-loader',
        options: {
          name: 'client/fonts/[name]-[hash].[ext]',
        },
      },
    ],
  }
];


// For both production and server ExtractTextPlugin is used
if (IS_PRODUCTION || SERVER_RENDER) {
  rules.push(
    {
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            minimize: true,
          },
        },
        'postcss-loader',
      ],
    }
  );

  rules.push(
    {
      test: /\.scss$/,
      use: [
        {
          loader: 'css-loader/locals',
          options: {
            modules: true,
            localIdentName: '[name]__[local]--[hash:base64:5]'
          }
        },
        {
          loader: 'sass-loader'
        }
      ]
    });

  // rules.push(
  //   {
  //     test: /\.scss$/,
  //     use: [
  //       MiniCssExtractPlugin.loader,
  //       {
  //         loader: 'css-loader',
  //         options: {  },
  //       },
  //       { loader: 'postcss-loader' },
  //       { loader: 'sass-loader' }
  //     ],
  //   }
  // );
} else {
  rules.push(
    {
      test: /\.css$/,
      use: [
        {
          loader: 'style-loader',
          options: { sourceMap: true },
        },
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            sourceMap: true,
          },
        },
        {
          loader: 'postcss-loader',
          options: { sourceMap: true },
        },
      ],
    }
  );

  rules.push({
    test: /\.scss$/,
    use: [
      ExtractCssChunks.loader,
      {
        loader: 'css-loader',
        options: {
          modules: true,
          localIdentName: '[name]__[local]--[hash:base64:5]'
        }
      },
      {
        loader: 'sass-loader'
      }
    ]
  });
}

// ----------
// RESOLVE
// ----------

const resolve = {
  extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx', '.tsx'],
  modules: [
    'node_modules',
    paths.javascript,
    paths.assets,
    paths.css,
  ],
};

// ----------
// CLI STATS
// ----------

const stats = {
  colors: true,
  assets: true,
  children: false,
  chunks: false,
  hash: false,
  modules: false,
  publicPath: false,
  timings: true,
  version: false,
  warnings: true,
};

module.exports = {
  IS_DEVELOPMENT,
  IS_PRODUCTION,
  NODE_ENV,
  SERVER_RENDER,
  outputFiles,
  paths,
  plugins,
  resolve,
  rules,
  stats,
};
