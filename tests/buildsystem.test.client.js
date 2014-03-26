// # Exists
// ## Client
describe( "Buildsystem for client", function () {

	utils.checkExists( 'W.zIndexStack', typeof W.zIndexStack );
	utils.checkExists( 'W.wrappedContext', typeof W.wrappedContext );
	utils.checkExists( 'W.viewportSize', typeof W.viewportSize );
	utils.checkExists( 'W.touchEventViewMixin', typeof W.touchEventViewMixin );
	utils.checkExists( 'W.polyfillRequestAnimationFrame', typeof W.polyfillRequestAnimationFrame );
	utils.checkExists( 'W.jsonSocketConnection', typeof W.jsonSocketConnection );
	utils.checkExists( 'W.displayViewMixin', typeof W.displayViewMixin );
	utils.checkExists( 'W.clearContext', typeof W.clearContext );

});
