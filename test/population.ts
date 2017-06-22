/**
 * Created by glenn on 6/21/17.
 */

import {population} from '../src/population';
import {iByRegion, iByCountry} from '../src/population_interfaces'
import {iError} from '../src/config';


describe("Population API", function () {
    let regionPopulationsCar: iByRegion.iByRegion[] = [];
    let regionPopulationsAll: iByRegion.iByRegion[] = [];
    let countryPopulationAll: iByCountry.iByCountry[] = [];
    let countryPopulationInstance: iByCountry.iByCountry[] = [];
    let countryPopulationInstanceCountry: iByCountry.iByCountry[] = [];

    beforeAll(function (done) {
        population.regional((d) => {
            regionPopulationsCar = d;
            done();
        }, {instanceId: 'car'});
    });

    beforeAll(function (done) {
        population.regional((d) => {
            regionPopulationsAll = d;
            done();
        });
    });

    beforeAll(function (done) {
        population.countries((d) => {
            countryPopulationAll = d;
            done();
        });
    });

    beforeAll(function (done) {
        population.countries((d) => {
            countryPopulationInstance = d;
            done();
        }, {instanceId: 'syria'});
    });

    beforeAll(function (done) {
        population.countries((d) => {
            countryPopulationInstanceCountry = d;
            done();
        }, {instanceId: 'syria', countryCode: 'LEB'});
    });


    describe('regional', function () {

        it("should be one population given an id", function () {
            expect(regionPopulationsCar.length).toEqual(1);
            expect(typeof regionPopulationsCar[0].population[0].demography['04M']).toEqual('number');
        });

        it("should be be many populations for all query", function () {
            expect(regionPopulationsAll.length).toBeGreaterThan(1);
            expect(typeof regionPopulationsAll[0].population[0].demography['04M']).toEqual('number');

        })
    });

    describe('countries', function () {
        it("should have some values", function () {
            expect(countryPopulationAll.length).toBeGreaterThan(0);
            expect(countryPopulationInstance.length).toBeGreaterThan(0);
            expect(countryPopulationInstanceCountry.length).toBeGreaterThan(0);
        });

        it("should be lebanon", function () {
            let p = countryPopulationInstanceCountry[0];
            expect(p.name).toEqual('Lebanon');

            let pop = p.population[0];

            expect(pop.module_type).toEqual('Total Population & Demography');

            for (let a of pop.module_name){
                // console.log(a);
            }
        })



    })


});
