/* Author: RossCairns.com

*/

$(document).ready(function () {

    // Set up slide show
    //

    var $main_gallery = $("#gallery");  //  gallery div to use as view
    var slideshowController = new W.slideshow.Controller($main_gallery);
    slideshowController.setSettings({
        transitionInTime: 300,
        transitionOutTime: 1
    });

    $("#js-previous-slide").css({cursor:"pointer"}).click(function () { slideshowController.previous() });
    $("#js-next-slide").css({cursor:"pointer"}).click(function () { slideshowController.next() });
    $("#js-first-slide").css({cursor:"pointer"}).click(function () { slideshowController.first() });
    $("#js-last-slide").css({cursor:"pointer"}).click(function () { slideshowController.last() });
    $("#js-play").css({cursor:"pointer"}).click(function () { slideshowController.play() });
    $("#js-stop").css({cursor:"pointer"}).click(function () { slideshowController.stop() });

    // example chainging (combinations may fail)
    //slideshow.last().play();

    function slideWillChange(stats) {
       $("#gallery-controls").addClass("js-inactive");
    }

    function slideDidChange(stats) {
       $("#gallery-controls").removeClass("js-inactive");
    }

    function playStateChange(stats) {
        W.l("play state changed");
        W.l(stats);
    }
    slideshowController.addEventlistener(slideshowController.SLIDE_WILL_CHANGE, function (stats) { slideWillChange(stats); });
    slideshowController.addEventlistener(slideshowController.SLIDE_DID_CHANGE, function (stats) { slideDidChange(stats); });
    slideshowController.addEventlistener(slideshowController.PLAY_STATE_CHANGE, function (stats) { playStateChange(stats); });

    // request slide show
    $.ajax({
       url: "ajax/gallery_1.ajax",
       success: function (data) {
           W.w("using parse json, shou0ld be headered content type");
           data = $.parseJSON(data);

           var album = new W.slideshow.SlideAlbum();

           W.aloop(
                // Number of Interations
                data.album.length,

                // Interation
                function (index, loop) {
                   // W.l( data.album[index] );

                    album.addSlide( new W.slideshow.Slide( data.album[index] ) );

                    // next!
                    loop.next();
                },

                // Done
                function () {
                    slideshowController.addAlbum(album);
                }
          );
       }
    });
});
























