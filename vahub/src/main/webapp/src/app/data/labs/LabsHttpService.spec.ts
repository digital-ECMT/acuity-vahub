/*
 * Copyright 2021 The University of Manchester
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {HttpClient} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {async, inject, TestBed} from '@angular/core/testing';
import {LabsHttpService} from './LabsHttpService';
import {FilterEventService, FilterHttpService, LabsFiltersModel, PopulationFiltersModel} from '../../filters/module';
import {MockFilterModel, MockHttpClient} from '../../common/MockClasses';
import * as utils from '../../common/utils/Utils';
import {Observable} from 'rxjs/Observable';
import {fromJS} from 'immutable';
import Dataset = Request.Dataset;

describe('GIVEN LabsHttpService', () => {

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

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                {provide: HttpClient, useClass: MockHttpClient},
                {provide: PopulationFiltersModel, useValue: new MockFilterModel()},
                {provide: LabsFiltersModel, useValue: new MockFilterModel()},
                FilterEventService,
                FilterHttpService,
                {
                    provide: LabsHttpService,
                    useClass: LabsHttpService,
                    deps: [HttpClient, PopulationFiltersModel, LabsFiltersModel]
                }
            ]
        });
    });

    describe('WHEN we get details on demand data', () => {

        it('THEN the data is returned', async(inject([HttpClient, LabsHttpService], (httpClient, httpService: LabsHttpService) => {
            const eventIds = ['1', '2'];
            const mockResponse = [{
                subjectId: 'SUBJECT0001'
            }];

            spyOn(httpClient, 'post').and.returnValue(Observable.of(mockResponse));

            httpService.getDetailsOnDemand(<Dataset[]> mockStudy, eventIds, 0, 10,
                fromJS({sortBy: 'subjectId', reversed: false}))
                .subscribe((res) => {
                    expect(res).toEqual(mockResponse);
                });
        })));
    });

    describe('WHEN we download all the details on demand data', () => {

        it('THEN the data is returned', async(inject([HttpClient, LabsHttpService], (httpClient, httpService: LabsHttpService) => {
            spyOn(utils, 'downloadData');
            const mockResponse = [{
                subjectId: 'SUBJECT0001'
            }];

            spyOn(httpClient, 'post').and.returnValue(Observable.of(mockResponse));

            httpService.downloadAllDetailsOnDemandData(<Dataset[]> mockStudy);

            expect(utils.downloadData).toHaveBeenCalled();
        })));
    });
});
