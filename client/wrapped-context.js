
var privateNamespace = {};
(function(namespace){
    /*
     * Modified from 
     * Canvas Context2D Wrapper <http://github.com/millermedeiros/CanvasContext2DWrapper>
     * Released under WTFPL <http://sam.zoy.org/wtfpl/>.
     * @author Miller Medeiros <http://millermedeiros.com>
     * @version 1.0 (2010/08/08)
     */
    var _context2DMethods = 'arc arcTo beginPath bezierCurveTo clearRect clip closePath createImageData createLinearGradient createRadialGradient createPattern drawFocusRing drawImage fill fillRect fillText getImageData isPointInPath lineTo measureText moveTo putImageData quadraticCurveTo rect restore rotate save scale setTransform stroke strokeRect strokeText transform translate'.split(' '),
        _context2DProperties = 'canvas fillStyle font globalAlpha globalCompositeOperation lineCap lineJoin lineWidth miterLimit shadowOffsetX shadowOffsetY shadowBlur shadowColor strokeStyle textAlign textBaseline'.split(' ');
    function chainMethod(fn, scope, chainReturn){
        return function(){
            return fn.apply(scope, arguments) || chainReturn;
        };
    }
    function chainProperty(propName, scope, chainReturn){
        return function(value){
            if(typeof value === 'undefined'){
                return scope[propName];
            }else{
                scope[propName] = value;
                return chainReturn;
            }
        };
    }
    namespace.Context2DWrapper = function(target){
        var n = _context2DMethods.length, curProp;
        this.context = target;
        while(n--){
            curProp = _context2DMethods[n];
            this[curProp] = chainMethod(target[curProp], target, this);
        }
        n = _context2DProperties.length;
        while(n--){
            curProp = _context2DProperties[n];
            this[curProp] = chainProperty(curProp, target, this);
        }
    };
}(privateNamespace));

var wrappedContext = function (context) {
    return new privateNamespace.Context2DWrapper(context);
};
