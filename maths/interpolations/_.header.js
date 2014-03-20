(function () {
	//  _From the Penner equations and https://github.com/warrenm/AHEasing/blob/master/AHEasing/easing.c_  
	// Create the namespace
	var W = W || {};
	W.Maths = W.Maths || {};
	W.Maths.interpolations = W.Maths.interpolations || {};
	// Set the context for adding
	var ctx = W.Maths.interpolations;
	// A list of all the interpolations, useful for adding to a selectbox
	ctx.all = ['linearInterpolation', 'quadraticEaseIn', 'quadraticEaseOut', 'quadraticEaseInOut', 'cubicEaseIn', 'cubicEaseOut', 'cubicEaseInOut', 'quarticEaseIn', 'quarticEaseOut', 'quarticEaseInOut', 'quinticEaseIn', 'quinticEaseOut', 'quinticEaseInOut', 'sineEaseIn', 'sineEaseOut', 'sineEaseInOut', 'circularEaseIn', 'circularEaseOut', 'circularEaseInOut', 'exponentialEaseIn', 'exponentialEaseOut', 'exponentialEaseInOut', 'elasticEaseIn', 'elasticEaseOut', 'elasticEaseInOut', 'backEaseIn', 'backEaseOut', 'backEaseInOut', 'bounceEaseIn', 'bounceEaseOut', 'bounceEaseInOut'];
	// Add each interpolations to the context
	for ( var i = 0; i < all.length; ++i ) {
		ctx.interpolations = this[all[i]];
	}
	