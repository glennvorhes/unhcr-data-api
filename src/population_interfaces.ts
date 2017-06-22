/**
 * Created by glenn on 6/21/17.
 */

interface iDemography {
    [s: string]: number;
    "04M": number,
    "04F": number,
    "511M": number,
    "511F": number,
    "1217M": number,
    "1217F": number,
    "1859M": number,
    "1859F": number,
    "60M": number,
    "60F": number
}

interface iDemographyReturned {
    [s: string]: string;
    "04M": string,
    "04F": string,
    "511M": string,
    "511F": string,
    "1217M": string,
    "1217F": string,
    "1859M": string,
    "1859F": string,
    "60M": string,
    "60F": string
}

class BasePopulation {
    module_name: Array<{ [s: string]: string }>;
    module_type: string;
    updated_at: string;
    demographyReturned: iDemographyReturned;
    demography: iDemography = null;




}


class Base {
    name: string;
    instance_id: string;
    url: string;


}

class ByRegion extends Base {

}

class ByCountry extends Base {


}


export module demography {
    export interface iDemography {
        [s: string]: number;
        "04M": number,
        "04F": number,
        "511M": number,
        "511F": number,
        "1217M": number,
        "1217F": number,
        "1859M": number,
        "1859F": number,
        "60M": number,
        "60F": number
    }

    export interface iDemographyReturned {
        [s: string]: string;
        "04M": string,
        "04F": string,
        "511M": string,
        "511F": string,
        "1217M": string,
        "1217F": string,
        "1859M": string,
        "1859F": string,
        "60M": string,
        "60F": string
    }
}

export module population {
    export interface _iPopulationBase {
        module_name: Array<{ [s: string]: string }>;
        updated_at: string;
        module_type: string;

    }

    export interface iPopulationReturned extends _iPopulationBase {
        value: string;
        demography?: demography.iDemographyReturned;
    }

    export interface iPopulation extends _iPopulationBase {
        value: number;
        demography?: demography.iDemography;
    }
}


export interface _iBase {
    name: string;
    instance_id: string;
}
//
// export module iBase {
//     export interface _iBaseBase {
//         name: string;
//         updated_at: string;
//         instance_id: string;
//     }
//
//     export interface iBaseReturned extends _iBaseBase {
//         population: population.iPopulationReturned[];
//     }
//
//     export interface iBase extends _iBaseBase {
//         population: population.iPopulation[];
//     }
// }

function fixPopulationBase(pop: population.iPopulationReturned): population.iPopulation {
    return {
        module_name: pop.module_name,
        value: parseInt(pop.value),
        updated_at: pop.updated_at,
        module_type: pop.module_type
    }
}

export module iByRegion {

    export interface _iPopulationBase extends population._iPopulationBase {

    }

    export interface iPopulationReturned extends population.iPopulationReturned, _iPopulationBase {
    }

    export interface iPopulation extends population.iPopulation, _iPopulationBase {
    }

    export interface iTop {
        updated_at: string;
        url: string;
    }

    export interface iByRegionReturned extends _iBase, iTop {
        population: iPopulationReturned[];
    }


    export interface iByRegion extends _iBase, iTop {
        population: iPopulation[];
    }

    export function fixPopulation()

    export function fixTop(pops: iByRegionReturned[]): iByRegion[] {
        let outArr: iByRegion[] = [];

        for (let p of pops) {

            let outPop: iByRegion = {
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

    fixPopulations
}

export module iByCountry {

    export interface _iPopulationBase extends population._iPopulationBase {
        url: string;
    }

    export interface iPopulationReturned extends population.iPopulationReturned, _iPopulationBase {
        households: string;
    }

    export interface iPopulation extends population.iPopulation, _iPopulationBase {
        households: number
    }

    export interface iTop {
        country_code: string;
    }

    export interface iByCountryReturned extends _iBase, iTop {
        population: iPopulationReturned[];
        latitude: string;
        longitude: string;
    }


    export interface iByCountry extends _iBase, iTop {
        population: iPopulation[];
        latitude: number;
        longitude: number;
    }

}



