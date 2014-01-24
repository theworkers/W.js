W.Sequencer = function Sequence(fn) {
    var self = this;
    var fns = [];
    var done = function () {
        fns.shift();
        if (fns.length > 0) { triggerFn(fns[0]); }
        return self;
    };
    this.then = function (fn) {
        fns.push(fn);
        return self;
    };
    this.delay = function (ms) {
        self.then(function (done) {
            setTimeout(done, ms);
        });
        return self;
    };
    this.start = function () {
        triggerFn(fns[0]);
        return self;
    };
    function triggerFn (fn) {
        // it expects an done object
        if (fn.length > 0) {
            fn(done);
        } else {
            fn();
            done();
        }
    }
    if (typeof fn === 'function') {
        this.then(fn);
    }
    return this;
};

/**
 * A function sequencer with `delay` and `then` methods. Functions passed to `then` can have an optional argument `done` which can be used to trigger the function finishing
 * @param  {Function} fn optional first argument
 * @return {[Sequencer]} object with `delay` and `then` methods.
 * @example
 *     sequence(function (done) {
 *         console.log(0);
 *         done();
 *     })
 *     .then(function (done) {
 *         console.log(1);
 *         done();
 *     })
 *     .delay(1000)
 *     .then(function () {
 *         console.log(2);
 *     })
 *     .delay(1000)
 *     .then(function (done) {
 *         console.log(3);
 *         done();
 *     })
 *     .delay(1000)
 *     .then(function (done) {
 *         console.log(4);
 *         done();
 *     })
 *     .start();
 */
W.sequence = function (fn) {
    return new Sequencer(fn);
};