/*globals Reveal */
/*globals document */

(function(){

    "use strict";

    // Attach listeners to slide events.
    Reveal.addEventListener('slidechanged', update);

    // Handle a slide change event
    function update(e){
        var section = e.currentSlide.dataset.section;
        document.getElementById('breadcrumbs').innerHTML = (section) ? '<span>'+section+'</span>' : '';
    }


}());
