import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon'
import {MatListModule} from '@angular/material/list'
import {MatCheckboxModule} from '@angular/material/checkbox';

import {MatButtonModule} from '@angular/material/button';
import { MainComponent } from './main/main.component';
import { FormsModule } from '@angular/forms';
import { TemperatureComponent } from './temperature/temperature.component';
import { CloudComponent } from './cloud/cloud.component';
import { PressureComponent } from './pressure/pressure.component';
import { PrecipitationComponent } from './precipitation/precipitation.component';
import { HumidityComponent } from './humidity/humidity.component';
import { DaynightComponent } from './daynight/daynight.component';
import { HighchartsComponent } from './highcharts/highcharts.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    MainComponent,
    TemperatureComponent,
    CloudComponent,
    PressureComponent,
    PrecipitationComponent,
    HumidityComponent,
    DaynightComponent,
    HighchartsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatCheckboxModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
