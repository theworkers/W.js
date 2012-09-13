test("Created", function () {
	var router =  new W.Router();
	ok(router, "Router was created");
});

test("Test route", 5, function () {
	var router =  new W.Router();
	ok(router, "Router was created");
	var route = router.map("/test/").to(function (params) {
		ok(true, "Router fired");
	});
	ok(route, "Added route/map");
	equal(typeof router.routes["/test/"], "object", "Router has route");
	equal(router.trigger("/test/"), router, "Triggering route");
});

test("Trigger route with no match", 7, function () {
	var router =  new W.Router();
	ok(router, "Router was created");
	var route = router.map("/test/").to(function (params) {
		ok(true, "Router fired");
	});
	var fallbackRoute = router.fallback(function (params) {
		ok("No match route fired");
	});
	ok(route, "Added route/map");
	equal(typeof router.routes["/test/"], "object", "Router has route");
	equal(router.trigger("/test/"), router, "Triggering route");
	equal(router.trigger("/fish/"), router, "Triggering route with no match");
});

test("Route with params", 11, function () {
	var router =  new W.Router();
	ok(router, "Router was created");
	var route = router.map("/test/").to(function (params) {
		ok(true, "Router fired");
	});
	var routeWithParams = router.map("/test/:one/:two/:three/").to(function (params) {
		ok(true, "Router fired");
		equal(params.one, "1", ":one is 1");
		equal(params.two, "fish", ":two is fish");
		equal(params.three, "pizza", ":three is pizza");
	});
	ok(route, "Added route/map");
	equal(typeof router.routes["/test/"], "object", "Router has route");
	equal(router.trigger("/test/"), router, "Triggering route");
	equal(router.trigger("/test/1/fish/"), router, "Triggering with wrong number of params and no fallback");
	equal(router.trigger("/test/1/fish/pizza/"), router, "Triggering with wrong number of params and no fallback");
});

test("Route with context binding", 5, function () {
	var router =  new W.Router();
	ok(router, "Router was created");
	var route = router.map("/test/").to(function (params) {
		ok(!!this.setup, "Router fired in the correct context");
	}, this);
	ok(route, "Added route/map with context binding");
	equal(typeof router.routes["/test/"], "object", "Router has route");
	equal(router.trigger("/test/"), router, "Triggering route");
});