'use strict';
const webpack            = require( 'webpack' );
const util               = require( './util' );
const NyanProgressPlugin = require( 'nyan-progress-webpack-plugin' );
const rootPath           = util.resolvePath( __dirname, '..' );
const srcPath            = util.resolvePath( rootPath, 'src' );
const buildDir           = process.env.NODE_ENV || 'build';
const listenPort         = 80;
const commonConfig       = { buildDir, rootPath, srcPath, listenPort };
const plugins            = [
    new NyanProgressPlugin(),
    new webpack.optimize.CommonsChunkPlugin( {
        name : [ 'app', 'vendor' ]
    } ),
    new webpack.ProvidePlugin( {
        mOxie           : 'moxie',
        $               : 'jquery',
        jQuery          : 'jquery',
        'window.jQuery' : 'jquery'
    } )
];
module.exports           = {
    plugins,
    commonConfig,
    entry   : {
        'vendor' : './src/kit/vendor.js',
        'app'    : [ './src/jobs/app.js' ]
    },
    output  : {
        path : util.resolvePath( commonConfig.rootPath, commonConfig.buildDir )
    },
    resolve : {
        extensions : [ '', '.js' ],
        alias      : {
            'vue'            : 'vue/dist/vue.js',
            'moxie'          : 'Plupload/js/moxie.js',
            'moxie-plupload' : 'Plupload/js/plupload.dev.js'
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
        }, {
            test   : /moxie\-plupload/,
            loader : 'imports?mOxie=moxie!exports?window.plupload'
        }, {
            test   : /moxie/i,
            loader : 'exports?this.mOxie'
        } ]
    }
};