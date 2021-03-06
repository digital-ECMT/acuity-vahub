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
import {RenalHttpService} from './RenalHttpService';
import {PopulationFiltersModel, RenalFiltersModel} from '../../filters/module';

import * as utils from '../../common/utils/Utils';
import {MockFilterModel, MockHttpClient} from '../../common/MockClasses';
import {Observable} from 'rxjs/Observable';
import {RenalBoxPlotHttpService} from 'app/data/renal';

describe('GIVEN RenalHttpService', () => {

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
                {provide: PopulationFiltersModel, useClass: MockFilterModel},
                {provide: RenalFiltersModel, useClass: MockFilterModel},
                {
                    provide: RenalBoxPlotHttpService,
                    useClass: RenalBoxPlotHttpService,
                    deps: [HttpClient, PopulationFiltersModel, RenalFiltersModel]
                },
            ]
        });
    });

    describe('WHEN we download all the details on demand data', () => {

        it('THEN the data is returned', async(inject([HttpClient, RenalBoxPlotHttpService], (httpClient, httpService: RenalHttpService) => {
            spyOn(utils, 'downloadData');
            const mockResponse = [{
                subjectId: 'SUBJECT0001'
            }];

            spyOn(httpClient, 'post').and.returnValue(Observable.of(mockResponse));

            httpService.downloadAllDetailsOnDemandData(<Request.AcuityObjectIdentityWithPermission[]> mockStudy);

            expect(utils.downloadData).toHaveBeenCalled();
        })));
    });

    describe('WHEN we get trellis options', () => {

        it('THEN the data is returned', async(inject([HttpClient, RenalBoxPlotHttpService], (httpClient, httpService) => {
            const mockResponseBody = [{
                trellisedBy: 'MEASUREMENT',
                category: 'MANDATORY_TRELLIS',
                trellisOptions: ['BLOOD UREA NITROGEN (MG/DL)', 'CREATININE (MG/DL)']
            }, {
                trellisedBy: 'ARM',
                category: 'NON_MANDATORY_TRELLIS',
                trellisOptions: ['Placebo', 'SuperDex 10 mg', 'SuperDex 20 mg']
            }];

            const mockResponse = {'trellisOptions': mockResponseBody};
            const yAxisOption = new Map();
            yAxisOption.set('groupByOption', 'yAxisOption');

            spyOn(httpClient, 'post').and.returnValue(Observable.of(mockResponse));

            httpService.getTrellisOptions(mockStudy, yAxisOption).subscribe((res) => {
                expect(res).toEqual(mockResponseBody);
            });
        })));
    });

    describe('WHEN we download all the details on demand data', () => {

        it('THEN the data is returned', async(inject([HttpClient, RenalBoxPlotHttpService], (httpClient, httpService: RenalHttpService) => {
            spyOn(utils, 'downloadData');
            const mockResponse = [{
                subjectId: 'SUBJECT0001'
            }];

            spyOn(httpClient, 'post').and.returnValue(Observable.of(mockResponse));

            httpService.downloadAllDetailsOnDemandData(<Request.AcuityObjectIdentityWithPermission[]> mockStudy);

            expect(utils.downloadData).toHaveBeenCalled();
        })));
    });
});
