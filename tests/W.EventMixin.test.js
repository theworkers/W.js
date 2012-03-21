test("W.EventMixin", 9	, function () {
	var TEST_EVENT_NAME = "TEST_EVENT_NAME";

	var Obj = W.Object.extend({
		constructor : function (options) {
			W.extend(this, W.EventMixin);
		}
	});
	var mObj = new Obj();

	equal(mObj.events().length, 0, "mixed in, no events");

	var testEventHandler = function () {
		ok("event run");
	};
	var testEventWithDataHandler = function (data) {
		equal(data.data, "data", "datasent");
	};

	mObj.on(TEST_EVENT_NAME, testEventHandler);
	equal(mObj.events()[TEST_EVENT_NAME].length, 1, "one event");

	mObj.trigger(TEST_EVENT_NAME);

	mObj.on(TEST_EVENT_NAME, testEventWithDataHandler);

	equal(mObj.events()[TEST_EVENT_NAME].length, 2, "two events");
	mObj.trigger(TEST_EVENT_NAME, {data:"data"});

	mObj.off(TEST_EVENT_NAME, testEventHandler);

	equal(mObj.events()[TEST_EVENT_NAME].length, 1, "removed event");

	mObj.off(TEST_EVENT_NAME, testEventWithDataHandler);
	equal(mObj.events()[TEST_EVENT_NAME].length, 0, "removed event with data");

	mObj.off(TEST_EVENT_NAME, testEventHandler);

	var scope = {
		yo : "fish"
	};
	mObj.on(TEST_EVENT_NAME, function (data) {
		console.log(this);
		equal(this.yo, "fish", "context worked");
	}, scope);

	mObj.trigger(TEST_EVENT_NAME);

});