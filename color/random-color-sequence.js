function RandomColorSequence ( options ) {
    this.r = Math.random() * 255;
    this.g = Math.random() * 255;
    this.b = Math.random() * 255;
    this.rStep = Math.random() * 10 - 5;
    this.gStep = Math.random() * 10 - 5;
    this.bStep = Math.random() * 10 - 5;
}

RandomColorSequence.prototype.start = function () {
    if (!this.timer) {
        this.timer = new W.Timer({
            updateTime : 10
        });
        this.timer.on("fired", this.update, this);
    }
    this.timer.start();
    return this;
};

RandomColorSequence.prototype.stop = function () {
    this.timer.stop();
    this.timer.off("fired", this.update);
    this.timer = undefined;
    return this;
};

RandomColorSequence.prototype.update = function () {
    this.r += this.rStep;
    this.g += this.gStep;
    this.b += this.bStep;
    if (this.r>255) { this.r=0+(this.r-255); }
    if (this.r<0) { this.r=255-this.r; }
    if (this.g>255) { this.g=0+(this.g-255); }
    if (this.g<0) { this.g=255-this.g; }
    if (this.b>255) { this.b=0+(this.b-255); }
    if (this.b<0) { this.b=255-this.b; }
    return this;
};

RandomColorSequence.prototype.getHex = function () {
    return W.colorValuesToHex(this.r&this.r, this.g&this.g, this.b&this.b);
};