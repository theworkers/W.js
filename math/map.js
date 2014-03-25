// Ease function can be a interpolation function as below
function map ( input, inputMin, inputMax, outputMin, outputMax, clamp, ease ) {
    input = ( input - inputMin ) / ( inputMax - inputMin );
    if ( ease ) {
        input = ease(input);
    } 
    var output = input * ( outputMax - outputMin ) + outputMin;
    if ( !!clamp ) {
        if ( outputMax < outputMin ) {
            if ( output < outputMax ) {
                output = outputMax;
            }
            else if ( output > outputMin ) {
                output = outputMin;
            }
        } else {
            if ( output > outputMax ) {
                output = outputMax;
            }
            else if ( output < outputMin ) {
                output = outputMin;
            }
        }
    }
    return output;
}
