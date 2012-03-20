// Copyright The Workers Ltd. 2012 (theworkers.net)
// @author Ross Cairns
(function (W) {

        if (W.animation ===  undefined) {
            W.animation = {};
        }

        /**
         *  @namespace W.animation.dom
         **/
        W.animation.dom = {};

        /**
         *  Runs all animations which are contained with in DOM Elements class name
         *  @example
         *      // will fade in, duration 500, delayed 2000
         *      <div id="gallery" class="js-in-fadeIn js-in-fadeIn-time-500 js-in-fadeIn-delay-2000"> </div>
         */
        W.animation.dom.runInAnimations = function () {

            // attach an array of all the animations
            W.animation.dom._domAnimations = [];

            // Fade Ins
            W.animation.dom._getAnimations('js-in-fadeIn');

            for (var i=0; i<W.animation.dom._domAnimations.length; i++) {

                if(W.animation.dom._domAnimations[i].type == 'js-in-fadeIn') {
                    var animation = W.animation.dom._domAnimations[i];
                    if (animation.processed === 'not yet') {
                        $(animation.object).fadeOut(0);
                        $(animation.object)
                            .delay(Number(animation["-delay-"]))
                            .fadeIn(Number(animation["-time-"]));
                        animation.processed = 'in';
                    }
                }
            }
        };

        /** Stores animation objects into the current W.animation._domAnimations
         *  @private
         *  @prama (String) animationType   Selector with it will seach for animations with
         */
        W.animation.dom._getAnimations = function (animationType) {
            $("." + animationType + ":not(." + animationType + "-referenced)").each( function () {
                var animationsParams = W.animation.dom._getPramas(animationType, this);
                if(animationsParams.object !== undefined)
                    W.animation.dom._domAnimations.push(animationsParams);
            }).addClass(animationType + "-referenced");
        };

        /** Creates animation o bjects from class names
         *  @private
         *  @prama (String) animationType   Name of animation
         *  @prama (HTMLElement) DOMObject   HTMLElement the Effect are to be applied to
         *  @return (Object) animation objects  {type, object, processed, ...}
         */
        W.animation.dom._getPramas =  function (animationType, DOMObject) {
             var    params = {type: animationType, object: DOMObject, processed: 'not yet'},
                    classNames = DOMObject.className,
                    classNamesArray = classNames.split(" ");

            for (var i=0; i<classNamesArray.length; i++) {
                if(W.utility.stringStartsWith(classNamesArray[i], animationType)) {
                    var propertyAndValue = classNamesArray[i].split(animationType)[1];
                    var propertyAndValueArray = propertyAndValue.split(/([a-zA-Z\-]+)(.*)/);

                    if(propertyAndValueArray[1] !== undefined) {
                        params[propertyAndValueArray[1]] = propertyAndValueArray[2];
                    }
                }
            }
             return params;
         };
})(W);

