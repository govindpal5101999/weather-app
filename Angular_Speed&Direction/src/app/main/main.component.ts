import { Component, OnInit } from '@angular/core';
import { PostService } from '../service/http.service';
import L from 'leaflet';
import 'leaflet-velocity';
import { GetmapService } from '../service/getmap.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private __PostService: PostService, private _map:GetmapService) { }

  canvas: HTMLElement;
  windy: any;
  map: any;
  mydate: any;
  mydatetime: any;
  arrayLists: any = [];
  currentTime: any;
  jsonData: any = false;
  deleteDatabydate: Date;


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
    this.currentTime = new Date();
    this.mydatetime = `${this.currentTime.getFullYear} - ${("0" + (this.currentTime.getMonth()) + 1).slice(-2)}-${("0" + this.currentTime.getDate()).slice(-2)}T${("0" + (this.currentTime.getHours())).slice(-2)}:${("0" + (this.currentTime.getMinutes)).slice(-2)}`
    this.getWindByDateTime();
  }


  changeDate() {
    if (this.windy) {
      this.windy.stop();
    }

    // this.getWindByDate();
  }


  getWindByDateTime() {
    this.__PostService.getDateTime(this.mydatetime).subscribe({
      next: (data) => {
        this.arrayLists = data;
        console.log("after subscribe :", data);
        if (!data) {
          alert("No Data Available");
          document.getElementById('windyMap').style.visibility = 'hidden';
        }
        else {

          var velocityLayer = L.velocityLayer({
            displayValues: true,
            displayOptions: {
              velocityType: "Wind",
              position: "bottomleft",
              emptyString: "No wind data",
              showCardinal: true,
            },
            data: this.arrayLists,
            maxVelocity: 15
          });

          velocityLayer.addTo(this.map);

          document.getElementById('windyMap').style.visibility = 'visible';
        }
      },
      error: (e) => alert('Incorrect Date Formate! Correct Formate is - YYYY-MM-DD')
    });

    // this.mydate = "";
  }

  changeDateTime() {
    if (this.windy) {
      this.windy.stop();
    }

    this.getWindByDateTime();
  }

  CurrentTime() {
    this.currentTime = new Date();
    this.mydatetime = `${this.currentTime.getFullYear} - ${("0" + (this.currentTime.getMonth()) + 1).slice(-2)}-${("0" + this.currentTime.getDate()).slice(-2)}T${("0" + (this.currentTime.getHours())).slice(-2)}:${("0" + (this.currentTime.getMinutes)).slice(-2)}`
  }


  //For Post Method---->
  selectFile(event) {
    //for selecting multiple files---->
    this.jsonData = event.target.files;
    document.getElementById('data').innerHTML = "";
    !this.jsonData
    if (this.jsonData) {
      for (let i = 0; i < this.jsonData.length; i++) {
        this.checktype(this.jsonData[i]);
      }
    }
  }

  checktype(file: File) {
    if (file.type === "application/json") {
      !this.jsonData;
    } else {
      this.jsonData = false;
      (document.getElementById('files') as HTMLInputElement).value = "";
      document.getElementById('data').innerHTML = "Please Select Json file only";
      document.getElementById('data').style.color = 'red';
    }
  }

  saveFile() {
    if (this.jsonData) {
      for (let i = 0; i < this.jsonData.length; i++) {
        this.upload(this.jsonData[i]);
      }
    }
    this.jsonData = false;
  }

  upload(file: File) {

    if (file) {
      this.__PostService.insertData(file).subscribe({
        next: (response) => {
          document.getElementById('data').innerHTML = "Data Saved Successfully";
          document.getElementById('data').style.color = "blue";
          console.log(response);
        },
        error: (e) => {
          document.getElementById('data').innerHTML = "Error In File";
          document.getElementById('data').style.color = "red";
          console.log(e);
        }


      });

    }
  }

  //For Delete All Data --->
  deleteAllData() {
    this.__PostService.deleteAll().subscribe({
      next: (response) => {
        alert('Deleted Successfully');
      },
      error: (e) => { alert('error in deleting') }
    })
  }
}
