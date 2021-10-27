import {inject, TestBed} from '@angular/core/testing';
import {UserActivityService} from './UserActivityService';
import {SessionEventService} from './session/event/SessionEventService';
import * as utils from './common/utils/Utils';
import {UserActivityHttpService} from './UserActivityHttpService';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {DateUtilsService} from './common/utils/DateUtilsService';
import {HttpClientTestingModule} from '@angular/common/http/testing';

class MockSessionEventService {
    currentDatasets: BehaviorSubject<any> = new BehaviorSubject<any>([]);
    currentSelectedDatasets = [{
            'typeForJackson': 'com.acuity.va.security.acl.domain.AcuityDataset',
            'type': 'com.acuity.va.security.acl.domain.AcuityDataset',
            'supertype': 'com.acuity.va.security.acl.domain.Dataset',
            'id': 100,
            'name': 'Dummy study D1234C00001',
            'lockdown': false,
            'inherited': true,
            'autoGeneratedId': false,
            'redundantField1': 1,
            'redundantField2': 2
        }, {
            'typeForJackson': 'com.acuity.va.security.acl.domain.AcuityDataset',
            'type': 'com.acuity.va.security.acl.domain.AcuityDataset',
            'supertype': 'com.acuity.va.security.acl.domain.Dataset',
            'id': 279,
            'name': 'D1234rC0001',
            'lockdown': false,
            'inherited': true,
            'autoGeneratedId': false,
            'redundantField1': 1,
            'redundantField2': 2
    }];
}

describe('GIVEN a UserActivityService class', () => {
    let userActivityService, sessionEventService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                DateUtilsService,
                UserActivityHttpService,
                {
                    provide: SessionEventService,
                    useClass: MockSessionEventService
                },
                UserActivityService
            ]
        });
    });

    beforeEach(inject([UserActivityService, SessionEventService], (_userActivityService: UserActivityService, _sessionEventService) => {
        userActivityService = _userActivityService;
        sessionEventService = _sessionEventService;
    }));

    describe('WHEN getting analytics data', () => {
        it('SHOULD transform data to correct format', () => {
            spyOn(utils, 'getPluginSummary').and.returnValue({
                pageName: 'Population Summary -> Summary Plot'
            });

            const expectedResult = {
                'datasets': [{
                    'typeForJackson': 'com.acuity.va.security.acl.domain.AcuityDataset',
                    'type': 'com.acuity.va.security.acl.domain.AcuityDataset',
                    'supertype': 'com.acuity.va.security.acl.domain.Dataset',
                    'id': 100,
                    'name': 'Dummy study D1234C00001',
                    'lockdown': false,
                    'inherited': true,
                    'autoGeneratedId': false
                }, {
                    'typeForJackson': 'com.acuity.va.security.acl.domain.AcuityDataset',
                    'type': 'com.acuity.va.security.acl.domain.AcuityDataset',
                    'supertype': 'com.acuity.va.security.acl.domain.Dataset',
                    'id': 279,
                    'name': 'D1234rC0001',
                    'lockdown': false,
                    'inherited': true,
                    'autoGeneratedId': false
                }],
                'analyticsSessionId': '1493290139901100279',
                'analyticsSessionDate': '2017-04-27T10:48:59',
                'viewName': 'Population Summary',
                'visualisationName': 'Summary Plot'
            };

            const actualResult = userActivityService.getAnalyticsData('/plugins/population-summary/summary-plot');

            expect(actualResult.datasets).toEqual(expectedResult.datasets);
            expect(actualResult.viewName).toEqual(expectedResult.viewName);
            expect(actualResult.visualisationName).toEqual(expectedResult.visualisationName);
        });
    });
});
