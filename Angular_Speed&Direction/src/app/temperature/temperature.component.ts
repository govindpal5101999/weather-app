import { Component, OnInit } from '@angular/core';
import L from 'leaflet';
import { GetmapService } from '../service/getmap.service';
import $ from 'jquery';
import WMSCapabilities from 'ol/format/WMSCapabilities';

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.scss']
})
export class TemperatureComponent implements OnInit {

  constructor(private _map: GetmapService) { }

  map: any;
  cusStartD;
  cusEndD;
  cusStartT;
  cusEndT;

  osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: false,
    zIndex: 0
  });

  wmsTemp = L.tileLayer.wms('http://localhost:8080/ncWMS2/wms', {
    layers: '2/t2m',
    transparent: false,
    format: 'image/png',
    opacity: 0.7,
    styles: 'default-scalar',
    version: '1.1.1'
  })

  ngOnInit(): void {

    this.map = this._map.getMap();
    this.map.addLayer(this.wmsTemp)
    this.map.addLayer(this.osm);

    this.map.on('click', this.GetFeatureInfoWMS, this.wmsTemp);
    this.map.on('dblclick', (e) => {
      document.getElementById('dialoge').style.display = 'block';
    })
  }


  GetFeatureInfoWMS(this: any, e) {
    var me = this,
      map = me._map,
      loc = e.latlng,
      xy = e.containerPoint, // xy = map.latLngToContainerPoint(loc,map.getZoom())
      size = map.getSize(),
      bounds = map.getBounds(),
      url = me._url,
      crs = me.options.crs || map.options.crs, // me._crs
      sw = crs.project(bounds.getSouthWest()),
      ne = crs.project(bounds.getNorthEast()),
      params = me.wmsParams,
      obj = {
        service: "WMS", // WMS (default)
        version: params.version,
        request: "GetFeatureInfo",
        layers: params.layers,
        styles: params.styles,
        srs: crs.code,
        // bbox: bounds.toBBoxString(), // works only with EPSG4326, but not with EPSG3857
        bbox: sw.x + "," + sw.y + "," + ne.x + "," + ne.y, // works with both EPSG4326, EPSG3857
        width: size.x,
        height: size.y,
        query_layers: params.layers,
        info_format: "text/plain", // text/plain (default), application/json for JSON (CORS enabled servers), text/javascript for JSONP (JSONP enabled servers)
        feature_count: 5, // 1 (default)
      };
    obj[params.version === '1.3.0' ? 'i' : 'x'] = Math.round(xy.x);
    obj[params.version === '1.3.0' ? 'j' : 'y'] = Math.round(xy.y);
    $.ajax({
      url: url + L.Util.getParamString(obj, url, true),

      success: function (data) {
        document.getElementById('Info').innerHTML = data;
      }
    })

    console.log('bounding box --> ' + obj.bbox)


    fetch('http://localhost:8080/ncWMS2/wms?SERVICE=WMS&REQUEST=GetCapabilities&VERSION=1.3.0').then(res => res.text()).then((res) => {

      const parser = new WMSCapabilities().read(res);

      var layer = parser.Capability.Layer.Layer[0]
      var timeSeries = layer.Layer[0].Dimension[0].values;

      var startD = timeSeries.slice(0, 10);
      var endD = timeSeries.slice(25, 35);
      var startT = timeSeries.slice(11, 19);
      var endT = timeSeries.slice(36, 44);

      console.log(startD);
      console.log(endD)

      document.getElementById('startD').addEventListener('change', (e) => {
        this.cusStartD = (document.getElementById('startD') as HTMLInputElement).value;
      });

      document.getElementById('endD').addEventListener('change', (e) => {
        this.cusEndD = (document.getElementById('endD') as HTMLInputElement).value;
      })

      document.getElementById('startTime').addEventListener('change', (e) => {
        this.cusStartT = (document.getElementById('startTime') as HTMLInputElement).value;
      });

      document.getElementById('endTime').addEventListener('change', (e) => {
        this.cusEndT = (document.getElementById('endTime') as HTMLInputElement).value;
      })
      document.getElementById('getGraph').addEventListener('click', () => {

        if (startD == this.cusStartD && endD == this.cusEndD && startT < this.cusStartT && endT >= this.cusEndT) {
          // var Graph = `http://localhost:8080/ncWMS2/wms?REQUEST=GetTimeseries&LAYERS=2/t2m&QUERY_LAYERS=2/t2m&BBOX=-${obj.bbox}&SRS=CRS:84&FEATURE_COUNT=5&HEIGHT=${obj.height}&WIDTH=${obj.width}&X=${Math.round(xy.x)}&Y=${Math.round(xy.y)}&STYLES=default/default&VERSION=1.1.1&TIME=${this.cusStartD}T${this.cusStartT}.000Z/${this.cusEndD}T${this.cusEndT}.000Z&INFO_FORMAT=image/png`;

          var Graph = 'http://localhost:8080/ncWMS2/wms?REQUEST=GetTimeseries&LAYERS=2/t2m&QUERY_LAYERS=2/t2m&BBOX=-180,-144,180,144&SRS=CRS:84&FEATURE_COUNT=5&HEIGHT=600&WIDTH=750&X=465&Y=177&STYLES=default/default&VERSION=1.1.1&TIME=2023-02-17T00:00:00.000Z/2023-02-18T07:00:00.000Z&INFO_FORMAT=image/png';

          window.open(Graph, 'blank');

          document.getElementById('dialoge').style.display = 'none';
          document.getElementById('error').innerHTML = '';
        } else {
          document.getElementById('error').innerHTML = 'No Data Available';
          document.getElementById('error').style.color = 'red';
        }

      })


    });

    document.getElementById('dialoge').style.display = 'none';
  }

}
