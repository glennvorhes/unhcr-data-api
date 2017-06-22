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

    export interface _iRegionBase {
        name: string;
    }

    interface _iRegionReturned extends _iRegionBase {
        longitude: string;
        latitude: string;
    }

    export interface _iRegion extends _iRegionBase {
        longitude: number;
        latitude: number;
    }

    export interface _iCountryRegionInfoBase {
        name: string;
    }

    interface _iCountryRegionInfoReturned extends _iCountryRegionInfoBase {
        regions: _iRegionReturned[]
    }

    export interface iCountryRegionInfo extends _iCountryRegionInfoBase {
        regions: _iRegion[]
    }

    function fixRegion(r: _iRegionReturned): _iRegion {
        return {
            name: r.name,
            longitude: parseFloat(r.longitude),
            latitude: parseFloat(r.latitude)
        }
    }

    function fixCountryRegionInfo(crr: _iCountryRegionInfoReturned): iCountryRegionInfo {
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
        axios_get(countriesUrl + 'show', (d: _iCountryRegionInfoReturned[]): any => {
            let arr: iCountryRegionInfo[] = [];

            for (let cr of d){
                arr.push(fixCountryRegionInfo(cr));
            }

            return callback(arr);

        }, {id: countryId}, error);
    };
}

export default countries;