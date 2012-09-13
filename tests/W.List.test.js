QUnit.config.reorder = false;

test("List creation", function () {
    var list = new W.List();
    ok(list, "created");
});

var list = new W.List();
var obj1 = {cid:1};
var obj2 = {cid:2};
var obj3 = {cid:3};
var obj4 = {cid:4};

test("Length", function () {
    equal(list.length, 0, "Zero length");
    equal(list.append(obj1), list, "Simple append returns the list");
    equal(list.length, 1, "One length");
    equal(list.append(obj2).append(obj3), list, "Chained appened returns the list");
    equal(list.length, 3, "Three length");
    list.append(obj4);
    equal(list.length, 4, "Four length");
});

test("Remove", function () {
    equal(list.remove(obj3).length, 3, "Removed");
    equal(list.remove(obj4).length, 2, "Removed again");
});

var objAfter = {cid:100};
test("Insert after", function () {
    var objAfterThat = {cid:101};
    equal(list.append({cid:102}).length, 3, "Simple append returns the list");
    equal(list.append(objAfter).length, 4, "Simple append returns the list");
    equal(list.append({cid:103}).length, 5, "Simple append returns the list");
    equal(list.append({cid:104}).length, 6, "Simple append returns the list");
    equal(list.insertAfter(objAfter, objAfterThat).length, 7, "Insert after bumps length");
    equal(objAfter.next, objAfterThat, "right order");
    equal(objAfterThat.prev, objAfter, "right order");
});

test("at", function () {
    equal(list.at(1000), false, "couldn't find to big index");
    deepEqual(list.at(0).cid, obj1.cid, "zero index ok");
    deepEqual(list.at(1).cid, obj2.cid, "three index ok");
    deepEqual(list.at(3).cid, objAfter.cid, "three index ok");
});