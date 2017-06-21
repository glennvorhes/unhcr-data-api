/**
 * Created by glenn on 6/21/17.
 */
import {countries} from '../src/countries';
import {iError} from '../src/config';


describe("Countries API", function () {
    let countryList: countries.iCountry[];
    let countryRegionList: countries.iCountryRegion[];
    let countryRegionInfoList: countries.iCountryRegionInfo[];
    let countryError: iError;

    beforeAll(function (done) {
        countries.list((d: countries.iCountry[]) => {
            countryList = d;
            done();
        })
    });

    beforeAll(function (done) {
        countries.regions((d: countries.iCountryRegion[]) => {
            countryRegionList = d;
            done();
        })
    });

    beforeAll(function (done) {
        countries.show('syria', (d: countries.iCountryRegionInfo[]) => {
            countryRegionInfoList = d;
            done();
        })
    });

    beforeAll(function (done) {
        countries.show('syrias', (d: countries.iCountryRegionInfo[]) => {
            done();
        }, (e: iError) => {
            countryError = e;
            done();
        })
    });

    describe('list', function () {
        it("should have some values", function () {
            expect(countryList.length).toBeGreaterThan(0);
            expect(countryList[0].country_code).toBeDefined();
            expect(countryList[0].name_en).toBeDefined();
            expect(countryList[0].region_code).toBeDefined();
            expect(countryList[0].region_code_en).toBeDefined();
        })
    });

    describe('regions', function () {
        it("should have some values", function () {
            expect(countryRegionList.length).toBeGreaterThan(0);
            expect(countryRegionList[0].region_code_en).toBeDefined();
            expect(countryRegionList[0].region_code).toBeDefined();
        });

        it("should have defined coutries", function () {
            for (let c of countryRegionList) {
                if (c.countries.length > 0) {
                    expect(c.countries[0].country_code).toBeDefined();
                    expect(c.countries[0].name_en).toBeDefined();
                    break;
                }
            }
        })
    });

    describe('show', function () {
        it('should have some values', function () {
            expect(countryRegionInfoList.length).toBeGreaterThan(0);
            expect(countryRegionInfoList[0].name).toBeDefined();
        });

        it('should have defined regions', function(){
            for (let r of countryRegionInfoList){
                if (r.regions.length > 0){
                    expect(typeof r.regions[0].longitude).toEqual('number');
                    expect(typeof r.regions[0].latitude).toEqual('number');
                    expect(r.regions[0].name).toBeDefined();

                    break;
                }
            }
        });

        it('should have a defined error', function () {
            expect(countryError.message).toBeDefined();
            expect(countryError.params['id']).toBeDefined()
        })
    });
});
