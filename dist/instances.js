"use strict";
/**
 * Created by glenn on 6/19/17.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
var instances;
(function (instances) {
    let instancesUrl = 'instances/';
    instances.list = (callback, error = config_1.defaultError) => {
        config_1.axios_get(instancesUrl + 'list', callback, {}, error);
    };
    instances.show = (instanceId, callback, error = config_1.defaultError) => {
        config_1.axios_get(instancesUrl + 'show', callback, { id: instanceId }, error);
    };
})(instances = exports.instances || (exports.instances = {}));
//# sourceMappingURL=instances.js.map