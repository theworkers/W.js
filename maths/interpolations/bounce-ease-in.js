function bounceEaseIn (p) {
    return 1 - W.Math.bounceEaseOut(1 - p);
}