const config  = require( './webpack.test' );
const webpack = require( 'webpack' );
webpack( config, function( err, stats ) {
    // show build info to console
    console.log( stats.toString( { chunks : false, color : true } ) );
} );