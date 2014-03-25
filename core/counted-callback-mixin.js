var countedCallbackMixin = {
    getCountedCallback : function () {
        var self = this;
        self._totalCallbacks =  self._totalCallbacks || 0;
        self._totalCallbacks++;
        // saves a reference for unbinding from events
        this.callbackComplete =  this.callbackComplete || function () { 
            if ( !--self._totalCallbacks ) {
                // executed when all the callbacks are finished
                self.trigger("allCallbacksComplete", self);
            }
        };
        return this.callbackComplete;
    }
};
