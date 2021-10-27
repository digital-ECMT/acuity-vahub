import {inject, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

import {AlcoholFiltersModel} from './AlcoholFiltersModel';
import {PopulationFiltersModel} from '../population/PopulationFiltersModel';
import {FilterHttpService} from '../../http/FilterHttpService';
import {FilterEventService} from '../../event/FilterEventService';

import {MockDatasetViews, MockFilterEventService} from '../../../common/MockClasses';
import {DatasetViews} from '../../../security/DatasetViews';

class MockFilterHttpService {
}

describe('GIVEN a AlcoholFiltersModel class', () => {
    let alcoholFiltersModel;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                {provide: DatasetViews, useClass: MockDatasetViews},
                {provide: FilterHttpService, useClass: MockFilterHttpService},
                {provide: PopulationFiltersModel, deps: [FilterHttpService, FilterEventService]},
                {provide: FilterEventService, useClass: MockFilterEventService},
                {
                    provide: AlcoholFiltersModel,
                    useFactory: (p: PopulationFiltersModel, f: FilterHttpService, e: FilterEventService,
                                 d: DatasetViews): AlcoholFiltersModel =>
                        new AlcoholFiltersModel(p, f, e, d),
                    deps: [PopulationFiltersModel, FilterHttpService, FilterEventService, DatasetViews]
                }
            ]
        });
    });

    beforeEach(inject([AlcoholFiltersModel], (_alcoholFiltersModel: AlcoholFiltersModel) => {
        alcoholFiltersModel = _alcoholFiltersModel;
    }));

    describe('WHEN constructing', () => {

        it('SHOULD have instance var set', () => {

            expect(alcoholFiltersModel.itemsModels.length).toBe(9);
            expect(alcoholFiltersModel.datasetViews).toBeDefined();
        });
    });

    describe('WHEN transforming model to server', () => {

        it('SHOULD be empty', () => {

            expect(alcoholFiltersModel.transformFiltersToServer()).toEqual({});
        });
    });

    describe('WHEN getting name', () => {
        it('SHOULD get name alcohol', () => {

            expect(alcoholFiltersModel.getName()).toEqual('alcohol');
        });
    });

    describe('WHEN emitEvents', () => {

        it('SHOULD be set filterEventService.setAlcoholFilter', inject([FilterEventService],
            (filterEventService: FilterEventService) => {
            const validator = jasmine.createSpyObj('validator', ['called']);

            filterEventService.alcoholFilter.subscribe(
                (object: any) => {
                    validator.called(object);
                }
            );

            alcoholFiltersModel.emitEvent({});

            expect(validator.called).toHaveBeenCalledWith({});
        }));
    });

    describe('WHEN checking if visible', () => {
        let datasetViews;

        beforeEach(inject([DatasetViews], (_datasetViews: DatasetViews) => {
            datasetViews = _datasetViews;
        }));

        describe('AND datasetViews have no data', () => {
            it('THEN should not be visible', () => {
                spyOn(datasetViews, 'hasAlcoholData').and.returnValue(false);
                expect(alcoholFiltersModel.isVisible()).toBeFalsy();
            });
        });

        describe('AND datasetViews have data', () => {
            it('THEN should be visible', () => {
                spyOn(datasetViews, 'hasAlcoholData').and.returnValue(true);
                expect(alcoholFiltersModel.isVisible()).toBeTruthy();
            });
        });

    });
});
