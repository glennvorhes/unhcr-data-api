"use strict";
/**
 * Created by glenn on 6/20/17.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * iterate over the key value pairs of an object
 * @example for (let x:KeyValuePair of keyValPairs(object)){..}
 * @param {object} obj - the input object
 * @returns {Array<keyVals>} - array of key value pairs
 */
function keyValPairs(obj) {
    let outArray = [];
    for (let key of Object.keys(obj)) {
        outArray.push({ 'key': key, 'value': obj[key] });
    }
    outArray.sort(function (a, b) {
        "use strict";
        return a > b ? 1 : -1;
    });
    return outArray;
}
exports.keyValPairs = keyValPairs;
//# sourceMappingURL=util.js.map