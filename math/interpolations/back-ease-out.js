// Modeled after overshooting cubic y = 1-((1-x)^3-(1-x)*sin((1-x)*pi))
function backEaseOut (p) {
    var f = (1 - p);
    return 1 - (f * f * f - f * Math.sin(f * Math.PI));  
}