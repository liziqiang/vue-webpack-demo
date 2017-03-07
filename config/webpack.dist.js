'use strict';
const base                = require( './webpack.base' );
const util                = require( './util' );
const config              = base.commonConfig;
const webpack             = require( 'webpack' );
// 文件名
base.output.filename      = '[name]_[chunkhash].js';
base.output.chunkFilename = '[name]_[chunkhash].js';
base.output.publicPath    = 'http://static.iqiyi.com/js/publicPlatform/';
base.plugins.push(
new webpack.optimize.DedupePlugin(),
new webpack.optimize.UglifyJsPlugin( {
    compress : {
        warnings      : false, // 警告开关
        drop_debugger : true,
        drop_console  : true
    },
    output   : {
        comments : false // 注释开关
    }
} )
);
// 处理除entry中列出的文件之外的文件
util.handleFiles( base.plugins, { config, files : [ 'ver.js', 'main.js' ] } );
module.exports = base;