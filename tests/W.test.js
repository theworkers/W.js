test("W Created", function () {
	ok(W, "W was created");
});

test("W.each", 10, function () {
	var arr = [1,2,3,4,5];
	var i = 0;
	W.each(arr, function (item, index, data) {
		equal(index,i,"index check on index " + i);
		equal(item,++i,"item in index");
	});
});

test("W.each with context", 10, function () {
	var arr = [1,2,3,4,5];
	var scope = {
		i : 0
	};
	W.each(arr, function (item, index, data) {
		equal(index,this.i,"index check on index " + this.i);
		equal(item,++this.i,"item in index");
	}, scope);
});

test("W.extend", function () {
	var base = {
		fish : "fingers"
	};
	var sub = {};
	W.extend(sub, base);
	equal(sub.fish,"fingers","sub has fish fingers");
});

asyncTest("W.bind", 2, function() {
	var scope = {
		worked : "worked"
	};
	setTimeout(function () {
		notEqual(this.worked, "worked", "without bind carried into timeout");
		start();
	}, 100);
	setTimeout(W.bind(scope, function () {
		equal(this.worked, "worked", "scope carried into timeout");
		start();
	}), 100);

});

asyncTest("W.loop", 11, function() {
	W.loop(10, function (index, next) {
		setTimeout(function () {
			ok("loop " + index);
			next();
		}, 10);
	}, function () {
		ok("Finished callback reached");
		start();
	});
});

asyncTest("W.loop with end()", 6, function() {
	W.loop(10, function (index, next, end) {
		setTimeout(function () {
			ok("loop " + index);
			if (index < 4) {
				next();
			} else {
				end();
			}
		}, 10);
	}, function () {
		ok("Finished callback reached");
		start();
	});
});