import { Component, OnInit, ViewChild } from '@angular/core';
import { get as getProjection } from 'ol/proj';
import { PostService } from '../service/http.service';
import { Windy } from '../../assets/js/windyjs.js';
import resApi from '../../assets/js/resApi.json';
import L from 'leaflet';
import Map from 'ol/Map';
import 'leaflet-velocity';
import OSM from "ol/source/OSM";
import ol from '../../assets/js/ol.js';
import TileLayer from "ol/layer/Tile";
import TileWMS from 'ol/source/TileWMS';
import { WindLayer } from 'openlayers-wind';
import View from "ol/View";
import { GetmapService } from '../service/getmap.service';
// declare var Windy: any;
declare var $;
// yes for var ol: any;
// declare var ol: any;
@ViewChild('map1')

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor(private _map:GetmapService) { }

  map:any;

    osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: false,
});

googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
  maxZoom: 20,
  subdomains:['mt0','mt1','mt2','mt3'],
  attribution: false,
  zIndex: 0
});


  ngOnInit(): void {

    this.map = this._map.getMap();
    this.map.addLayer(this.googleSat);
    console.log(this.map)
    // map.on('drag', () =>{
    //   map.panInsideBounds(bounds, {animate: true})
    // })
    

    // get values from stations json format
    var velocityLayer = L.velocityLayer({
      displayValues: true,
      displayOptions: {
        velocityType: "Wind",
        position: "bottomleft",
        emptyString: "No wind data",
        showCardinal: true,
      },
      data: resApi,
      maxVelocity: 15
    });

    velocityLayer.addTo(this.map);


    //openlayer map instance----->
    // var map = new Map({
    //   layers: [  new TileLayer({
    //     source: new TileWMS({
    //       url: 'http://localhost:8080/geoserver/osm/wms',
    //       params: { 'LAYERS': 'osm:group1', 'TILED': true },
    //       serverType: 'geoserver',
    //     }),
    //   })
    // ],
    //   target: 'map',
    //   view: new View({
    //     center: [0, 0],
    //     zoom: 1,
    //     projection: 'EPSG:3857'
    //   }),
    // });

  }
}
