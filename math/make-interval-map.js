// Maps a value from one range to another
function makeIntervalMap () {
    var fromMin = 0;
    var fromMax = 1;
    var toMin = 0;
    var toMax = 1;
    var clamp = false;
    var ease;
    var chain = {
        to: function ( l, h ) { toMin = l; toMax = h; return chain; },
        toMin: function ( v ) { toMin = v; return chain; },
        toMax: function ( v ) { toMax = v; return chain; },
        from: function ( l, h ) { fromMin = l; fromMax = h; return chain; },
        fromMin: function ( v ) { fromMin = v; return chain; },
        fromMax: function ( v ) { fromMax = v; return chain; },
        ease: function ( fn ) { ease = fn; return chain; },
        clamp: function ( v ) { clamp = arguments.length > 0 ? v : true; return chain;  },
        map: function ( v ) { return W.map( v, fromMin, fromMax, toMin, toMax, clamp, ease ); }
    };
    return chain;
}
