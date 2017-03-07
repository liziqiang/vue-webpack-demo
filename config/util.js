const fs       = require( 'fs' );
const path     = require( 'path' );
const UglifyJS = require( 'uglify-js' );
// 获取绝对路径
function resolvePath() {
    return path.resolve.apply( path, Array.prototype.slice.call( arguments, 0 ) );
}
function _handle( options ) {
    options      = options || {};
    let stats    = options.stats || {};
    let hashMap  = options.hashMap || {};
    let readPath = options.readPath || '';
    let saveName = options.saveName || '';
    let buildDir = options.buildDir || 'dist';
    fs.readFile( readPath, 'utf-8', function( err, data ) {
        if ( !err ) {
            let regVer    = new RegExp( '{{version}}', 'ig' );
            let regHeader = new RegExp( '{{jsHeader}}', 'ig' );
            let regHash   = new RegExp( "'{{hashMap}}'", 'ig' );
            switch ( buildDir ) {
                case 'dist':
                    data = data.replace( regVer, '_' + stats.hash );
                    data = data.replace( regHeader, 'http://static.iqiyi.com/js/publicPlatform' );
                    data = data.replace( regHash, JSON.stringify( hashMap ) );
                    break;
                case 'test':
                    data = data.replace( regVer, '_' + stats.hash );
                    data = data.replace( regHeader, 'http://mp-test.iqiyi.com/static/qiwei-portal/' + buildDir );
                    data = data.replace( regHash, JSON.stringify( hashMap ) );
                    break;
                default:
                    data = data.replace( regVer, '' );
                    break;
            }
            let savePath = path.join( buildDir, saveName );
            let result   = UglifyJS.minify( data, { fromString : true } );
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
            let hashMap = {};
            stats.toJson().chunks.forEach( chunk => {
                hashMap[ chunk.names[ 0 ] ] = chunk.hash;
            } );
            files.forEach( file => {
                _handle( {
                    readPath : resolvePath( config.srcPath, file ),
                    stats    : stats,
                    saveName : file,
                    hashMap,
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