/**
 * Created by glenn on 6/20/17.
 */


import {axios_get, iError, defaultError} from './config';

export module regions {

    let regionsUrl = 'regions/';

    export interface _iSettlementBase {
        name: string;
        updated_at: string;
    }

    interface _iSettlementReturned extends _iSettlementBase {
        latitude: string;
        longitude: string;
    }

    export interface _iSettlement extends _iSettlementBase {
        latitude: number;
        longitude: number;
    }

    export interface _iRegionBase {
        name: string;
        country: string;
    }

    interface _iRegionReturned extends _iRegionBase{
        settlements: _iSettlementReturned[];
    }

    export interface iRegion extends _iRegionBase{
        settlements: _iSettlement[];
    }

    function fixSettlement(sr: _iSettlementReturned): _iSettlement{
        return {
            name: sr.name,
            updated_at: sr.updated_at,
            longitude: parseFloat(sr.longitude),
            latitude: parseFloat(sr.latitude)
        }
    }

    function fixRegion(rr: _iRegionReturned): iRegion{
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
        axios_get(regionsUrl + 'show', (d: _iRegionReturned[]): any => {

            let regionArr: iRegion[] = [];

            for (let r of d){
                regionArr.push(fixRegion(r))
            }
            return callback(regionArr);

        }, {id: regionId}, error);
    };
}

export default regions;

