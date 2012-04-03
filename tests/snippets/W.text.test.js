test("W.use the snippet on this", function () {
	ok(W.use("text", this), "using 'text' with this");
	ok(!!this.addCommas, "has addCommas");
});

test("W.use in a var", function () {
	var text = W.use("text");
	ok(!!text.addCommas, "has addCommas");
});

test("addCommas", function () {
	var text = W.use("text");
	equal(text.addCommas(0), "0", "0 is 0");
	equal(text.addCommas("0"), "0", "'0' is 0");
	equal(text.addCommas(999), "999", "0 is 0");
	equal(text.addCommas(999), 999, "999 is 999");
	equal(text.addCommas("999"), 999, "'999' is 999");
	equal(text.addCommas(1000), "1,000", "1000 is 1,000");
	equal(text.addCommas(1000000), "1,000,000", "1000000 is 1,000,000");
	equal(text.addCommas("1,000,000"), "1,000,000", "'1,000,000' is 1,000,000");
});

test("contains", function () {
	var text = W.use("text");
	ok(text.contains("fish has fish", "fish"), "has fish");
	ok(!text.contains("", "fish"), "has not fish");
	ok(!text.contains("fish has fish", "frog"), "has not frog");
	ok(!text.contains("fish", "frog"), "has not frog");
	ok(!text.contains("", "frog"), "has not frog");
	ok(text.contains("frog", "frog"), "has frog");
});

test("trim", function () {
	var text = W.use("text");
	equal(text.trim("fish"), "fish", "'fish' is fish");
	equal(text.trim("fish            ", "fish"), "fish", "'fish            ' is fish");
});

test("startsWith", function () {
	var text = W.use("text");
	ok(text.startsWith("fish", "fi"), "starts with 'fi'");
	ok(!text.startsWith("fish ", "sh"), "not starts with 'sh'");
});

test("endsWith", function () {
	var text = W.use("text");
	ok(text.endsWith("fish", "sh"), "starts with 'sh'");
	ok(!text.endsWith("fish ", "fi"), "not starts with 'fi'");
});

