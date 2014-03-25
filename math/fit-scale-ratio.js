function fitScaleRatio (width, height, boundsWidth, boundsHeight) {
    var widthScale = boundsWidth / width;
    var heightScale = boundsHeight / height;
    return Math.min(widthScale, heightScale);
}
