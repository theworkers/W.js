function wrap ( min, max, v ) {
    return ( ( v-min ) % ( max-min+1 ) + ( max-min+1 ) ) % ( max-min+1 ) + min;
} 
