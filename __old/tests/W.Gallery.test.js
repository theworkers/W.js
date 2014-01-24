module("W.gallery.Exhibit");
test("Exhibit", function () {
    var exhibit = new W.gallery.Exhibit();
    ok(exhibit, "created exhibit");
    ok(exhibit.on, "has events mixin");
});

module("W.gallery.Exhibition");
test("Exhibition", function () {
    var exhibition = new W.gallery.Exhibition();
    ok(exhibition, "created exhibition");
    ok(exhibition.on, "has events mixin");
    var i = 0;
    while (i < 10) {
        ok(exhibition.addExhibit(new W.gallery.Exhibit()), "adding exhibit");
        ++i;
    }
    equal(exhibition.usePrevious(), false, "previous returns false (no false)");
    equal(exhibition.useNext(), exhibition._exhibits[1], "next returns 2nd");
    equal(exhibition.useNext(), exhibition._exhibits[2], "next returns 3rd");
    equal(exhibition.useNext(), exhibition._exhibits[3], "next returns 4th");
    equal(exhibition.usePrevious(), exhibition._exhibits[2], "previous returns 3rd");
    equal(exhibition.useAt(6), exhibition._exhibits[6], "using 6th returns 6th");
    equal(exhibition.useNext(), exhibition._exhibits[7], "next returns 7th");
    equal(exhibition.useLast(), exhibition._exhibits[9], "last returns 10th");
    equal(exhibition.useNext(), false, "next returns false (no next)");
    equal(exhibition.usePrevious(), exhibition._exhibits[8], "previous returns 9th");
    equal(exhibition.useFirst(), exhibition._exhibits[0], "first returns first");
});

module("W.gallery.Gallery");
test("Gallery", function () {
    var gallery = new W.gallery.Gallery();
    ok(gallery, "gallery created");
    ok(gallery.on, "has events mixin");
});
test("settings", function () {
    var gallery = new W.gallery.Gallery({
        loops : false,
        displayTime : 4000
    });
    ok(gallery.options.loops === false, "looping sets to false");
    ok(gallery.options.startsPlaying === true, "startsPlaying left as default");
    ok(gallery.options.displayTime === 4000, "displayTime sets to 4000");
});
test("transition management", function () {
    var gallery = new W.gallery.Gallery();
    equal(gallery._transitions['default_transition'], gallery.basicTransition, "has default transition");
    var myTransition = function (completed, nextExhibit, previousExhibit) {
        completed();
    };
    gallery.addTransition('mTransition', myTransition);
    equal(gallery._transitions['mTransition'], myTransition, "has custom transition");
    equal(gallery.getTransition('mTransition'), myTransition, "can get custom transition");
    equal(gallery.getTransition(), gallery.getTransition('default_transition'), "is using default transition");
    ok(gallery.setTransitionType('mTransition'), "setting transition to mTransition");
    equal(gallery.getTransition(), myTransition, "now mTransition transition");
});
test("adding exhibitions and status", function () {
    var gallery = new W.gallery.Gallery();
    
    var exhibition = new W.gallery.Exhibition();
    var i=0;
    while(i < 50) {
        exhibition.addExhibit(new W.gallery.Exhibit());
        ++i;
    }
    gallery.addExhibition(exhibition);
    equal(gallery.exhibition.length, 50, "gallery has exhbition with 50 exhibits");

    var status = gallery.status();
    equal(status.exhibition, exhibition, "status returns exhibition");
    equal(status.totalExhibits, 50, "status returns 50 exhibits");
    equal(status.currentExhibitIndex, 0, "status returns 1st exhibits index");
    equal(status.isPlaying, true, "status returns is playing");
    equal(status.loops, true, "status returns will loop");
    
    var otherExhibition = new W.gallery.Exhibition();
    i=0;
    while(i < 25) {
        otherExhibition.addExhibit(new W.gallery.Exhibit());
        ++i;
    }

    // mix the settings
    gallery.options.startsPlaying = false;
    equal(gallery.options.startsPlaying, false, "set to stop playing");
    equal(gallery.addExhibition(otherExhibition), gallery, "added other exhibition");
    equal(gallery.status().isPlaying, false, "status returns not playing");
    equal(gallery.status().exhibition, otherExhibition, "status returns other exhibition");
    equal(gallery.status().currentExhibitIndex, 0, "status returns 1st exhibits index");

});

test("controller with synchronous transition", function () {
    var gallery = new W.gallery.Gallery();
    equal(gallery, gallery.controller.gallery, "controller has correct gallery reference");
    var exhibition = new W.gallery.Exhibition();
    var exhibits = [];
    var i=0;
    while(i < 50) {
        var exhibit = new W.gallery.Exhibit();
        exhibits.push(exhibit);
        exhibition.addExhibit(exhibit);
        ++i;
    }
    gallery.addExhibition(exhibition);
    equal(gallery.status().isPlaying, true, "is playing");
    equal(gallery.controller.stop(), gallery.controller, "stopping gallery");
    equal(gallery.status().isPlaying, false, "status returns stopped");
    equal(gallery.controller.play(), gallery.controller, "starting gallery");
    equal(gallery.status().isPlaying, true, "status returns playing");
    equal(gallery.controller.stop(), gallery.controller, "stopping gallery");
    equal(gallery.controller.next(), gallery.controller, "next");
    equal(gallery.controller.next(), gallery.controller, "next");
    equal(gallery.controller.next(), gallery.controller, "next");
    equal(gallery.controller.next(), gallery.controller, "next");
    equal(gallery.status().currentExhibitIndex, 4, "gallery showing 5th exhibit");
    equal(gallery.controller.previous(), gallery.controller, "previous");
    equal(gallery.controller.previous(), gallery.controller, "previous");
    equal(gallery.status().currentExhibitIndex, 2, "gallery showing 3th exhibit");
    equal(gallery.controller.last(), gallery.controller, "last");
    equal(gallery.status().currentExhibitIndex, 49, "gallery showing 50th exhibit");
    equal(gallery.controller.first(), gallery.controller, "first");
    equal(gallery.status().currentExhibitIndex, 0, "gallery showing 1th exhibit");

});

asyncTest("controller with asynchronous transition", function () {
    stop(10);
    var gallery = new W.gallery.Gallery();
    gallery.options.displayTime = 1000;
    var exhibition = new W.gallery.Exhibition();
    var exhibits = [];
    var i=0;
    while(i < 50) {
        var exhibit = new W.gallery.Exhibit();
        exhibits.push(exhibit);
        exhibition.addExhibit(exhibit);
        ++i;
    }
    ok(gallery.on(W.gallery.events.TRANSITION_FINISHED, function () {
        ok(true, "image changed");
        start();
    }, this), "added change listener");
    gallery.addExhibition(exhibition);

});
