var path = require('path');
var webpack = require('webpack');
var assetsPath = path.join(__dirname, '..', 'public', 'assets');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var commonLoaders = [
  {
    /*
     * TC39 categorises proposals for babel in 4 stages
     * Read more http://babeljs.io/docs/usage/experimental/
     */
    test: /\.js$|\.jsx$/,
    loader: 'babel',
    // Reason why we put this here instead of babelrc
    // https://github.com/gaearon/react-transform-hmr/issues/5#issuecomment-142313637
    query: {
      "presets": ["es2015", "react", "stage-0"]
    },
    include: path.join(__dirname, '..', 'app'),
    exclude: path.join(__dirname, '/node_modules/')
  },
  { test: /\.json$/, loader: "json-loader" },
  {
    test: /\.(png|jpg|svg)$/,
    loader: 'url?limit=10000'
  },
  { test: /\.html$/, loader: 'html-loader' }
];

var postCSSConfig = function() {
  return [
    require('postcss-import')({
      path: path.join(__dirname, '..', 'app', 'css')
    }),
    // Note: you must set postcss-mixins before simple-vars and nested
    require('postcss-mixins')(),
    require('postcss-simple-vars')(),
    // Unwrap nested rules like how Sass does it
    require('postcss-nested')(),
    //  parse CSS and add vendor prefixes to CSS rules
    require('autoprefixer')({
      browsers: ['last 2 versions', 'IE > 8']
    }),
    // A PostCSS plugin to console.log() the messages registered by other
    // PostCSS plugins
    require('postcss-reporter')({
      clearMessages: true
    })
  ];
};
module.exports = {
    // The configuration for the server-side rendering
    name: "server-side rendering",
    context: path.join(__dirname, "..", "app"),
    entry: {
      server: "./server"
    },
    target: "node",
    output: {
      // The output directory as absolute path
      path: assetsPath,
      // The filename of the entry chunk as relative path inside the output.path directory
      filename: "server.js",
      // The output path from the view of the Javascript
      publicPath: "/assets/",
      libraryTarget: "commonjs2"
    },
    module: {
      loaders: commonLoaders.concat([
           { test: /\.css$/,
             loader: ExtractTextPlugin.extract('style-loader', 'css-loader?module!postcss-loader')
           }
      ])
    },
    resolve: {
      extensions: ['', '.js', '.jsx', '.css'],
      modulesDirectories: [
        "app", "node_modules"
      ]
    },
    plugins: [
        // extract inline css from modules into separate files
        new ExtractTextPlugin("styles/main.css"),
        new webpack.DefinePlugin({
          __DEVCLIENT__: false
        })
    ],
    postcss: postCSSConfig
};
