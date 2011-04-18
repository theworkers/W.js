/* Author: RossCairns.com

*/

$(document).ready(function () {

    // Set up slide show
    //

    var $gallery_view = $("#gallery");  //  gallery div to use as view
    
    var gallery = new W.gallery.Gallery( $gallery_view );
    
    window.gallery = gallery;
    
    /*
    gallery.setSettings({
        transitionInTime: 300,
        transitionOutTime: 1
    })*/

    $("#js-previous").css({cursor:"pointer"}).click(function () { gallery.controller.previous() });
    $("#js-next").css({cursor:"pointer"}).click(function () { gallery.controller.next() });
    $("#js-first").css({cursor:"pointer"}).click(function () { gallery.controller.first() });
    $("#js-last").css({cursor:"pointer"}).click(function () { gallery.controller.last() });
    $("#js-play").css({cursor:"pointer"}).click(function () { gallery.controller.play() });
    $("#js-stop").css({cursor:"pointer"}).click(function () { gallery.controller.stop() });

    
    
    gallery.addEventlistener(gallery.EXHIBIT_DID_CHANGE, function () {
    	
    	var status = gallery.getStatus();    	
    	
    	if (status.totalExhibits > 1 && status.currentExhibitIndex == 0 ) {
    		$("#js-first").addClass('active');
    		$("#js-last").removeClass('active');	
    	} else if (status.totalExhibits > 1 && status.currentExhibitIndex == status.totalExhibits-1 ) {
    		$("#js-first").removeClass('active');
    		$("#js-last").addClass('active');
    	} else {
    		$("#js-first").removeClass('active');
    		$("#js-last").removeClass('active');
    	}
    	
    	W.l(status.loops);
    	
    	if (!status.loops) {
    		if (status.totalExhibits > 1 && status.currentExhibitIndex == 0 ) {
	    		$("#js-previous").addClass('disabled');
	    		$("#js-next").removeClass('disabled');	
	    	} else if (status.totalExhibits > 1 && status.currentExhibitIndex == status.totalExhibits-1 ) {
	    		$("#js-previous").removeClass('disabled');
	    		$("#js-next").addClass('disabled');
	    	} else {
	    		$("#js-previous").removeClass('disabled');
	    		$("#js-next").removeClass('disabled');
	    	}
    	}
    });
    gallery.addEventlistener(gallery.EXHIBIT_WILL_CHANGE, function () {
    	
    	var status = gallery.getStatus();
    	
    	createPaging($("#js-gallery-paging"), status);

    	
       //$("#gallery-controls").addClass("js-inactive");
    });
    gallery.addEventlistener(gallery.STATE_DID_CHANGE, function () {
		
		var status = gallery.getStatus();
		
		W.l();
		
		if ( status.isPlaying ) {
			$("#js-play").addClass('active');
			$("#js-stop").removeClass('active');
		} else {
			$("#js-play").removeClass('active');
			$("#js-stop").addClass('active');
		
		}
    });
    
    ////
    ///  Load First Gallery
    //
    var exhibition = new W.gallery.Exhibition();
    
    exhibition.addEventlistener(exhibition.EXHIBITION_ADDED_TO_GALLERY, function () {
    	
    	// example chaining 
    	gallery.controller.next().next().previous().previous().play();
    	
    	
    })
    
    loadGallery("ajax/gallery_1.ajax", exhibition);
    
});

function loadGallery (url, exhibition) {

	var exhibition = exhibition;

	// request slide show
    $.ajax({
       url: url,
       success: function (data) {
           W.w("using parse json, shou0ld be headered content type");
           data = $.parseJSON(data);

           //var exhibition = new W.gallery.Exhibition();

           W.aloop(
                // Number of Interations
                data.album.length,

                // Interation
                function (index, loop) {
                   
                   var $view = $("<div><img src='" + data.album[index].src + "' /></div>");
                   
                   var exhibit = new W.gallery.Exhibit( $view );
                   
                   exhibit.applyDefaultCSS();

                   exhibition.addExhibit( exhibit );

                   // next!
                   loop.next();
                },

                // Done
                function () {
                    gallery.addExhibition( exhibition );
                }
          );
       }
    });

}

function createPaging( $selector, status ) {
	
	$selector.empty();
	
	var $link;
	
	for (var i=0; i<status.totalExhibits; i++) {
		
		$link = $("<span class='js-paging-item'>" + i + "</span>");
		

		$link.data("number", i)
		
		$link.css({cursor:"pointer"}).click( function () {
			W.l($(this).data("number"));
			gallery.controller.goto( $(this).data("number") );
		});


		
		if ( i == status.currentExhibitIndex ) {
			$link.addClass('active');
		}
		
		$selector.append($link);
		$selector.append("&nbsp;&nbsp;");
	}
	
}
























