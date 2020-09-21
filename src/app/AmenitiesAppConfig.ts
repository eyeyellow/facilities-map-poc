import { InjectionToken } from '@angular/core';

export interface AmenitiesAppConfig {
    org_code: string
}

export const AMENITIES_APP_CONFIG = new InjectionToken<AmenitiesAppConfig>('AmenitiesAppConfig');
