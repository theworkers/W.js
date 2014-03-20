function clamp ( value, min, max, callbackOnClamp ) {
    if ( max < min ) {
        if ( value < max ) {
            if ( typeof callbackOnClamp === 'function' ) {
                callbackOnClamp( value, max );
            }
            value = max;
        }
        else if ( value > min ) {
            if ( typeof callbackOnClamp === 'function' ) {
                callbackOnClamp( value, min );
            }
            value = min;
        }
    } else {
        if ( value > max ) {
            if ( typeof callbackOnClamp === 'function' ) {
                callbackOnClamp( value, max );
            }
            value = max;
        }
        else if ( value < min ) {
            if ( typeof callbackOnClamp === 'function' ) {
                callbackOnClamp(value, min);
            }
            value = min;
        }
    }
    return value;
};
