mapboxgl.accessToken =
            'pk.eyJ1IjoiamFrb2J6aGFvIiwiYSI6ImNpcms2YWsyMzAwMmtmbG5icTFxZ3ZkdncifQ.P9MBej1xacybKcDN_jehvw';
        let map = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/dark-v10',
            zoom: 1, // starting zoom
            minZoom: 3.8, // minimum zoom level of the map
            center: [-96.5795, 39.8283] // starting center
        });
        const grades = [500, 1500, 3000, 6000, 8000, 10000, 15000, 30000, 60000],
            colors = ['rgb(247,252,253)', 'rgb(224,236,244)', 'rgb(191,211,230)', 'rgb(158,188,218)', 'rgb(140,150,198)', 'rgb(140,107,177)', 'rgb(136,65,157)', 'rgb(129,15,124)', 'rgb(77,0,75)'],
            radii = [1, 4, 8, 10, 12, 15, 20, 25, 30];
        //load data to the map as new layers.
        //map.on('load', function loadingData() {
        map.on('load', () => { //simplifying the function statement: arrow with brackets to define a function

            // when loading a geojson, there are two steps
            // add a source of the data and then add the layer out of the source
            map.addSource('cases', {
                type: 'geojson',
                data: 'assets/us-covid-2020-counts.json'
            });
            map.addLayer({
                'id': 'counts-point',
                'type': 'circle',
                'source': 'cases',
                'paint': {
                    // increase the radii of the circle as count value increases
                    'circle-radius': {
                        'property': 'cases',
                        'stops': [
                            [grades[0], radii[0]],
                            [grades[1], radii[1]],
                            [grades[2], radii[2]],
                            [grades[3], radii[3]],
                            [grades[4], radii[4]],
                            [grades[5], radii[5]],
                            [grades[6], radii[6]],
                            [grades[7], radii[7]]
                        ]
                    },
                    // change the color of the circle as count value increases
                    'circle-color': {
                        'property': 'cases',
                        'stops': [
                            [grades[0], colors[0]],
                            [grades[1], colors[1]],
                            [grades[2], colors[2]],
                            [grades[3], colors[3]],
                            [grades[4], colors[4]],
                            [grades[5], colors[5]],
                            [grades[6], colors[6]],
                            [grades[7], colors[7]]
                        ]
                    },
                    'circle-stroke-color': 'white',
                    'circle-stroke-width': 1,
                    'circle-opacity': 0.6
                }
            });
            // click on tree to view counts in a popup
            map.on('click', 'counts-point', (event) => {
                new mapboxgl.Popup()
                    .setLngLat(event.features[0].geometry.coordinates)
                    .setHTML(`<strong>Cases:</strong> ${event.features[0].properties.cases}`)
                    .addTo(map);
            });
        });
        // create legend object, it will anchor to the div element with the id legend.
        const legend = document.getElementById('legend');

        //set up legend grades and labels
        var labels = ['<strong>Number of cases</strong>'], vbreak;
        //iterate through grades and create a scaled circle and label for each
        for (var i = 0; i < grades.length; i++) {
            vbreak = grades[i];
            
            let dot_radius = i == 0 ? 3 : 1.5 * radii[i]; // Set a larger radius for the first dot (less than 500 cases)
            
            labels.push(
                '<p class="break"><i class="dot" style="background:' + colors[i] + '; width: ' + dot_radius +
                'px; height: ' +
                dot_radius + 'px; "></i> <span class="dot-label" style="top: ' + dot_radius / 2 + 'px;">' + vbreak +
                '</span></p>');
        }

        const source =
            '<p style="text-align: right; font-size:8pt">Source: <a href="https://github.com/nytimes/covid-19-data.git">New York Times</a></p>';

        // combine all the html codes.
        legend.innerHTML = labels.join('') + source;