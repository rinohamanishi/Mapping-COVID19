mapboxgl.accessToken = 
            'pk.eyJ1IjoiamFrb2J6aGFvIiwiYSI6ImNpcms2YWsyMzAwMmtmbG5icTFxZ3ZkdncifQ.P9MBej1xacybKcDN_jehvw';

        const map = new mapboxgl.Map({
                container: 'map', // container ID
                style: 'mapbox://styles/mapbox/light-v10', // style URL
                zoom: 3.8, // starting zoom
                center: [-100, 40] // starting center
            }
        );

        async function geojsonFetch() { 
            let response = await fetch('assets/us-covid-2020-rates.json');
            let rateData = await response.json();
        
            map.addSource('rateData', {
                type: 'geojson',
                data: rateData
            });
        
            map.addLayer({
                'id': 'rateData-layer',
                'type': 'fill',
                'source': 'rateData',
                'paint': {
                    'fill-color': [
                        'step',
                        ['get', 'rates'],
                        '#f7fcfd',   // stop_output_0
                        20,          // stop_input_0
                        '#e0ecf4',   // stop_output_1
                        30,          // stop_input_1
                        '#bfd3e6',   // stop_output_2
                        40,          // stop_input_2
                        '#9ebcda',   // stop_output_3
                        50,          // stop_input_3
                        '#8c96c6',   // stop_output_4
                        60,          // stop_input_4
                        '#8c6bb1',   // stop_output_5
                        70,          // stop_input_5
                        '#88419d',   // stop_output_6
                        80,          // stop_input_6
                        "#810f7c",   // stop_output_7
                        90,          // stop_input_7
                        '#4d004b',   // stop_output_8
                                  // stop_input_8
                    ],
                    'fill-outline-color': '#BBBBBB',
                    'fill-opacity': 0.7,
                }
            }); 

            // information window
            map.on('mousemove', ({point}) => {
                const info = map.queryRenderedFeatures(point, {
                    layers: ['rateData-layer']
                });
                document.getElementById('text-description').innerHTML = info.length ?
                    `<h3>${info[0].properties.county}, ${info[0].properties.state}</h3>` +
                    `<p><strong><em>${info[0].properties.rates}</strong>%</em></p>` +
                    `<p>Cases: ${info[0].properties.cases}</p>` + 
                    `<p>Population: ${info[0].properties.pop18}</p>` :
                    `<p>Hover over a county!</p>`;
            });
        
            // legend
            const layers = [
                '0-20',
                '20-30',
                '30-40',
                '40-50',
                '50-60',
                '60-70',
                '70-80',
                '80-90',
                '90 and more'
            ];
            const colors = [
                '#f7fcfd70',
                '#e0ecf470',
                '#bfd3e670',
                '#9ebcda70',
                '#8c96c670',
                '#8c6bb170',
                '#88419d70',
                '#810f7c70',
                '#4d004b70'
            ];
        
            const legend = document.getElementById('legend');
            legend.innerHTML = "<b>COVID-19 rates<br>(cases per 1000 residents)</b><br><br>";

            const source = '<p style="font-size:8pt">Source: <a href="https://github.com/nytimes/covid-19-data.git">New York Times</a></p>';
            legend.innerHTML += source;
        
            layers.forEach((layer, i) => {
                const color = colors[i];
                const item = document.createElement('div');
                const key = document.createElement('span');
                key.className = 'legend-key';
                key.style.backgroundColor = color;
        
                const value = document.createElement('span');
                value.innerHTML = `${layer}`;
                item.appendChild(key);
                item.appendChild(value);
                legend.appendChild(item);
            });

        }
        
        geojsonFetch();

        