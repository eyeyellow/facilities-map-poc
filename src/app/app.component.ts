import { Component } from '@angular/core';

import { tileLayer, latLng } from 'leaflet';

const DEFAULT_ZOOM = 2;
const DEFAULT_CENTER = latLng(26.983785585, -121.018025935);

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <div style="height: 500px;"
          leaflet 
          [leafletOptions]="options">
      </div>
    <div>
  `,
  styles: [
    `
      .container {
        width: 800px;
      }
    `
  ]
})

export class AppComponent {
  title = 'facilities-map-poc';
  options = {
      layers: [
          tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              maxZoom: 18, attribution: 'Open Street Map'
          })
      ],
      zoom: DEFAULT_ZOOM,
      center: DEFAULT_CENTER
  }
}
