"use strict";
/**
 * Created by glenn on 6/20/17.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
var countries;
(function (countries) {
    let countriesUrl = 'countries/';
    function fixRegion(r) {
        return {
            name: r.name,
            longitude: parseFloat(r.longitude),
            latitude: parseFloat(r.latitude)
        };
    }
    function fixCountryRegionInfo(crr) {
        let cr = {
            name: crr.name,
            regions: []
        };
        for (let rr of crr.regions) {
            cr.regions.push(fixRegion(rr));
        }
        return cr;
    }
    countries.list = (callback, error = config_1.defaultError) => {
        config_1.axios_get(countriesUrl + 'list', callback, {}, error);
    };
    countries.regions = (callback, error = config_1.defaultError) => {
        config_1.axios_get(countriesUrl + 'regions', callback, {}, error);
    };
    countries.show = (countryId, callback, error = config_1.defaultError) => {
        config_1.axios_get(countriesUrl + 'show', (d) => {
            let arr = [];
            for (let cr of d) {
                arr.push(fixCountryRegionInfo(cr));
            }
            return callback(arr);
        }, { id: countryId }, error);
    };
})(countries = exports.countries || (exports.countries = {}));
//# sourceMappingURL=countries.js.map