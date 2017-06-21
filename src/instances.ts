/**
 * Created by glenn on 6/19/17.
 */

import {axios_get, iError, defaultError} from './config';


export module instances {

    let instancesUrl = 'instances/';

    export interface iInstances {
        instances: string[];
    }

    export const list = (callback: (d: iInstances) => any,
                         error: (e: iError) => any = defaultError) => {
        axios_get(instancesUrl + 'list', callback, {}, error);
    };

    export interface iShowId {
        name: string;
        type: string;
        site_name: string;
        application_path: string;
        url: string;
        updated_at: string;
        countries: {[s: string]: string};
    }

    export const show = (instanceId: string,
                         callback: (d: iShowId) => any,
                         error: (e: iError) => any = defaultError) => {
        axios_get(instancesUrl + 'show', callback, {id: instanceId}, error);
    };

}

export default instances;

