/*globals Reveal */

(function(){

    "use strict";

    // Attach listeners to slide events.
    Reveal.addEventListener('slidechanged', update);

    // Handle a slide change event
    function update(e,a){
        var section = e.currentSlide.dataset.section;
        document.getElementById('breadcrumbs').innerHTML = (section) ? '<span>'+section+'</span>' : '';
    }


}());
