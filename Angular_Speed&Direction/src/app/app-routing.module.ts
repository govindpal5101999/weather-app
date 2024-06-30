import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CloudComponent } from './cloud/cloud.component';
import { DaynightComponent } from './daynight/daynight.component';
import { HumidityComponent } from './humidity/humidity.component';
import { MainComponent } from './main/main.component';
import { MapComponent } from './map/map.component';
import { PrecipitationComponent } from './precipitation/precipitation.component';
import { PressureComponent } from './pressure/pressure.component';
import { TemperatureComponent } from './temperature/temperature.component';
import { HighchartsComponent } from './highcharts/highcharts.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: "/map",
    pathMatch: "full"
  },
  {
    path: "map",
    component: MapComponent
  },
  {
    path: 'main',
    component: MainComponent
  },
  {
    path: 'cloud',
    component: CloudComponent
  },
  {
    path: 'pressure',
    component: PressureComponent
  },
  {
    path: 'precipitation',
    component: PrecipitationComponent
  },
  {
    path: 'temp',
    component: TemperatureComponent
  },
  {
    path: 'humi',
    component: HumidityComponent
  },
  {
    path: 'daynight',
    component: DaynightComponent
  },
  {
    path: 'highcharts',
    component: HighchartsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
