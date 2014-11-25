function isClose ( input, point, tolerance ) {
    return ( input > point - tolerance && input < point + tolerance );
}
