import { Injectable } from '@angular/core';
import L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class GetmapService {
  map:any;

  constructor() { }

//   osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     maxZoom: 19,
//     attribution: false,
// });

getMap(){
     //leaflet map instance----->
     this.map = L.map('map', {
      crs: L.CRS.EPSG3857,
      minZoom: 2,
      maxZoom: 10,
      doubleClickZoom: false,
      layers: []
    });
    this.map.setView([20.5937, 78.9629], 3);

    var southWest =  L.latLng(-89.98155766646617, -180);
    var northEast = L.latLng(89.99346179538875, 180);

    var bounds = L.latLngBounds(southWest, northEast);
    this.map.setMaxBounds(bounds);


    return this.map;
}
}
