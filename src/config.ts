/**
 * Created by glenn on 6/19/17.
 */
const api_root = "http://data.unhcr.org/api";
import axios from 'axios';
import {keyValPairs} from './util';


export interface iError {
    code: string;
    message: string;
    status: number;
    statusText: string;
    params: { [s: string]: any };
    url: string;
}

export const defaultError = (e: iError) => {
    let paramVals = [];

    for (let f of keyValPairs(e.params)) {
        paramVals.push([f.key, f.value]);
    }

    let paramString = '';

    if (paramVals.length > 0) {

        for (let i = 0; i < paramVals.length; i++) {
            paramString += i == 0 ? '?' : '&';
            paramString += `${paramVals[i][0]}=${paramVals[i][1]}`;
        }
    }

    console.warn(`error retrieving ${e.url}${paramString}  -  status ${e.status}`);
};


/**
 *
 * @param obj
 * @param keyArr
 * @param defaultVal
 * @returns {any}
 */
function getValue(obj: { [s: string]: any }, keyArr: string[], defaultVal: any = null): any {
    let k = keyArr.splice(0, 1)[0];

    if (keyArr.length == 0) {
        return typeof obj[k] === 'undefined' ? defaultVal : obj[k];
    } else {
        if (typeof  obj[k] === 'undefined') {
            throw `key error: ${k} ${obj.toString()}`;
        } else {
            return getValue(obj[k], keyArr);
        }
    }
}


export const axios_get = (endpoint: string,
                          callback: (d: Object) => any,
                          params: Object = {},
                          error: (d: iError) => any): any => {
    if (!endpoint[0].match(/^\//)) {
        endpoint = '/' + endpoint;
    }

    if (!endpoint[0].match(/.json$/)) {
        endpoint += '.json';
    }

    endpoint = api_root + endpoint;

    axios.get(endpoint, {params: params}).then((response: any) => {
        let data = getValue(response, ['data'], null);
        if (data != null) {
            if (data['code']) {
                let returnObject: iError = {
                    status: data['code'] == 'InvalidContent' ? 400 : -1,
                    statusText: '',
                    code: data['code'],
                    message: data['message'] || '',
                    url: endpoint,
                    params: params
                };

                error(returnObject)
            }
            else {
                callback(data);
            }
        } else {
            throw 'unhandled error';
        }
    }).catch((reason: any) => {

        let returnObject: iError = {
            status: -1,
            statusText: '',
            code: '',
            message: '',
            url: endpoint,
            params: params
        };

        let response = getValue(reason, ['response'], null);

        if (response != null) {

            returnObject.status = getValue(response, ['status'], -1);
            returnObject.statusText = getValue(response, ['statusText'], '');
            returnObject.code = getValue(response, ['data', 'code'], '');
            returnObject.message = getValue(response, ['data', 'message'], '');

            error(returnObject);
        } else {
            returnObject.statusText = getValue(reason, ['code'], '');
            returnObject.code = returnObject.statusText;
            returnObject.message = returnObject.statusText;
            returnObject.status = returnObject.statusText == 'ENOTFOUND' ? 404 : returnObject.status;

            error(returnObject);
        }
    });
};

