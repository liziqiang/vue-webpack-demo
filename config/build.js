const config           = require( './webpack.build' );
const webpack          = require( 'webpack' );
const listenPort       = config.commonConfig.listenPort;
const webpackDevServer = require( 'webpack-dev-server' );
// 自动刷新，热替换(使用`webpack/hot/dev-server`热更新模块，HMR更新失败，则页面整个刷新)，如果需要手动刷新页面使用`webpack/hot/only-dev-server`
config.entry.app.unshift( 'webpack-dev-server/client?http://localhost:' + listenPort + '/', 'webpack/hot/dev-server' );
const compiler = webpack( config );
const server   = new webpackDevServer( compiler, {
    noInfo             : true,
    hot                : true,
    publicPath         : 'http://localhost:' + listenPort + '/',
    historyApiFallback : true
} );
server.listen( listenPort );