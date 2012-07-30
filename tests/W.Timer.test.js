test("Timer creation", function () {
	var timer = new W.Timer();
	ok(timer, "created");
	ok(timer.on, "has events mixin");
});

asyncTest("Fire Once", 3, function () {
	stop(2);

	var timer = new W.Timer();
	timer.on("fired", W.bind(function (timer) {
		ok(timer.stopTimer(), "timer fired & set to stop");
		start();
	}, this));

	timer.on("stop", function (timer) {
		ok(timer, "timer stopped");
		start();
	}, this);

	ok(timer.start(), "timer started");
	start();
});

asyncTest("Fire Once with loop false", 3, function () {
	stop(2);

	var timer = new W.Timer({
		loops : false
	});
	timer.on("fired", W.bind(function (timer) {
		ok(timer, "timer fired");
		start();
	}, this));

	timer.on("stop", function (timer) {
		ok(timer, "timer stopped");
		start();
	}, this);

	ok(timer.start(), "timer started");
	start();
});

asyncTest("Fire 101 times fast", function () {
	stop(100);

	var timer = new W.Timer({
		updateTime : 10
	});

	timer.on("fired", W.bind(function (timer) {
		ok(timer, "timer fired");
		start();
		if (timer.count() === 100) {
			timer.stopTimer();
		}
	}, this));

	timer.on("stop", function (timer) {
		ok(timer, "timer stopped");
		start();
	}, this);

	ok(timer.start(), "timer started");
	start();
});