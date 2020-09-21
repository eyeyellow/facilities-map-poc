import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { AmenitiesAppConfig, AMENITIES_APP_CONFIG } from './AmenitiesAppConfig';
import { AppComponent } from './app.component';

function amenitiesAppConfigFactory(): AmenitiesAppConfig {
  return window['fws_amenities_app_config'];
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    LeafletModule
  ],
  providers: [
    { 
      provide: AMENITIES_APP_CONFIG,
      useFactory: amenitiesAppConfigFactory
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
