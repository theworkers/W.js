(function () {
    var root = this;
    var W = root.W || {};
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = W;
        root.W = W;
    } else {
        root.W = W;
    }

    /** @namespace W.console */
    W.console = {};

    /**
     *  Safe console. Aliased using W.l(); or W.log();
     *  @param      {Object ...}    obj     Objects to log to console
     **/
    W.console.log = function () {
        if(arguments.length > 0) {
            // join for graceful degregation
            var args = (arguments.length > 1) ? Array.prototype.join.call(arguments, " ") : arguments[0];
            // this is the standard; firebug and newer webkit browsers support this
            try {
                console.log(args);
                return true;
            } catch(e) {
                // newer opera browsers support posting erros to their consoles
                try {
                    opera.postError(args);
                    return true;
                } catch(e) { }
            }

            // catch all; a good old alert box
            //alert(args);
            return false;
        }
    };

    /**#@+
     *  Alias of {@link W.console.log}()
     *  @methodOf   W
     *  @param      {Object ...}    obj     Objects to log to console
     **/
    /** */  W.log = W.console.log;
    /** */  W.l = W.log;
    /**#@-*/
 
    /**
     *  Safe console warning. Aliased using W.w(); or W.warn();
     *  @param      {Object ...}    obj     Objects sent to console as warning
     **/
    W.console.warn = function () {
        if(arguments.length > 0) {

            // join for graceful degregation
            var args = (arguments.length > 1) ? Array.prototype.join.call(arguments, " ") : arguments[0];

            // this is the standard; firebug and newer webkit browsers support this
            try {
                    console.warn(args);
                    return true;
            } catch(e) {
                   
            }
            return false;
        }
    };

     /**#@+
     *  Alias of {@link W.console.warn}(obj)
     *  @methodOf   W
     *  @param      {Object ...}    obj     Objects sent to console as warning
     **/
    /** */  W.warn = W.console.warn;
    /** */  W.w = W.warn;
    /**#@-*/

    /**
     * Use to mark a function as a place holder during development
     * @param   {String ...}     name    Name of the stub method / function plus any additional details
     *
     */
    W.stub = function () {
        if(arguments.length > 0) {

            // join for graceful degregation
            var args = (arguments.length > 1) ? Array.prototype.join.call(arguments, " ") : arguments[0];

            // this is the standard; firebug and newer webkit browsers support this
            try {
                    W.warn("@stub: "+ args);
                    return true;
            } catch(e) {

            }
            return false;
        }
    };

}());