import {Injectable} from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';

import {getServerPath, getPluginSummary} from './common/utils/Utils';
import {SessionEventService} from './session/event/SessionEventService';
import {UserActivityHttpService} from './UserActivityHttpService';
import {DateUtilsService} from './common/utils/DateUtilsService';

@Injectable()
export class UserActivityService {
    private sessionDate: moment.Moment;

    constructor(private sessionEventService: SessionEventService,
                private userActivityHttp: UserActivityHttpService,
                private dateUtilsService: DateUtilsService) {
        this.sessionEventService.currentDatasets.subscribe(() => {
            this.generateNewSessionDate();
        });
    }

    /**
     * Send data to api
     * @param pluginUrl {string}
     */
    send(pluginUrl): void {
        this.userActivityHttp.sendUserActivity(this.getAnalyticsData(pluginUrl))
            .subscribe();
    }

    private generateNewSessionDate(): void {
        this.sessionDate = this.dateUtilsService.getNow();
    }

    /**
     * Get analyticsData based on pluginUrl
     * @param pluginUrl
     * @returns {{datasets, analyticsSessionId, analyticsSessionDate: string, viewName: string, visualisationName: string}}
     */
    private getAnalyticsData(pluginUrl): any {
        const { datasets, analyticsSessionId } = this.sessionEventService
            .currentSelectedDatasets
            .reduce((result: any, dataset: any) => {
                result.datasets.push(_.pick(dataset, [
                    'typeForJackson',
                    'type',
                    'supertype',
                    'id',
                    'name',
                    'lockdown',
                    'inherited',
                    'autoGeneratedId'
                ]));
                result.analyticsSessionId += dataset['id'].toString();
                return result;
            }, {
                datasets: [],
                analyticsSessionId: (+this.sessionDate).toString()
            });

        const [page, tab] = pluginUrl.slice(9).split('/');
        const viewSummary = getPluginSummary(page, tab);
        const [viewName,  visualisationName = ''] = viewSummary.pageName.split(' -> ');

        return {
            datasets,
            analyticsSessionId,
            analyticsSessionDate: this.sessionDate.toISOString().slice(0, -5),
            viewName, visualisationName
        };
    }
}
