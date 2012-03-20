```
|  \ / \  | \| |/ \_ _| | | / _| __|
| o ) o ) | \\ ( o ) |  | U \_ \ _| 
|__/ \_/  |_|\_|\_/|_|  |___|__/___|
```


# W.js

JavaScript Library for Node.js and Client-side Browser

## Usage

     git clone git@github.com:rc1/W.js.git
     cd W.js
     git submodule update --init

## Libraries

### _Node + Client Side_

* W
* W.text
* W.console

### _Client Side Only_

* W.slideshow.*

### _Client Side + Node Compatable_
* W.event 	_not required by node see: [Node's implementation](http://nodejs.org/docs/v0.4.2/api/events.html )_


### Roadmap

* todo
    * add W.each() safe browser and node implementation
    * W.text.enableStringPrototype with W.each() encapsulate each W.text. method, passing `this` as the first argument, a and add to String prototype

* add
	* W.safeJSON    parse if not already JSON
    * W.warn, W.log, W.stub to node.js
    * W.flashcomm
		* *evented flash communication*
    * W.symphony
        * *symphpny datasource and event utilities*
	* W.slideshow
		* all for a transition delegate pattern. this will allow for custom transitions.
		* make jQuery independant
	* W.event
		* @todo   bind events by default
		* @todo   check for non-blocking implemetation
		* <s>@todo   implement bubbling</s> << this is in node. needed for browser? maybe later

-------------

		////////////////////////////
		//    ///////////////    ///    Copyright (c) 2011 The Workers
		///    /////////////    ////    Authors: Ross Cairns
		////    ///// /////    /////
		/////    ///   ///    //////
		//////    /     /    ///////
		///////             ////////
		////////    //     /////////
		/////////  ////   //////////
		////////////////////////////