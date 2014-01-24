// module("W.HSLGradient");
var wObj=  new W.Object();
test("Created", function () {
	// Setup
	ok(wObj, "Object was created");
});

var wObjWithMethod =  new (W.Object.extend({
	hasExtended : function () {
		return true;
	}
}))();
test("Extended", function () {
	ok(wObjWithMethod.hasExtended(), "Object has a `hasExtended` function");
});

var wObjWithConstrutor=  new (W.Object.extend({
	constructor : function () {
		this.message = "constructor worked!";
	},
	hasExtended : function () {
		return true;
	}
}))();
test("Extended with constructor", function () {
	equal(wObjWithConstrutor.message, "constructor worked!", "Object set `message` with constructor");
});

var wObjWithContructorOptions = W.Object.extend({
	constructor : function (options) {
		this.options = options;
	}
});
var wObjWithOptions = new wObjWithContructorOptions({message : "saved as option!"});
test("Extended with constructor and options", function () {
	equal(wObjWithOptions.options.message, "saved as option!", "Object stored options");
});

var BaseObject = W.Object.extend({
	baseMethod : function () {
		return true;
	}
});
var SubObject = BaseObject.extend({
	method : function () {
		return true;
	}
});
var wObjSubclassed = new SubObject();
test("Subclassed", function () {
	ok(wObjSubclassed.method(), "object has own method");
	ok(wObjSubclassed.baseMethod(), "object has inherited method");
});

var BaseObjectScoped = W.Object.extend({
	baseResult : "A",
	baseMethod : function () {
		return this.baseResult;
	},
	baseToSubMethod : function () {
		return this.subResult;
	}
});
var SubObjectScoped = BaseObjectScoped.extend({
	subResult : "B",
	subMethod : function () {
		return this.subResult;
	},
	subToBaseMethod : function () {
		return this.baseResult;
	}
});
var baseScopped = new BaseObjectScoped();
var subScopped1 = new SubObjectScoped();
var subScopped2 = new SubObjectScoped();
test("Scoped Check", function () {
	equal(baseScopped.baseMethod(), "A", "base object return own");
	equal(subScopped1.subMethod(), "B", "sub object returns own");
	equal(subScopped1.baseMethod(), "A", "sub object returns base");
	equal(subScopped1.subToBaseMethod(), "A", "sub object inherited returns base");
	equal(subScopped1.baseToSubMethod(), "B", "sub object baseToSubResult returns own");

	subScopped2.baseResult = "C";
	subScopped2.subResult = "D";
	equal(subScopped2.baseMethod(), "C", "sub object 2 returns base");
	equal(subScopped2.subToBaseMethod(), "C", "sub object 2 subToBaseMethod returns base");
	equal(subScopped2.subMethod(), "D", "sub object 2 returns own");
	equal(subScopped2.baseToSubMethod(), "D", "sub object 2 baseToSubResult returns own");

	equal(baseScopped.baseMethod(), "A", "base object return own, uneffected by subScopped2");
	equal(subScopped1.subMethod(), "B", "sub object returns own, uneffected by subScopped2");
	equal(subScopped1.baseMethod(), "A", "sub object returns base, uneffected by subScopped2");
	equal(subScopped1.subToBaseMethod(), "A", "sub object inherited returns base, uneffected by subScopped2");
	equal(subScopped1.baseToSubMethod(), "B", "sub object baseToSubResult returns own, uneffected by subScopped2");
});

var ObjectWthObject = W.Object.extend({
	arr : []
});

var arrObj1 = new ObjectWthObject();
var arrObj2 = new ObjectWthObject();

test("Object in Extend", function () {
	equal(arrObj1.arr.length, 0, "instance contains array");
	arrObj1.arr.push("hello");
	equal(arrObj1.arr.length, 1, "instance contains array with item");
	equal(arrObj1.arr[0], "hello", "first instance contains array item");
	equal(arrObj2.arr[0], "hello", "second instance contains smae array item");
});
