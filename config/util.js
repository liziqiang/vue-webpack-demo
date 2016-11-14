const fs       = require( 'fs' );
const path     = require( 'path' );
const UglifyJS = require( 'uglify-js' );
// 获取绝对路径
function resolvePath() {
    return path.resolve.apply( path, Array.prototype.slice.call( arguments, 0 ) );
}
function _handle( options ) {
    options      = options || {};
    var stats    = options.stats || {};
    var readPath = options.readPath || '';
    var saveName = options.saveName || '';
    var buildDir = options.buildDir || 'dist';
    fs.readFile( readPath, 'utf-8', function( err, data ) {
        if ( !err ) {
            var regVer    = new RegExp( '{{version}}', 'ig' );
            var regHeader = new RegExp( '{{jsHeader}}', 'ig' );
            data          = data.replace( regVer, '_' + stats.hash );
            data          = data.replace( regHeader, 'http://static.iqiyi.com/js/paoopenapi' );
            var savePath  = path.join( buildDir, saveName );
            var result    = UglifyJS.minify( data, {
                fromString : true,
                mangle     : true
            } );
            fs.writeFileSync( savePath, result.code );
        } else {
            console.log( err );
        }
    } );
}
// 处理除entry中列出的文件之外的文件
function handleFiles( plugins, options ) {
    let files  = options.files,
        config = options.config;
    // 修改main和ver文件
    plugins.push( function() {
        this.plugin( 'done', function( stats ) {
            files.forEach( file => {
                _handle( {
                    readPath : resolvePath( config.srcPath, file ),
                    stats    : stats,
                    saveName : file,
                    buildDir : config.buildDir
                } );
            } );
        } );
    } );
}
module.exports = {
    handleFiles,
    resolvePath
};