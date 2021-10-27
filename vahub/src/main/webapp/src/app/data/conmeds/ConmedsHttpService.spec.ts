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

import {async, inject, TestBed} from '@angular/core/testing';

import {ConmedsHttpService} from './ConmedsHttpService';
import {AesFiltersModel, ConmedsFiltersModel, PopulationFiltersModel} from '../../filters/module';

import {MockFilterModel, MockHttpClient} from '../../common/MockClasses';

import * as utils from '../../common/utils/Utils';
import {HttpClient} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AesHttpService} from '../aes';
import {Observable} from 'rxjs/Observable';

describe('GIVEN ConmedsHttpService', () => {

    const mockStudy = [{
        id: 1,
        type: 'DetectDataset',
        canView: true,
        rolePermissionMask: 3,
        viewPermissionMask: 3,
        autoGeneratedId: true,
        name: '',
        shortNameByType: '',
        supertype: '',
        typeForJackson: '',
        origin: null,
        identifier: null
    }];

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                {provide: HttpClient, useClass: MockHttpClient},
                {provide: PopulationFiltersModel, useClass: MockFilterModel},
                {provide: ConmedsFiltersModel, useClass: MockFilterModel},
                {
                    provide: ConmedsHttpService,
                    useClass: ConmedsHttpService,
                    deps: [HttpClient, PopulationFiltersModel, ConmedsFiltersModel]
                },
            ]
        });
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                {provide: HttpClient, useClass: MockHttpClient},
                {provide: PopulationFiltersModel, useClass: MockFilterModel},
                {provide: AesFiltersModel, useClass: MockFilterModel},
                {
                    provide: AesHttpService,
                    useClass: AesHttpService,
                    deps: [HttpClient, PopulationFiltersModel, AesFiltersModel]
                },
            ]
        });
    });


    describe('WHEN we get details on demand data', () => {

        it('THEN the data is returned', async(inject([HttpClient, ConmedsHttpService], (http, httpService) => {
            const mockResponse = {dodData: [{data: 'some data'}]};

            spyOn(http, 'post').and.returnValue(Observable.of(mockResponse));

            httpService.getDetailsOnDemand(mockStudy, ['ev-1'], 'subjectId', 'asc').subscribe((res) => {
                expect(res).toEqual(mockResponse.dodData);
            });
        })));
    });

    describe('WHEN we download all the details on demand data', () => {

        it('THEN the data is returned', async(inject([HttpClient, ConmedsHttpService], (http, httpService: ConmedsHttpService) => {
            spyOn(utils, 'downloadData');
            const mockResponse = [{
                subjectId: 'SUBJECT0001'
            }];

            spyOn(http, 'post').and.returnValue(Observable.of(mockResponse));

            httpService.downloadAllDetailsOnDemandData(<Request.AcuityObjectIdentityWithPermission[]> mockStudy);

            expect(utils.downloadData).toHaveBeenCalled();
        })));
    });
});
