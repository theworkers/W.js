function bounceEaseInOut (p) {
    if(p < 0.5) {
        return 0.5 * bounceEaseIn(p*2);
    } else {
        return 0.5 * bounceEaseOut(p * 2 - 1) + 0.5;
    }
}