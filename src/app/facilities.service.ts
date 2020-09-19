import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const BASE_URL = 'https://services.arcgis.com/QVENGdaPbd4LUkLV/arcgis/rest/services/FWS_National_Visitor_Service_Amenities_View/FeatureServer/0/query';

interface AttributesIfc {
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

function setParams(orgID): { [param: string]: string } {
  return {
    'where=OrgCode': orgID,
    'outFields': 'Name,Public_Use,Han_Access',
    'outSR': '4326',
    'f': 'json'
  }
}

@Injectable({
  providedIn: 'root'
})

export class FacilitiesService {

  constructor(private http: HttpClient) { }

  getAmenities(orgID:number): Observable<AmenitiesIfc[]> {
    return this.http.get<any>(BASE_URL, { params: setParams(orgID) })
      .pipe(map((response) => response.features))
  }
}
