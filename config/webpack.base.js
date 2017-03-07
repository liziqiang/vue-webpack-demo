'use strict';
const webpack            = require( 'webpack' );
const util               = require( './util' );
const rootPath           = util.resolvePath( __dirname, '..' );
const srcPath            = util.resolvePath( rootPath, 'src' );
const buildDir           = process.env.NODE_ENV || 'build';
const commonConfig       = { buildDir, rootPath, srcPath };
const CleanWebpackPlugin = require( 'clean-webpack-plugin' );
const NyanProgressPlugin = require( 'nyan-progress-webpack-plugin' );
const plugins            = [
    new NyanProgressPlugin(),
    new webpack.NoErrorsPlugin(),
    new CleanWebpackPlugin( buildDir, { root : rootPath, verbose : false } ),
    new webpack.optimize.CommonsChunkPlugin( { name : [ 'vendor' ] } ),
    new webpack.ProvidePlugin( {
        mOxie           : 'moxie',
        $               : 'jquery',
        jQuery          : 'jquery',
        'window.jQuery' : 'jquery',
        'Vue'           : 'vue'
    } ),
    new webpack.DefinePlugin( {
        // 配置开发全局常量
        __DIST__  : process.env.NODE_ENV.trim() === 'dist',
        __TEST__  : process.env.NODE_ENV.trim() === 'test',
        __BUILD__ : process.env.NODE_ENV.trim() === 'build'
    } )
];
module.exports           = {
    plugins,
    commonConfig,
    entry   : {
        'app'    : [ './src/jobs/app.js' ],
        'vendor' : './src/kit/vendor.js'
    },
    output  : {
        path : util.resolvePath( commonConfig.rootPath, commonConfig.buildDir )
    },
    resolve : {
        extensions : [ '', '.js', '.vue' ],
        alias      : {
            'vue' : 'vue/dist/vue.js'
        }
    },
    module  : {
        loaders : [ {
            test   : /\.css$/,
            loader : 'style!css'
        }, {
            test   : /\.vue$/,
            loader : 'vue'
        }, {
            test    : /\.js$/,
            exclude : /(node_modules)/,
            loader  : 'babel',
            query   : {
                presets : [ 'es2015' ]
            }
        }, {
            test   : /\.html$/,
            loader : 'html'
        }, {
            test   : /\.(jpe?g|png|gif)$/i,
            loader : 'file'
        } ]
    },
    vue     : {
        loaders : {
            js : 'babel?presets=es2015'
        }
    }
};