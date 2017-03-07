'use strict';
const base                = require( './webpack.base' );
const util                = require( './util' );
const config              = base.commonConfig;
const webpack             = require( 'webpack' );
// source map
base.devtool              = 'source-map';
// 文件名
base.output.filename      = '[name]_[chunkhash].js';
base.output.chunkFilename = '[name]_[chunkhash].js';
base.output.publicPath    = 'http://mp-test.iqiyi.com/static/qiwei-portal/test/';
base.plugins.push(
new webpack.optimize.DedupePlugin(),
new webpack.optimize.UglifyJsPlugin( {
    compress : {
        warnings : false
    },
    output   : {
        comments : false // 注释开关
    }
} )
);
// 处理除entry中列出的文件之外的文件
util.handleFiles( base.plugins, { config, files : [ 'ver.js', 'main.js' ] } );
module.exports = base;