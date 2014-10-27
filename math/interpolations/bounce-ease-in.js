function bounceEaseIn (p) {
    return 1 - bounceEaseOut(1 - p);
}