/*globals Reveal */
/*globals d3 */


(function(){

    "use strict";

    var functions;

    // These functions do something on a slide event based on slide-id
    functions = {
        'weight-pie': weightPie,
        'requests-transfer': requestsTransfer
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

    function fragment() {
        // console.log(event);
    }

    function requestsTransfer(container) {
        if (container.querySelector('svg')) {
            return;
        }

        var data, margin, width, height, chart;

        data = [{
            requests: 48,
            bytes: 419
        },{
            requests: 50,
            bytes: 433
        },{
            requests: 51,
            bytes: 461
        },{
            requests: 53,
            bytes: 483
        },{
            requests: 52,
            bytes: 503
        },{
            requests: 54,
            bytes: 598
        },{
            requests: 54,
            bytes: 606
        },{
            requests: 52,
            bytes: 672
        },{
            requests: 53,
            bytes: 701
        },{
            requests: 53,
            bytes: 748
        },{
            requests: 54,
            bytes: 793
        },{
            requests: 55,
            bytes: 826
        },{
            requests: 56,
            bytes: 891
        },{
            requests: 55,
            bytes: 930
        },{
            requests: 55,
            bytes: 987
        },{
            requests: 55,
            bytes: 1040
        },{
            requests: 55,
            bytes: 1104
        },{
            requests: 55,
            bytes: 1159
        },{
            requests: 56,
            bytes: 1194
        },{
            requests: 56,
            bytes: 1266
        }];

        var animDuration = 300;

        margin = {top: 20, right: 20, bottom: 20, left: 20};
        width = 960 - margin.left - margin.right;
        height = 540 - margin.top - margin.bottom;

        chart = d3.select(container)
          .append('svg')
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
              .append("g");
                // .attr("transform", "translate(" + ((width/2)+margin.left) + "," + ((height/2)+margin.top) + ")");

        d3.select(container).select('svg')
            .append('defs')
            .append('marker')
                .attr('id','strokeCapCircle')
                .attr('markerWidth', 4)
                .attr('markerHeight', 4)
                .attr('refX', 2)
                .attr('refY', 2)
                .append('circle')
                    .attr('cx', 2)
                    .attr('cy', 2)
                    .attr('r', 2);

        var bars = chart.append("g")
        	.attr("class", "bars-weight");
        var scale = chart.append("g")
        	.attr("class", "scale");
        var labels = chart.append('g')
            .attr('class', 'labels');

        var x = d3.scale.linear()
            .domain([0,data.length-1])
            .range([margin.left,width-margin.right]);

        var y = d3.scale.linear()
            .domain([0,d3.max(data, function(d){return d.bytes;})])
            .range([height-margin.bottom, margin.top]);

        var fill = d3.scale.linear()
            .domain([d3.min(data, function(d){return d.bytes;}), d3.max(data, function(d){return d.bytes;})])
            .range([d3.rgb(234, 244, 255),d3.rgb(51, 153, 255)]);

        // var axis = d3.svg.axis()
        //     .orient('left')
        //     .innerTickSize(10)
        //     .outerTickSize(1)
        //     .scale(y);
        //
        // scale
        //     .attr('transform','translate(100,0)')
        //     .call(axis);

        var bar = bars.selectAll('.bar')
            .data(data);

        var barWidth = (width-margin.left-margin.right)/data.length;

        bar.enter().append('rect')
            .attr('x', function(d,i){
                return x(i);
            })
            .attr('y', function(d) {
                return height-margin.bottom;
            })
            .attr('width', barWidth)
            .attr('height', 0)
            .attr('fill', function(d){
                return fill(d.bytes);
            });

        bar.transition().delay(function(d,i){return i*animDuration;}).duration(500)
            .attr('y', function(d) {
                return y(d.bytes);
            })
            .attr('height', function(d){
                return height-y(d.bytes)-margin.bottom;
            });

        var label = labels.selectAll('.label')
            .data(data);

        var labelEnter = label.enter().append('g')
            .attr('opacity', 0)
            .attr('class','label');

            // .attr('transform', function(d, i){
            //     var pos = [x(i), height-margin.bottom];
            //     return 'translate('+pos+')';
            // });

        labelEnter.append('text')
            // .attr('')
            .text(function(d, i){
                if (i === 0) {
                    return '2010';
                }
                if (i === data.length-1) {
                    return '2015';
                }
                return '';
            });

            labelEnter.append('text')
                .attr('text-anchor', function(d, i){
                    return (i === 0) ? 'start' : 'end';
                })
                .attr('dy', '0.35em')
                .attr('x', function(d, i){
                    if (i === 0) {
                        return x(i)+barWidth*2 + barWidth/2;
                    }
                    if (i === data.length-1) {
                        return x(i)-barWidth*8 - barWidth/2;
                    }
                    return 0;
                })
                .attr('y', height/6)
                .style('fill', '#BF0436')
                .text(function(d, i){
                    if (i !== 0 && i !== data.length-1) {
                        return '';
                    }
                    return d.bytes + 'kB';
                });

                labelEnter.append('text')
                    .style('font-size', '0.76em')
                    .attr('text-anchor', function(d, i){
                        return (i === 0) ? 'start' : 'end';
                    })
                    .attr('dy', '1.55em')
                    .attr('x', function(d, i){
                        if (i === 0) {
                            return x(i)+barWidth*2 + barWidth/2;
                        }
                        if (i === data.length-1) {
                            return x(i)-barWidth*8 - barWidth/2;
                        }
                        return 0;
                    })
                    .attr('y', height/6)
                    .text(function(d, i){
                        if (i === 0) {
                            return 'November 2010';
                        }

                        if (i === data.length-1) {
                            return 'March 2015';
                        }

                        return '';
                    });

        labelEnter.append('polyline')
            .attr({
                opacity: function(d,i) { return (i !== 0 && i !== data.length-1) ? 0 : 0.3},
                stroke: "black",
                "stroke-width": "2px",
                fill: "none",
                'marker-end': 'url(#strokeCapCircle)',
                'marker-start': 'url(#strokeCapCircle)'
            })
            .attr('points', function(d, i) {
                var points = [];

                points.push([x(i)+barWidth/2,y(d.bytes)+15]);

                if (i === 0) {
                    points.push([x(i)+barWidth/2,height/6]);
                    points.push([x(i)+barWidth*2,height/6]);
                }
                if (i === data.length-1) {
                    points.push([x(i)-barWidth*8,y(d.bytes)+15]);
                    points.push([x(i)-barWidth*8,height/6])
                }
                return points;
            });

        label.transition().delay(function(d,i){return (i+1)*animDuration}).duration(500)
            .attr('opacity', 1);

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

        d3.select(container).select('svg')
            .append('defs')
            .append('marker')
                .attr('id','strokeCapCircle')
                .attr('markerWidth', 4)
                .attr('markerHeight', 4)
                .attr('refX', 2)
                .attr('refY', 2)
                .append('circle')
                    .attr('cx', 2)
                    .attr('cy', 2)
                    .attr('r', 2);

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
            .startAngle(0.1*Math.PI)
            .endAngle(2.1*Math.PI)
            .value(function(d) { return d.value; });

        // Segments

        slice = chart.select('.slices').selectAll(".arc")
          .data(pie(data), key);

        slice.enter().append("path")
          .attr("class", "arc")
          .attr('stroke', '#BFB169')
          .attr('stroke-width', 2)
          .style("fill", function(d) { return color(d.data.name); })
          .transition().delay(function(d, i) { return i * 500; }).duration(500)
          .attrTween('d', function(d) {
               var i = d3.interpolate(d.startAngle, d.endAngle);
               return function(t) {
                   d.endAngle = i(t);
                 return arc(d);
             };
          });

          // Labels
          label = chart.select(".labels").selectAll("text")
		        .data(pie(data), key);

	var labelEnter = label.enter()
		.append("g")
        .style('font-size', function(d){
            return d.data.name === 'Images' ? '1em' : '0.6em';
        })
        .attr('opacity', 0);

	labelEnter.append('text')
        .attr("dy", ".35em")
		.text(function(d) {
			return d.data.name;
		});
    labelEnter.append('text')
        .attr('dy', '1.5em')
        .style('font-size', '0.9em')
        .style('fill', '#BF0436')
        .text(function(d) {
            return d.data.value + 'kB';
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

        label.transition().delay(function(d,i){return (i+1)*500;}).duration(500)
            .attr('opacity', 1);


        polyline = chart.select(".lines").selectAll("polyline")
    		.data(pie(data), key);

    	polyline.enter()
    		.append("polyline")
            .attr({
                opacity: 0,
            	stroke: "black",
            	"stroke-width": "2px",
            	fill: "none",
                'marker-end': 'url(#strokeCapCircle)',
                'marker-start': 'url(#strokeCapCircle)'
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

        polyline.transition().delay(function(d,i){return (i+1)*500;}).duration(500)
            .attr('opacity', 0.3);

    }



}());
