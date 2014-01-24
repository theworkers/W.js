Maths.distance = function (obj1, obj2) {
    var x = obj2.x - obj1.x;
    var y = obj2.y - obj1.y;
    return Math.sqrt((x*x)+(y*y));
};
