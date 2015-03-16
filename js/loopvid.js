/*globals Reveal */

(function(){

    "use strict";

    // Attach listeners to slide events.
    Reveal.addEventListener('slidechanged', slide);

    // Handle a slide change event
    function slide(e){
        var indices, background, video;

        // Loop background vid
        indices = Reveal.getIndices(Reveal.getCurrentSlide());
        background = Reveal.getSlideBackground(indices.h, 0);
        video = background.querySelector('video');
        if (video) {
            video.loop = true;
        }

        // Also play slide vid
        var slideVid = e.currentSlide.querySelector('video');
        if (slideVid) {
            setTimeout(function(){
                slideVid.play();
            }, 500);
        }
    }


}());
