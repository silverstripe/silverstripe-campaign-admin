const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
// const SprityWebpackPlugin = require('sprity-webpack-plugin');

const PATHS = {
  MODULES: './node_modules',
  ADMIN_CSS_SRC: './client/src/styles',
  ADMIN_CSS_DIST: './client/dist/styles',
  ADMIN_JS_SRC: './client/src',
  ADMIN_JS_DIST: './client/dist/js',
};

// Used for autoprefixing css properties (same as Bootstrap Aplha.2 defaults)
const SUPPORTED_BROWSERS = [
  'Chrome >= 35',
  'Firefox >= 31',
  'Edge >= 12',
  'Explorer >= 9',
  'iOS >= 8',
  'Safari >= 8',
  'Android 2.3',
  'Android >= 4',
  'Opera >= 12',
];

const config = [
  {
    name: 'js',
    entry: {
      bundle: `${PATHS.ADMIN_JS_SRC}/bundles/bundle.js`,
    },
    resolve: {
      root: [__dirname, path.resolve(__dirname, PATHS.ADMIN_JS_SRC)],
      modulesDirectories: [PATHS.MODULES],
    },
    output: {
      path: 'client/dist',
      filename: 'js/[name].js',
    },
    externals: {
      'components/Accordion/Accordion': 'Accordion',
      'components/Accordion/AccordionBlock': 'AccordionBlock',
      'components/Breadcrumb/Breadcrumb': 'Breadcrumb',
      'components/FormAction/FormAction': 'FormAction',
      'components/ListGroup/ListGroup': 'ListGroup',
      'components/ListGroup/ListGroupItem': 'ListGroupItem',
      'components/Preview/Preview': 'Preview',
      'components/Toolbar/Toolbar': 'Toolbar',
      'containers/FormBuilderLoader/FormBuilderLoader': 'FormBuilderLoader',
      'state/breadcrumbs/BreadcrumbsActions': 'BreadcrumbsActions',
      'state/breadcrumbs/BreadcrumbsActionTypes': 'BreadcrumbsActionTypes',
      'state/records/RecordsActions': 'RecordsActions',
      'state/records/RecordsActionTypes': 'RecordsActionTypes',
      i18n: 'i18n',
      jquery: 'jQuery',
      'lib/Backend': 'Backend',
      'lib/Config': 'Config',
      'lib/DataFormat': 'DataFormat',
      'lib/schemaFieldValues': 'schemaFieldValues',
      'lib/Injector': 'Injector',
      'lib/ReducerRegister': 'ReducerRegister',
      'lib/Router': 'Router',
      'lib/ReactRouteRegister': 'ReactRouteRegister',
      'lib/SilverStripeComponent': 'SilverStripeComponent',
      'redux-form': 'ReduxForm',
      'react-redux': 'ReactRedux',
      'react-router': 'ReactRouter',
      react: 'React',
      redux: 'Redux',
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /(node_modules|thirdparty)/,
          loader: 'babel',
          query: {
            presets: ['es2015', 'react'],
            plugins: ['transform-object-assign', 'transform-object-rest-spread'],
            comments: false,
          },
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          // Builds React in production mode, avoiding console warnings
          NODE_ENV: JSON.stringify('production'),
        },
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          unused: false,
          warnings: false,
        },
        output: {
          beautify: false,
          semicolons: false,
          comments: false,
          max_line_len: 200,
        },
      }),
    ],
  },
  {
    name: 'css',
    entry: {
      bundle: `${PATHS.ADMIN_CSS_SRC}/bundle.scss`,
    },
    output: {
      path: 'client/dist/styles',
      filename: '[name].css',
    },
    module: {
      loaders: [
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract([
            'css?sourceMap&minimize&-core&discardComments',
            'postcss?sourceMap',
            'resolve-url',
            'sass?sourceMap',
          ]),
        },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract([
            'css?sourceMap&minimize&-core&discardComments',
            'postcss?sourceMap',
          ]),
        },
      ],
    },
    sassLoader: {
      // Non-standard include path for silverstripe/admin module
      includePaths: [
        path.resolve(__dirname, 'client/src/styles'),
        path.resolve(__dirname, 'silverstripe-admin/client/src/styles'),
        path.resolve(__dirname, '../silverstripe-admin/client/src/styles'),
      ],
    },
    postcss: [
      autoprefixer({ browsers: SUPPORTED_BROWSERS }),
    ],
    plugins: [
      new ExtractTextPlugin('[name].css', { allChunks: true }),
    ],
  },
];

// Use WEBPACK_CHILD=js or WEBPACK_CHILD=css env var to run a single config
if (process.env.WEBPACK_CHILD) {
  module.exports = config.filter((entry) => entry.name === process.env.WEBPACK_CHILD)[0];
} else {
  module.exports = config;
}
