# W.js – Version 2.1.0

> "A Welterweight Backbone.js & Miscellaneous Utility Pack."

Client and server side JavaScript library produced & used by [TheWorkers.net](http://theworkers.net/), a creative studio based in East London.

---------------
## About

* [Readme](https://github.com/theworkers/w.js)

* Files
	* Core
		* W.js contains: W, W.bind, W.extend, W.ayncLoop [[source]](W.js) [[test]](tests/W.test.html) 
		* W.Object.js [[source]](W.Object.js) [[test]](tests/W.Object.test.html)
		* W.EventMixin.js [[source]](W.EventMixin.js) [[test]](tests/W.EventMixin.test.html)
	* Utility
		* W.Timer.js [[source]](W.Timer.js) [[test]](tests/W.Timer.test.html)
		* W.Router.js [[source]](W.Router.js) [[test]](tests/W.Router.test.html)

---------------
## In Development
	
* Dom
	* W.gallery.js [[source]](W.gallery.js) [[test]](tests/W.Gallery.test.html)
* Core
	* W.CountedCallbackMixin [[source]](W.CountedCallbackMixin.js)
* Utility
	* W.HSLGradient.js [[source]](W.HSLGradient.js) [[test]](tests/W.Timer.test.html)
* Canvas Utilities
	* W.DisplayViewMixin [[source]](W.DisplayViewMixin.js)
	* W.TouchEventViewMixin [[source]](W.TouchEventViewMixin.js)

---------------
## Snippets

* W.snippets.dom [[source]](snippets/W.snippet.dom.js)
* W.snippets.math [[source]](snippets/W.snippet.math.js)
* W.snippets.social [[source]](snippets/W.snippet.social.js)
* W.snippets.string [[source]](snippets/W.snippet.string.js)

---------------
## Build files

* build/W.js [[source]](build/W.js)
* build/W.min.js [[source]](build/W.min.js)


&nbsp;
---------------
## Usage Pointers

### W.Object

Example: Define a class

    var Object = W.Object.extend({
    	constructor : function (options) {
    		// define ivars
    		this.property1 = 1;
    		this.property2 = options.name;
    		// call method
    		this.method();
    	},
    	// methods*
    	method1 : function () { 
    		console.log( this.property1 );
    	},
    	method2 : function () { 

    	},
    });

Example: Initiate object

	var object = new Object({ 
		// optional options object, passed 
		// to the constructor function
		name : "spiderman" 
	});


_*good practice to only create functions here, although any object can be defined._

Example: Mixin

	var mixin = {
		mixedIn : function () {
			// initiate property if it is not already initiated*
			this.property = this.property || 1;
			console.log(this.property);
			this.property++;
		}
	}

	var Object =  W.Object.extend({
    	constructor : function (options) {
    		W.extend(this, mixin);

    		this.mixedIn(); // will output 1
    		this.mixedIn(); // will output 2
    	},
    });

### W.extend

Extends one object with the values of another. Same as [UnderScore Extend](http://documentcloud.github.com/underscore/#extend).

### W.bind

Will make a passed function execute within the the passed scope (_this_). Same as [UnderScore Bind](http://documentcloud.github.com/underscore/#extend). Handy for events.

### W.EventMixin

    var EventedObject = W.Object.extend({
    	constructor = function (options) {
    		W.extend(this, W.EventMixin);
    	},
    	methodWithEvent : function () {
    		this.trigger("joy", { message : "woop" });
    	}
    });

    var Listener = W.Object.extend({
    	constructor = function (options) {
    		this.evented = options.evented;
    		// listen without guaranteed scope
    		this.evented.on("joy", this.shout);
    		// list with guaranteed scope (binded scope)
    		this.evented.on("joy", W.bind(this.shout, this));
    		// or just
    		this.evented.on("joy", this.shout, this);
    	},
    	shout : function (data) {
    		console.log(data.message);
    	}
    });

    var evented = new EventedObject();
    var listener = new Listener({
    	evented : evented
    });

    evented.methodWithEvent(); // woop woop woop

## Recommended coding styles & patterns

### W.Object

Backbone like DOM element reference

	var Object = W.Object.extend({
		constructor = function (options) {
			// the dom element
			this.el = options.el || document.createElement("div");
		}
	});

	var object = new Object();
	$("body").append(object.el);

Backbone like DOM element reference but for canvas

	var Object = W.Object.extend({
		constructor = function (options) {
			// the object
			this.el = options.el || document.createElement("canvas");
			// the context
			this.context = options.context || this.el.getContext("2d");
		},
		draw : function () {
			this.context.beginPath();
			this.context.moveTo(10, 10);
			this.context.lineTo(20, 10); 
			this.context.closePath();
		}
	});

	var canvas = $("canvas")[0];
	var context = canvas.getContext("2d");

	var object = new Object({
		el : canvas,
		context : context
	});

	// e.g. with a timeout or on [requestAnimationFrame](https://developer.mozilla.org/en/DOM/window.requestAnimationFrame)
	setTimeout(function () {
		object.draw();
	}, 60);
	
Backbone like reference to options

    var Object = new W.Object({
    	constructor : function (options) {
    		this.options = options;
    	}
    });

Default options

    var Object = new W.Object({
    	constructor : function (options) {
    		this.options  = W.extend({
    			name : "no name";
    		}, options);
    	}
    });

    var p1 = new Object();
    var p2 = new Object({ name : "superman" });

    console.log(p1.options.name, p1.options.name); // no name, superman

### Mixins: 

Mixin which needs enabled (i.e. needs to initial events and/or many properties)

	var MixinName = {
		enableMixinName : function () {
			// create properties
			this.property = 1;
			// enable events
			this.on("something");
			$(window).resize();
		},
		mixedIn : function () { 
			console.log(this.property++);
		}
	}

	var Object = new W.Object({
		constructor : function () {
			W.extend(this, MixinName);
			this.enableMixinName;
		}
	});