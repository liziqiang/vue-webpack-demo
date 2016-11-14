'use strict';
const base                = require( './webpack.base' );
const util                = require( './util' );
const config              = base.commonConfig;
// source map
base.devtool              = 'source-map';
// 文件名
base.output.filename      = '[name].js';
base.output.chunkFilename = '[id].chunk.js';
// 处理除entry中列出的文件之外的文件
util.handleFiles( base.plugins, { config, files : [ 'ver.js', 'main.js' ] } );
module.exports = base;