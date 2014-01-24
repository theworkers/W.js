Maths.angleBetween = function (center, point) {
    var angle = Math.atan2(center.x-point.x,center.y-point.y)*(180/Math.PI);
    if(angle < 0) {
        angle = Math.abs(angle);
    } else {
        angle = 360 - angle;
    }
    return angle;
};
