'use strict';
const base                = require( './webpack.base' );
const util                = require( './util' );
const webpack             = require( 'webpack' );
const HtmlWebpackPlugin   = require( 'html-webpack-plugin' );
// source map
base.devtool              = 'source-map';
// 文件名
base.output.filename      = '[name].js';
base.output.chunkFilename = '[name].js';
base.output.publicPath    = '/';
// webpack dev server
base.plugins.push(
new HtmlWebpackPlugin( { template : './pages/index.html', chunks : [ 'vendor', 'app' ] } ),
new webpack.HotModuleReplacementPlugin()
);
module.exports = base;