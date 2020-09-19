import { Component } from '@angular/core';

import { tileLayer, latLng, Map, marker, Layer, featureGroup, icon, Marker } from 'leaflet';

import { AmenitiesIfc, FacilitiesService } from './facilities.service';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});
Marker.prototype.options.icon = iconDefault;

const DEFAULT_ZOOM = 2;
const DEFAULT_CENTER = latLng(26.983785585, -121.018025935);

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <div leaflet style="height: 500px;" 
          [leafletOptions]="options"
          [leafletLayers]="layers"
          (leafletMapReady)="onMapReady($event)"
      >
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
  _map: Map;
  layers: Layer[];
  options = {
      layers: [
          tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              maxZoom: 18, attribution: 'Open Street Map'
          })
      ],
      zoom: DEFAULT_ZOOM,
      center: DEFAULT_CENTER
  }

  constructor (public facilities:FacilitiesService) { }

  ngOnInit() {
    this.facilities.getAmenities(31521).subscribe((amenities:AmenitiesIfc[]) => {
      // TODO - filter out the layer that has the coords of the reserve itself (or just no title)
      this.layers = amenities.map((amenity) => {
        return marker(
          [amenity.geometry.y, amenity.geometry.x],
          { title: amenity.attributes.Name }
        )
      })
      // TODO - eventually add clusters to the map
      this._map.fitBounds(featureGroup(this.layers).getBounds().pad(.1));
    });
  }

  onMapReady(map: Map) {
    this._map = map;
  }
}
