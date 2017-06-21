/**
 * Created by glenn on 6/21/17.
 */
import {regions} from '../src/regions';
import {iError} from '../src/config';


describe("Regions API", function () {
    let returned: regions.iRegion[] = [];
    let returnedError: iError;

    beforeAll(function (done) {
        regions.show('syria', (d) => {
            returned = d as regions.iRegion[];
            done();
        })
    });

    beforeAll(function (done) {
        regions.show('syrias', (d) => {
            done();
        }, (e: iError) => {
            returnedError = e;
            done();
        })
    });

    it('should have some values', function () {
        expect(returned.length).toBeGreaterThan(0);
    });

    it('latitude and longitude should be numbers', function () {
        expect(returned[0]).toBeDefined();

        for (let r of returned){
            if (r.settlements.length > 0){
                expect(typeof r.settlements[0].latitude).toEqual('number');
                expect(typeof r.settlements[0].longitude).toEqual('number');
            }
        }
    });
    
    it('should have an error message', function () {
        expect(returnedError.message).toBeDefined();
    })
});

