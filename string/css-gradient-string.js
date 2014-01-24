
// @note webkit only
// 
//     W.cssGradientString().add(0, "#FF0000").add(0, "#00FF00").add(0, "#0000FF").get();
var cssGradientString = function(stops) {
    var values = [];
    var _direction = "left"; // "top", "right", "bottom", "left", "-45.0deg"
    var promise = {
        direction : function (direction) {
            _direction = direction;
            return promise;
        },
        add : function (precentage, value) {
            values.push([precentage, value]);
            return promise;
        },
        get : function () {
            var str = "-webkit-linear-gradient(" + _direction + ", ";
            for (var i = 0; i<values.length; i++) {
                str += values[i][1] + " " + values[i][0] + "%";
                if (i<values.length-1) { str += ","; }
            }
            str += ")";
            return str;
        }
    };
    return promise;
};
