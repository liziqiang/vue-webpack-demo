const config  = require( './webpack.dist' );
const webpack = require( 'webpack' );
webpack( config, function( err, stats ) {
    // show build info to console
    console.log( stats.toString( { chunks : false, color : true } ) );
} );