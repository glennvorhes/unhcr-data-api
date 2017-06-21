/**
 * Created by glenn on 6/20/17.
 */


import {axios_get, iError, defaultError} from './config';

export module countries {

    let countriesUrl = 'countries/';

    export interface iCountry {
        name_en?: string;
        country_code: string;
        region_code: string;
        region_code_en?: string;
    }

    export interface iCountryRegion {
        region_code: string;
        region_code_en?: string;
        countries: Array<{name_en?: string, country_code: string}>
    }

    export interface iRegionBase {
        name: string;
    }

    interface iRegionReturned extends iRegionBase {
        longitude: string;
        latitude: string;
    }

    export interface iRegion extends iRegionBase {
        longitude: number;
        latitude: number;
    }

    export interface iCountryRegionInfoBase {
        name: string;
    }

    interface iCountryRegionInfoReturned extends iCountryRegionInfoBase {
        regions: iRegionReturned[]
    }

    export interface iCountryRegionInfo extends iCountryRegionInfoBase {
        regions: iRegion[]
    }

    function fixRegion(r: iRegionReturned): iRegion {
        return {
            name: r.name,
            longitude: parseFloat(r.longitude),
            latitude: parseFloat(r.latitude)
        }
    }

    function fixCountryRegionInfo(crr: iCountryRegionInfoReturned): iCountryRegionInfo {
        let cr: iCountryRegionInfo = {
            name: crr.name,
            regions: []
        };

        for (let rr of crr.regions){
            cr.regions.push(fixRegion(rr))
        }

        return cr;
    }


    export const list = (callback: (d: iCountry[]) => any,
                         error: (e: iError) => any = defaultError) => {
        axios_get(countriesUrl + 'list', callback, {}, error);
    };

    export const regions = (callback: (d: iCountryRegion[]) => any,
                            error: (e: iError) => any = defaultError) => {
        axios_get(countriesUrl + 'regions', callback, {}, error);
    };

    export const show = (countryId: string,
                         callback: (d: iCountryRegionInfo[]) => any,
                         error: (e: iError) => any = defaultError) => {
        axios_get(countriesUrl + 'show', (d: iCountryRegionInfoReturned[]): any => {
            let arr: iCountryRegionInfo[] = [];

            for (let cr of d){
                arr.push(fixCountryRegionInfo(cr));
            }

            return callback(arr);

        }, {id: countryId}, error);
    };
}

export default countries;