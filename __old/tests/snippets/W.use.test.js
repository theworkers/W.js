test("Use `W.snippet.text` on this", function () {
	ok(!!W.snippet.text, "has W.snippet.text");
	ok(!!W.snippet.text.addCommas, "has W.snippet.text.addCommas");
	W.use(W.snippet.text, this);
	ok(!!this.addCommas, "has W.snippet.text.addCommas");
});

test('Use "text"', function () {
	W.use("text", this);
	ok(!!this.addCommas, "has W.snippet.text.addCommas");
});

test('Use "text" on var', function () {
	var textSnippets = {};
	W.use("text", textSnippets);
	ok(!!textSnippets.addCommas, "var textSnippets has W.snippet.text.addCommas");
});