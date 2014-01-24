Maths.normalize = function (value, min, max, ease) {
    value = W.Math.clamp((value-min)/(max-min),0,1);
    return ease ? ease(value) : value;
};