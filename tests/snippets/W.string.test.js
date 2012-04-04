test("W.use the snippet on this", function () {
	ok(W.use("string", this), "using 'text' with this");
	ok(!!this.addCommas, "has addCommas");
});

test("W.use in a var", function () {
	var string = W.use("string");
	ok(!!string.addCommas, "has addCommas");
});

test("addCommas", function () {
	var string = W.use("string");
	equal(string.addCommas(0), "0", "0 is 0");
	equal(string.addCommas("0"), "0", "'0' is 0");
	equal(string.addCommas(999), "999", "0 is 0");
	equal(string.addCommas(999), 999, "999 is 999");
	equal(string.addCommas("999"), 999, "'999' is 999");
	equal(string.addCommas(1000), "1,000", "1000 is 1,000");
	equal(string.addCommas(1000000), "1,000,000", "1000000 is 1,000,000");
	equal(string.addCommas("1,000,000"), "1,000,000", "'1,000,000' is 1,000,000");
});

test("contains", function () {
	var string = W.use("string");
	ok(string.contains("string has fish", "fish"), "has fish");
	ok(!string.contains("", "fish"), "has not fish");
	ok(!string.contains("fish has fish", "frog"), "has not frog");
	ok(!string.contains("fish", "frog"), "has not frog");
	ok(!string.contains("", "frog"), "has not frog");
	ok(string.contains("frog", "frog"), "has frog");
});

test("trim", function () {
	var string = W.use("string");
	equal(string.trim("fish"), "fish", "'fish' is fish");
	equal(string.trim("fish            ", "fish"), "fish", "'fish            ' is fish");
});

test("startsWith", function () {
	var string = W.use("string");
	ok(string.startsWith("fish", "fi"), "starts with 'fi'");
	ok(!string.startsWith("fish ", "sh"), "not starts with 'sh'");
});

test("endsWith", function () {
	var string = W.use("string");
	ok(string.endsWith("fish", "sh"), "starts with 'sh'");
	ok(!string.endsWith("fish ", "fi"), "not starts with 'fi'");
});

test("hasTld", function () {
	var string = W.use("string");
	ok(!string.hasTld("http://example/ewrewrwer"), "http://example/ewrewrwer has no TLD");
	ok(string.hasTld("http://ross.com/asdf"), "http://ross.com/asdf has TLD");
	ok(!string.hasTld("example/ewrewrwer"), "example/ewrewrwer has no TLD");
	ok(string.hasTld("ross.com/asdf"), "ross.com/asdf has TLD");
});


