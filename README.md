# Mapping-COVID19

## Introduction
This project aims to create thematic maps using COVID-19 data from 2020. The data includes case and death counts, which have been processed to calculate case rates per thousand residents. The maps will visualize these rates and case counts at the county level in the United States.

## Map Overview
### Choropleth Map (COVID-19 Rates)
[link]([url](https://rinohamanishi.github.io/Mapping-COVID19/map1.html))
<img width="1410" alt="Screenshot 2024-02-27 at 23 24 43" src="https://github.com/rinohamanishi/Mapping-COVID19/assets/131402306/b2b8e4cd-56b7-4d3b-9328-6b5d3b4a1771">

### Proportional Symbols Map (COVID-19 Cases)
[link]([url](https://rinohamanishi.github.io/Mapping-COVID19/map2.html))
<img width="1417" alt="Screenshot 2024-02-27 at 23 28 11" src="https://github.com/rinohamanishi/Mapping-COVID19/assets/131402306/d0a042fa-4e5a-488f-a761-07928f7e7e48">

## Primary Functions
### Choropleth Map:
Visualizes COVID-19 rates using a color gradient based on case rates per thousand residents. The higher the case rates are, the darker the color is, and it is categorized by a range of percentages. When you hover over the county, the information window will show its county name, state, rate percentage, number of cases, and population. The legend key on the left shows the key for the colors. Allows for easy zoom in and out. I set the opacity to be slightly transparent to allow the underlying map features to show through.  
### Proportional Symbols Map: 
Represents COVID-19 cases using proportional symbols, where larger circles indicate higher case counts. When you click on a circle, it will show the county's number of cases. The legend key on the right outlines what the sizes of these circles indicate about their number of cases. The circle sizes are determined based on logarithmic scaling of the case counts. The circles resize as the map gets zoomed in and out. 

## Libraries in Use
Mapbox GL JS: Used for the base maps.

## Data Sources
COVID-19 Case/Death Data: The New York Times
Population Data: 2018 ACS 5-year estimates
U.S. County Boundary Shapefile: U.S. Census Bureau

## Credits and Acknowledgments
To Bo Zhao and Liz Peng for the lab tutorial and help in GEOG 458. 
