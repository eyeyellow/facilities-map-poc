import { Component } from '@angular/core';

import { tileLayer, latLng, Map, marker, Layer, featureGroup, icon, Marker } from 'leaflet';

import { AmenitiesIfc, AttributesIfc, FacilitiesService } from './facilities.service';

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

function popupContent(attributes: AttributesIfc): string {
  return `
    <h3>${attributes.Name}</h3>
    <hr />
    <p><strong>Access: </strong>${attributes.Public_Use}</p>
    <p><strong>Wheelchair Accessible: </strong>${attributes.Han_Access}</p>
  `;
}

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
  layers: Layer[] = [];
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
      amenities.forEach((amenity) => {
        // Filter out any amenity that doesn't have a name
        if (!amenity.attributes.Name.trim()) return;
        let markerLayer: Layer;
        markerLayer = marker(
          [amenity.geometry.y, amenity.geometry.x],
          { title: amenity.attributes.Name }
        )
        // Add popup with amenity info
        markerLayer.bindPopup(popupContent(amenity.attributes));
        this.layers.push(markerLayer);
      })
      // TODO - eventually add clusters to the map
      this._map.fitBounds(featureGroup(this.layers).getBounds().pad(.1));
    });
  }

  onMapReady(map: Map) {
    this._map = map;
  }
}
