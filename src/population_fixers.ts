/**
 * Created by glenn on 6/21/17.
 */
import {iPopulationModule as iPop} from './population_interfaces';
import {keyValPairs} from './util';

function fixDemography(dem: iPop.iDemographyReturned): iPop.iDemography {

    let outDem: iPop.iDemography = {
        "04M": NaN,
        "04F": NaN,
        "511M": NaN,
        "511F": NaN,
        "1217M": NaN,
        "1217F": NaN,
        "1859M": NaN,
        "1859F": NaN,
        "60M": NaN,
        "60F": NaN
    };

    for (let k of keyValPairs(dem as iPop.iDemographyReturned)) {
        outDem[k.key] = parseInt(k.value);
    }

    return outDem;
}


export function fixPopulations(pops: iPop.iPopulationReturned[]): iPop.iPopulation[] {
    let outArr: iPop.iPopulation[] = [];

    for (let p of pops) {

        let outPop: iPop.iPopulation = {
            module_name: p.module_name,
            value: parseFloat(p.value),
            updated_at: p.updated_at
            // module_type: p.module_type
        };

        if (p.demography) {
            outPop.demography = fixDemography(p.demography);
        }

        outArr.push(outPop);
    }

    return outArr;
}