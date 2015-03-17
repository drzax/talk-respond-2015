/*globals Reveal */
/*globals document */
/*globals d3 */


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

        var currentSlide;

        currentSlide = Reveal.getCurrentSlide();

        // Don't do anything if there's no slide id.
        if (functions[currentSlide.id]) {
            functions[currentSlide.id](currentSlide);
        }

    }

    function fragment(event) {
        // console.log(event);
    }

    // Initialise the page weight pie chart
    function weightPie(container) {

        if (container.querySelector('svg')) {
            return;
        }

        var data, margin, width, height, chart, radius, color, arc, outerArc, pie, label, slice, polyline, key;

        data = [{
            name: "Other",
            value: 142
        },{
            name: "HTML",
            value: 60
        },{
            name: "CSS",
            value: 63
        },{
            name: "Flash",
            value: 82
        },{
            name: "JS",
            value: 307
        },{
            name: "Images",
            value: 1266
        }];

        margin = {top: 0, right: 0, bottom: 0, left: 0};
        width = 960 - margin.left - margin.right;
        height = 540 - margin.top - margin.bottom;

        chart = d3.select(container)
          .append('svg')
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
              .append("g")
                .attr("transform", "translate(" + ((width/2)+margin.left) + "," + ((height/2)+margin.top) + ")");

        chart.append("g")
        	.attr("class", "slices");
        chart.append("g")
        	.attr("class", "labels");
        chart.append("g")
        	.attr("class", "lines");

        key = function(d) {
            return d.data.name;
        };

        radius = Math.min(width, height) / 2;

        color = d3.scale.ordinal()
        .range(["#3399ff","#5badff","#70b7ff","#99ccff","#c1e0ff","#eaf4ff"].reverse());

        arc = d3.svg.arc()
            .outerRadius(radius * 0.9)
            .innerRadius(radius * 0.6);

        outerArc = d3.svg.arc()
        	.innerRadius(radius * 0.95)
        	.outerRadius(radius * 1);

        pie = d3.layout.pie()
            .sort(null)
            // .startAngle(1.1*Math.PI)
            // .endAngle(3.1*Math.PI)
            .value(function(d) { return d.value; });

        // Segments

        slice = chart.select('.slices').selectAll(".arc")
          .data(pie(data), key);

        slice.enter().append("path")
          .attr("class", "arc")
          .style("fill", function(d) { return color(d.data.name); })
          .transition().delay(function(d, i) { return i * 500; }).duration(500)
          .attrTween('d', function(d) {
               var i = d3.interpolate(d.startAngle, d.endAngle);
               return function(t) {
                   d.endAngle = i(t);
                 return arc(d);
               }
          });

          // Labels
          label = chart.select(".labels").selectAll("text")
		        .data(pie(data), key);

	label.enter()
		.append("text")
		.attr("dy", ".35em")
		.text(function(d) {
			return d.data.name;
		});

	function midAngle(d){
		return d.startAngle + (d.endAngle - d.startAngle)/2;
	}

	label.transition().duration(1000)
		.attrTween("transform", function(d) {
			this._current = this._current || d;
			var interpolate = d3.interpolate(this._current, d);
			this._current = interpolate(0);
			return function(t) {
				var d2 = interpolate(t);
				var pos = outerArc.centroid(d2);
				pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
				return "translate("+ pos +")";
			};
		})
		.styleTween("text-anchor", function(d){
			this._current = this._current || d;
			var interpolate = d3.interpolate(this._current, d);
			this._current = interpolate(0);
			return function(t) {
				var d2 = interpolate(t);
				return midAngle(d2) < Math.PI ? "start":"end";
			};
		});


        var polyline = chart.select(".lines").selectAll("polyline")
    		.data(pie(data), key);

    	polyline.enter()
    		.append("polyline")
            .attr({
                opacity: ".3",
            	stroke: "black",
            	"stroke-width": "2px",
            	fill: "none"
            });

    	polyline.transition().duration(1000)
    		.attrTween("points", function(d){
    			this._current = this._current || d;
    			var interpolate = d3.interpolate(this._current, d);
    			this._current = interpolate(0);
    			return function(t) {
    				var d2 = interpolate(t);
    				var pos = outerArc.centroid(d2);
    				pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
    				return [arc.centroid(d2), outerArc.centroid(d2), pos];
    			};
    		});

    }



}());
