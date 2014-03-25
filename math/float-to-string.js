function floatToString ( value, precision ) {
    var power = Math.pow( 10, precision || 0 );
    return String( Math.round( value * power ) / power );
}