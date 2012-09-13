////
/// W.List
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

    // inspired by 
    // http://blog.jcoglan.com/2007/07/23/writing-a-linked-list-in-javascript/
    W.List = W.Object.extend({
        constructor : function (options) {
            this.length = 0;
            this.first = null;
            this.last = null;
        },
        append : function(obj) {
            if (this.first === null) {
                obj.prev = obj;
                obj.next = obj;
                this.first = obj;
                this.last = obj;
            } else {
                obj.prev = this.last;
                obj.next = this.first;
                this.first.prev = obj;
                this.last.next = obj;
                this.last = obj;
            }
            ++this.length;
            return this;
        },
        insertAfter : function(after, obj) {
            obj.prev = after;
            obj.next = after.next;
            after.next.prev = obj;
            after.next = obj;
            if (obj.prev == this.last) { 
                this.last = obj; 
            }
            ++this.length;
            return this;
        },
        remove : function (obj) {
            if (this.length > 1) {
                obj.prev.next = obj.next;
                obj.next.prev = obj.prev;
                if (obj == this.first) { this.first = obj.next; }
                if (obj == this.last) { this.last = obj.prev; }
            } else {
                this.first = null;
                this.last = null;
            }
            obj.prev = null;
            obj.next = null;
            --this.length;
            return this;
        },
        at : function (index) {
            if (index >= this.length) {
                return false;
            }
            var obj = this.first;
            if (index===0) {
                return obj;
            }  
            for (var i=0; i<index;++i) {
                obj = obj.next;
            }
            return obj;
        }
    });


}());