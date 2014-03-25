// Underscore.js 1.6.0
// http://underscorejs.org
// (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
// Underscore may be freely distributed under the MIT license.
function extend ( obj ) {
    each( Array.prototype.slice.call( arguments, 1 ), function ( source ) {
        if (source) {
            for (var prop in source) {
                obj[prop] = source[prop];
            }
        }
    });
    return obj;
 }