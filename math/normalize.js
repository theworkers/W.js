function normalize (value, min, max, ease) {
    value = clamp((value-min)/(max-min),0,1);
    return ease ? ease(value) : value;
}