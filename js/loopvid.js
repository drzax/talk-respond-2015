/*globals Reveal */

(function(){

    "use strict";

    // Attach listeners to slide events.
    Reveal.addEventListener('slidechanged', slide);

    // Handle a slide change event
    function slide(){
        var indices, background, video;
        indices = Reveal.getIndices(Reveal.getCurrentSlide());
        background = Reveal.getSlideBackground(indices.h, 0);
        video = background.querySelector('video');
        if (video) {
            video.loop = true;
        }
    }


}());
