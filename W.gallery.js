(function () {
    var root = this;
    var W = root.W || {};
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = W;
        root.W = W;
    } else {
        root.W = W;
    }

    W.gallery = W.gallery || {};
    W.gallery.version = 2;

    // Event Constants
    W.gallery.events = {
        EXHIBIT_DID_CHANGE : "exhibit changed",
        EXHIBIT_WILL_CHANGE : "exhibit will change",
        STATE_DID_CHANGE : "state did change",
        EXHIBITION_ADDED_TO_GALLERY : "exhibition added to gallery"
    };

    W.gallery.Exhibit = W.Object.extend({
        constructor : function (options) {
            this.el = options.el || document.createElement('div');
            this.juggler = new W.gallery.Juggler();
            this.controller = new W.gallery.Controller();
            this.exhibition = undefined;
            this.events = new W.event.Dispatcher();
        }
    });

    W.gallery.Exhibition = W.Object.extend({
        constructor : function (options) {
            this._exhibits = [];
            this.currentExhibitIndex = -1;
            this.length = 0;
        },
        addExhibit : function () { return this; },
        getNextExhibit : function () {  },
        getPreviousExhibit : function () {  },
        getLastExhibit : function () {  },
        getFirstExhibit : function () {  },
        getExhibit : function (index) { }
    });

    W.gallery.Controller = W.Object.extend({
        constructor : function (options) {

        },
        play : function () { return this; },
        goto : function () { return this; },
        last : function () { return this; },
        first : function () { return this; },
        next : function () { return this; },
        previous : function () { return this; },
        stop : function () { return this; }
    });

    W.gallery.Gallery = W.Object.extend({
        constructor : function (options) {
            this.controller = new W.gallery.Controller();
        },
        getStatus : function () {

        }
    });

    W.gallery.Juggler = W.Object.extend({
        constructor : function (options) {

        },
        start : function () {

        },
        stop : function () {

        },
        next : function () {

        },
        transitionTo : function (toExhibit) {

        }
    });

}());