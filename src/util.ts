/**
 * Created by glenn on 6/20/17.
 */

export interface keyVals {
    key: string;
    value: any
}

/**
 * iterate over the key value pairs of an object
 * @example for (let x:KeyValuePair of keyValPairs(object)){..}
 * @param {object} obj - the input object
 * @returns {Array<keyVals>} - array of key value pairs
 */
export function keyValPairs(obj: {[s: string]: any}): Array<keyVals> {
    let outArray: Array<keyVals> = [];
    for (let key of Object.keys(obj)) {
        outArray.push({key: key, value: obj[key]});
    }

    outArray.sort(function (a:keyVals, b:keyVals) {
        return a.key > b.key ? 1 : -1;
    });

    return outArray;
}
