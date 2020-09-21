import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AMENITIES_APP_CONFIG, AmenitiesAppConfig } from './AmenitiesAppConfig';

const BASE_URL = 'https://services.arcgis.com/QVENGdaPbd4LUkLV/arcgis/rest/services/FWS_National_Visitor_Service_Amenities_View/FeatureServer/0/query';

export interface AttributesIfc {
  Han_Access: string,
  Name: string,
  Public_Use: string
}

interface GeometryIfc {
  x: number,
  y: number
}

export interface AmenitiesIfc {
  attributes: AttributesIfc,
  geometry: GeometryIfc
}

function setParams(orgCode): { [param: string]: string } {
  return {
    'where=OrgCode': orgCode,
    'outFields': 'Name,Public_Use,Han_Access',
    'outSR': '4326',
    'f': 'json'
  }
}

@Injectable({
  providedIn: 'root'
})

export class FacilitiesService {
  readonly orgCode: string;

  constructor(
    private http: HttpClient,
    @Inject(AMENITIES_APP_CONFIG) public config: AmenitiesAppConfig
  ) {
    this.orgCode = config.org_code;
    console.log(this.orgCode);
  }

  getAmenities(): Observable<AmenitiesIfc[]> {
    return this.http.get<any>(BASE_URL, { params: setParams(this.orgCode) })
      .pipe(map((response) => response.features))
  }
}
