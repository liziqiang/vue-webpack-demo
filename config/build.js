const config           = require( './webpack.build' );
const webpack          = require( 'webpack' );
const host             = '0.0.0.0';
const port             = 80;
const WebpackDevServer = require( 'webpack-dev-server' );
// 自动刷新，热替换(使用`webpack/hot/dev-server`热更新模块，HMR更新失败，则页面整个刷新)，如果需要手动刷新页面使用`webpack/hot/only-dev-server`
config.entry.app.unshift( 'webpack-dev-server/client?http://localhost:' + port + '/', 'webpack/hot/dev-server' );
const compiler = webpack( config );
const server   = new WebpackDevServer( compiler, {
    noInfo             : true,
    hot                : true,
    historyApiFallback : true
} );
// console.log( config.resolve.alias );
server.listen( port, host, function( err ) {
    if ( err ) {
        console.log( err );
        return;
    }
    console.log( 'Listening at ' + host + ':' + port );
} );