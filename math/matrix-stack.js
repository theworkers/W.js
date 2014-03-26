// Requires 'gl-matrix' http://glmatrix.net

// # Class
function MatrixStack () {
    this.stack = [ this.mat4.create() ];
}

// # Gl-Matrix inheritance
// Extend gl-matrix as in browser it is global, in node it is a module
if (typeof module !== 'undefined' && module.exports) {
    // NPM
    W.extend( MatrixStack.prototype, require( 'gl-matrix' ) );
} else {
    // re-wrap in browser
    W.extend( MatrixStack.prototype, {
        glMatrix : glMatrix,
        mat2 : mat2,
        mat2d : mat2d,
        mat3 : mat3,
        mat4 : mat4,
        quat : quat,
        vec2 : vec2,
        vec3 : vec3,
        vec4 : vec4
    });
}

// # Methods

MatrixStack.prototype.getMat = function () {
    return this.stack[ this.stack.length - 1 ];
};

MatrixStack.prototype.push = function () {
    // clone the last matrix so all transition are applied
    this.stack.push( this.mat4.clone( this.getMat() ) );
    return this;
};

MatrixStack.prototype.pop = function () {
    this.stack.pop();
    return this;
};

MatrixStack.prototype.rotateZ = function ( rad ) {
    this.mat4.rotateZ( this.getMat(), this.getMat(), rad );
    return this;
};

MatrixStack.prototype.translate = function ( x, y, z ) {
    y = y || 0;
    z = z || 0;
    this.mat4.translate( this.getMat(), this.getMat(), [ x, y, z ] );
    return this;
};

MatrixStack.prototype.applyTo = function ( arr ) {
    if ( arr.length === 2 ) {
        this.vec2.transformMat4( arr, arr, this.getMat() );
    }
    return this;
};