function isOk( obj ) {
    if (typeof obj === "undefined") {
        return false;
    }
    if (typeof obj === "string") {
        if ( obj.length === 0 ) {
            return false;
        } else {
            return (/([^\s])/.test(obj));
        }
    }
    if (typeof obj === "number") {
        return true;
    }
    if (obj === null) {
        return false;
    }
    if ( Object.prototype.toString.call( obj ) === '[object Array]' ) {
        return obj.length > 0;
    }
    return !!obj;
}