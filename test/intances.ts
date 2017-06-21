/**
 * Created by glenn on 6/21/17.
 */
import {instances} from '../src/instances';
import {iError} from '../src/config';


describe("Instances API", function () {
    let _instances: instances.iInstances;
    let _show: instances.iShowId;
    let _showError: iError;

    beforeAll(function (done) {
        instances.list((d) => {
            _instances = d;
            done();
        })
    });

    beforeAll(function (done) {
        instances.show('syria', (d) => {
            _show = d;
            done();
        });
    });

    beforeAll(function (done) {
        instances.show('syrias', (d) => {
            done();
        }, (e: iError) => {
            _showError = e;
            done();
        })
    });

    describe('list', function () {

        it('should have some values', function(){
            expect(_instances.instances.length).toBeGreaterThan(0);
        })


    });

    describe('show', function () {

        it('should have some countries', function () {
            expect(Object.keys(_show.countries).length).toBeGreaterThan(0);
            expect(_show.site_name).toBeDefined();
            expect(_show.url).toBeDefined();

        })

        it('should have an error message', function () {
            expect(_showError.code).toBeDefined();

        })
    });
});

