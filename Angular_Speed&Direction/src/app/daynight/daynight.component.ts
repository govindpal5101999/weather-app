import { Component, OnInit } from '@angular/core';
import { GetmapService } from '../service/getmap.service';
import terminator from '@joergdietrich/leaflet.terminator';
import L from 'leaflet';

@Component({
  selector: 'app-daynight',
  templateUrl: './daynight.component.html',
  styleUrls: ['./daynight.component.scss']
})
export class DaynightComponent implements OnInit {

  constructor(private _map:GetmapService) { }

  map:any;

  osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: false,
    zIndex: 0
  });

  ngOnInit(): void {

    this.map =  this._map.getMap();
    this.map.addLayer(this.osm);
    terminator().addTo(this.map);

  }

}
