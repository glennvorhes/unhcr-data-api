/**
 * Created by glenn on 6/20/17.
 */


import {axios_get, iError, defaultError} from './config';

export module regions {

    let regionsUrl = 'regions/';

    export interface iSettlementBase {
        name: string;
        updated_at: string;
    }

    interface iSettlementReturned extends iSettlementBase {
        latitude: string;
        longitude: string;
    }

    export interface iSettlement extends iSettlementBase {
        latitude: number;
        longitude: number;
    }

    export interface iRegionBase {
        name: string;
        country: string;
    }

    interface iRegionReturned extends iRegionBase{
        settlements: iSettlementReturned[];
    }

    export interface iRegion extends iRegionBase{
        settlements: iSettlement[];
    }

    function fixSettlement(sr: iSettlementReturned): iSettlement{
        return {
            name: sr.name,
            updated_at: sr.updated_at,
            longitude: parseFloat(sr.longitude),
            latitude: parseFloat(sr.latitude)
        }
    }

    function fixRegion(rr: iRegionReturned): iRegion{
        let r: iRegion = {
            name: rr.name,
            country: rr.country,
            settlements: []
        };

        for (let s of rr.settlements){
          r.settlements.push(fixSettlement(s));
        }

        return r;
    }

    export const show = (regionId: string,
                         callback: (d: iRegion[]) => any,
                         error: (e: iError) => any = defaultError) => {
        axios_get(regionsUrl + 'show', (d: iRegionReturned[]): any => {

            let regionArr: iRegion[] = [];

            for (let r of d){
                regionArr.push(fixRegion(r))
            }
            return callback(regionArr);

        }, {id: regionId}, error);
    };
}

export default regions;

