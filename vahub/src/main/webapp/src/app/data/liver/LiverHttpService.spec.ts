import {HttpClient} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {async, inject, TestBed} from '@angular/core/testing';

import {LiverHttpService} from './LiverHttpService';
import {
    FilterEventService,
    FilterHttpService,
    LiverFunctionFiltersModel,
    PopulationFiltersModel
} from '../../filters/module';

import * as utils from '../../common/utils/Utils';

import {MockFilterModel, MockHttpClient} from '../../common/MockClasses';
import {Observable} from 'rxjs/Observable';
import Dataset = Request.Dataset;

describe('GIVEN LiverHttpService', () => {

    const mockStudy = [{
        id: 1,
        type: 'DetectDataset',
        canView: true,
        rolePermissionMask: 3,
        viewPermissionMask: 3,
        autoGeneratedId: true,
        name: '',
        shortNameByType: '',
        supertype: ''
    }];

    const mockSelection = {
        maxX: 1.4224283305227656,
        maxY: 22,
        minX: -0.4662731871838111,
        minY: 0
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                {provide: HttpClient, useClass: MockHttpClient},
                {provide: PopulationFiltersModel, useValue: new MockFilterModel()},
                {provide: LiverFunctionFiltersModel, useValue: new MockFilterModel()},
                FilterEventService,
                FilterHttpService,
                {
                    provide: LiverHttpService,
                    useClass: LiverHttpService,
                    deps: [HttpClient, PopulationFiltersModel, LiverFunctionFiltersModel]
                },
            ]
        });
    });

    describe('WHEN we get details on demand data', () => {

        it('THEN the data is returned', async(inject([HttpClient, LiverHttpService], (httpClient, httpService: LiverHttpService) => {
            const eventIds = ['1', '2'];
            const mockResponse = [{
                subjectId: 'E0000100232'
            }];

            spyOn(httpClient, 'post').and.returnValue(Observable.of(mockResponse));
            httpService.getDetailsOnDemandData(<Dataset[]> mockStudy, eventIds, 0, 10, 'subjectId', 'asc')
                .subscribe((res) => {
                    expect(res).toEqual(mockResponse);
                });
        })));
    });

    describe('WHEN we download all the details on demand data', () => {

        it('THEN the data is returned', async(inject([HttpClient, LiverHttpService], (httpClient, httpService: LiverHttpService) => {
            spyOn(utils, 'downloadData');
            const mockResponse = [{
                subjectId: 'E0000100232'
            }];

            spyOn(httpClient, 'post').and.returnValue(Observable.of(mockResponse));

            httpService.downloadAllDetailsOnDemandData(<Request.AcuityObjectIdentityWithPermission[]> mockStudy);

            expect(utils.downloadData).toHaveBeenCalled();
        })));
    });
});