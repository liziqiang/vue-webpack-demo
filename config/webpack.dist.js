'use strict';
const base                = require( './webpack.base' );
const util                = require( './util' );
const config              = base.commonConfig;
const webpack             = require( 'webpack' );
// 文件名
base.output.filename      = '[name].[hash].js';
base.output.chunkFilename = '[id].[hash].chunk.js';
base.plugins.push(
new webpack.NoErrorsPlugin(),
new webpack.optimize.DedupePlugin(),
new webpack.optimize.UglifyJsPlugin( {
    mangle : {
        keep_fnames : true
    }
} )
);
// 处理除entry中列出的文件之外的文件
util.handleFiles( base.plugins, { config, files : [ 'ver.js', 'main.js' ] } );
module.exports = base;