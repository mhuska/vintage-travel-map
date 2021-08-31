import { AfterViewInit, Component, OnInit } from '@angular/core';
import GeoJSONLayer from '@arcgis/core/layers/GeoJSONLayer';
import TileLayer from '@arcgis/core/layers/TileLayer';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import Basemap from '@arcgis/core/Basemap';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.LoadMap();
  }

  LoadMap() {
   
         //Basmap
         let basemap = new Basemap({
          baseLayers: [
            new TileLayer({
              url: "https://tiles.arcgis.com/tiles/nGt4QxSblgDfeJn9/arcgis/rest/services/VintageShadedRelief/MapServer",
              title: "Basemap"
            })
          ],
          title: "basemap",
          id: "basemap"
        });
        
        //Popup
        const template = {
          title: "{Title}",
          content: "<img src='{Image}' width='200px'><a href='{ArticleURL}' target='_blank'>read more...</a>",
        };
        
        //Point Renderer
        const renderer = {
          type: "simple",
          field: "Marker",
          symbol: {
              type: "simple-marker",
              style: "x",
              color: "red",
              outline: { width: 6, color: [155, 6, 6, 1] }
          }
        };
        
        //Point Layer
        const pointLayer = new GeoJSONLayer({
            url: "https://slowcamino.com/custom/pins.php",
            copyright: "Slow Camino",
            popupTemplate: template,
            renderer: <any>renderer
        });
        
                   
        //Map       
        const map = new Map({
          basemap: basemap,
          layers: [pointLayer]
        });

        //View
        const view = new MapView({
          map: map,
          center: [0, 15], // Longitude, latitude
          zoom: 2, // Zoom level
          container: "map-container",
          popup: {
            dockEnabled: true,
            dockOptions: {
              buttonEnabled: false,
              breakpoint: false,
              position: "bottom-left"
            }
          }
        });


        
  }

}
