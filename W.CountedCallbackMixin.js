////
/// W.CountedCallbackMixin
// @author Ross Cairns
(function () {
    var root = this;
    var W = root.W || {};
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = W;
        root.W = W;
    } else {
        root.W = W;
    }

    W.CountedCallbackMixin = {
        getCountedCallback : function () {
            var self = this;
            self._totalCallbacks =  self._totalCallbacks || 0;
            self._totalCallbacks++;
            // saves a refernce for unbinding from events
            this.callbackComplete =  this.callbackComplete || function () { 
                if (!--self._totalCallbacks) {
                    // executed when all the callbacks are finished
                    self.trigger("allCallbacksComplete", self);
                }
            };
            return this.callbackComplete;
        }
    };


}());