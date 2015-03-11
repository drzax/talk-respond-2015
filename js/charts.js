/*globals Reveal */
/*globals console */

(function(){

    "use strict";

    var functions;

    // These functions do something on a slide event based on slide-id
    functions = {
        'weight-pie': weightPie
    };

    // Attach listeners to slide events.
    Reveal.addEventListener('slidechanged', slide);
    Reveal.addEventListener('fragmentshown', fragment);
    Reveal.addEventListener('fragmenthidden', fragment);

    // Handle a slide change event
    function slide(){

        var slideId;

        slideId = Reveal.getCurrentSlide().id;

        console.log(Reveal.getCurrentSlide());

        // Don't do anything if there's no slide id.
        if (functions[slideId]) {
            functions[slideId]();
        }

    }

    function fragment(event) {
        console.log(event);
    }

    // Initialise the page weight pie chart
    function weightPie() {

    }



}());
