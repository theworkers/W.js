// # Exists
// ## Client
describe( "Buildsystem for client", function () {

    // ## Client
    utils.checkExists( 'W.ZIndexStack', typeof W.ZIndexStack );
    utils.checkExists( 'W.wrappedContext', typeof W.wrappedContext );
    utils.checkExists( 'W.viewportSize', typeof W.viewportSize );
    utils.checkExists( 'W.touchEventViewMixin', typeof W.touchEventViewMixin );
    utils.checkExists( 'W.polyfillRequestAnimationFrame', typeof W.polyfillRequestAnimationFrame );
    utils.checkExists( 'W.JSONSocketConnection', typeof W.JSONSocketConnection );
    utils.checkExists( 'W.displayViewMixin', typeof W.displayViewMixin );
    utils.checkExists( 'W.clearContext', typeof W.clearContext );

});
