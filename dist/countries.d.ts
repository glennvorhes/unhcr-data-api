/**
 * Created by glenn on 6/20/17.
 */
import { iError } from './config';
export declare module countries {
    interface iCountry {
        name_en?: string;
        country_code: string;
        region_code: string;
        region_code_en?: string;
    }
    interface iCountryRegion {
        region_code: string;
        region_code_en?: string;
        countries: Array<{
            name_en?: string;
            country_code: string;
        }>;
    }
    interface iRegionBase {
        name: string;
    }
    interface iRegion extends iRegionBase {
        longitude: number;
        latitude: number;
    }
    interface iCountryRegionInfoBase {
        name: string;
    }
    interface iCountryRegionInfo extends iCountryRegionInfoBase {
        regions: iRegion[];
    }
    const list: (callback: (d: iCountry[]) => any, error?: (e: iError) => any) => void;
    const regions: (callback: (d: iCountryRegion[]) => any, error?: (e: iError) => any) => void;
    const show: (countryId: string, callback: (d: iCountryRegionInfo[]) => any, error?: (e: iError) => any) => void;
}
