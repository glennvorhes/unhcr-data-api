/**
 * Created by glenn on 6/21/17.
 */

import {axios_get, iError, defaultError} from './config';
import {keyValPairs, keyVals} from './util';
import {iByRegion, iByCountry} from './population_interfaces';
import {fixPopulations} from './population_fixers';
export module population {

    let populationUrl = 'population/';






    export const regional = (callback: (d: iByRegion.iByRegion[]) => any,
                             options: { instanceId?: string, error?: (e: iError) => any } = {}) => {
        options.error = options.error || defaultError;

        let params: { [s: string]: string } = {};

        if (options.instanceId) {
            params['instance_id'] = options.instanceId
        }

        axios_get(populationUrl + 'regional', (d: iByRegion.iByRegionReturned[]) => {
            let outArr: iByRegion.iByRegion[] = [];

            for (let pr of d) {
                let newPr: iByRegion.iByRegion = {
                    name: pr.name,
                    updated_at: pr.updated_at,
                    instance_id: pr.instance_id,
                    url: pr.url,
                    population: fixPopulations(pr.population)
                };
                outArr.push(newPr);
            }

            callback(outArr);
        }, params, options.error);
    };

    /**
     *
     * @param callback
     * @param options
     */
    export const countries = (callback: (d: iByCountry.iByCountry[]) => any,
                              options: { instanceId?: string, countryCode?: string, error?: (e: iError) => any } = {}) => {
        options.error = options.error || defaultError;

        let params: { [s: string]: string } = {};

        if (options.instanceId) {
            params['instance_id'] = options.instanceId
        }

        if (options.countryCode) {
            params['country_code'] = options.countryCode
        }

        axios_get(populationUrl + 'countries', (d: iByCountry.iByCountryReturned[]) => {
            let outArr: iByCountry.iByCountry[] = [];

            for (let pr of d) {
                let newPr: iByCountry.iByCountry = {
                    name: pr.name,
                    updated_at: pr.updated_at,
                    instance_id: pr.instance_id,
                    population: fixPopulations(pr.population) ,
                    country_code: pr.country_code,
                    latitude: parseFloat(pr.latitude),
                    longitude: parseFloat(pr.longitude)
                };
                outArr.push(newPr);
            }

            callback(outArr);
        }, params, options.error);
    };

}
