"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by glenn on 6/19/17.
 */
const api_root = "http://data.unhcr.org/api";
const axios_1 = require("axios");
const util_1 = require("./util");
exports.defaultError = (e) => {
    let paramVals = [];
    for (let f of util_1.keyValPairs(e.params)) {
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
function getValue(obj, keyArr, defaultVal = null) {
    let k = keyArr.splice(0, 1)[0];
    if (keyArr.length == 0) {
        return typeof obj[k] === 'undefined' ? defaultVal : obj[k];
    }
    else {
        if (typeof obj[k] === 'undefined') {
            throw `key error: ${k} ${obj.toString()}`;
        }
        else {
            return getValue(obj[k], keyArr);
        }
    }
}
exports.axios_get = (endpoint, callback, params = {}, error) => {
    if (!endpoint[0].match(/^\//)) {
        endpoint = '/' + endpoint;
    }
    if (!endpoint[0].match(/.json$/)) {
        endpoint += '.json';
    }
    endpoint = api_root + endpoint;
    axios_1.default.get(endpoint, { params: params }).then((response) => {
        let data = getValue(response, ['data'], null);
        if (data != null) {
            callback(data);
        }
        else {
            throw 'unhandled error';
        }
    }).catch((reason) => {
        let returnObject = {
            status: -1,
            statusText: '',
            code: '',
            message: '',
            url: getValue(reason, ['config', 'url'], ''),
            params: getValue(reason, ['config', 'params'], {})
        };
        let response = getValue(reason, ['response'], null);
        if (response != null) {
            returnObject.status = getValue(response, ['status'], -1);
            returnObject.statusText = getValue(response, ['statusText'], '');
            returnObject.code = getValue(response, ['data', 'code'], '');
            returnObject.message = getValue(response, ['data', 'message'], '');
            error(returnObject);
        }
        else {
            returnObject.statusText = getValue(reason, ['code'], '');
            returnObject.code = returnObject.statusText;
            returnObject.message = returnObject.statusText;
            returnObject.status = returnObject.statusText == 'ENOTFOUND' ? 404 : returnObject.status;
            error(returnObject);
        }
    });
};
//# sourceMappingURL=config.js.map