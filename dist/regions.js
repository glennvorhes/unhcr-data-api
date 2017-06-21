"use strict";
/**
 * Created by glenn on 6/20/17.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
var regions;
(function (regions) {
    let regionsUrl = 'regions/';
    function fixSettlement(sr) {
        return {
            name: sr.name,
            updated_at: sr.updated_at,
            longitude: parseFloat(sr.longitude),
            latitude: parseFloat(sr.latitude)
        };
    }
    function fixRegion(rr) {
        let r = {
            name: rr.name,
            country: rr.country,
            settlements: []
        };
        for (let s of rr.settlements) {
            r.settlements.push(fixSettlement(s));
        }
        return r;
    }
    regions.show = (regionId, callback, error = config_1.defaultError) => {
        config_1.axios_get(regionsUrl + 'show', (d) => {
            let regionArr = [];
            for (let r of d) {
                regionArr.push(fixRegion(r));
            }
            return callback(regionArr);
        }, { id: regionId }, error);
    };
})(regions = exports.regions || (exports.regions = {}));
//# sourceMappingURL=regions.js.map