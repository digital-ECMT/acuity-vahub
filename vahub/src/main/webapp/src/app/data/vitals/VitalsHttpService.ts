import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {DynamicAxis} from '../../common/trellising/store';
import {downloadData, getServerPath} from '../../common/utils/Utils';
import {PopulationFiltersModel, VitalsFiltersModel} from '../../filters/dataTypes/module';
import {BaseChartsHttpService} from '../BaseChartsHttpService';
import DetailsOnDemandRequest = Request.DetailsOnDemandRequest;
import DetailsOnDemandResponse = Request.DetailsOnDemandResponse;
import Dataset = Request.Dataset;
import SortAttrs = Request.SortAttrs;

@Injectable()
export class VitalsHttpService extends BaseChartsHttpService {

    constructor(protected http: HttpClient,
                protected populationFiltersModel: PopulationFiltersModel,
                protected vitalsFiltersModel: VitalsFiltersModel) {
        super();
    }

    getSubjectsInFilters(currentDatasets: Dataset[]): Observable<string[]> {
        const path = getServerPath('vitals', 'filtered-subjects');

        const postData: any = {
            populationFilters: this.populationFiltersModel.transformFiltersToServer(),
            vitalsFilters: this.vitalsFiltersModel.transformFiltersToServer(),
            datasets: currentDatasets
        };

        return this.http.post(path, JSON.stringify(postData))
            .map(res => res as string[]);
    }

    getXAxisOptions(currentDatasets: Dataset[]): Observable<DynamicAxis[]> {
        const path = getServerPath('vitals', 'measurements-over-time-chart', 'x-axis');
        const postData: any = {
            populationFilters: this.populationFiltersModel.transformFiltersToServer(),
            vitalsFilters: this.vitalsFiltersModel.transformFiltersToServer(),
            datasets: currentDatasets
        };

        return this.http.post(path, JSON.stringify(postData))
            .map(res => res as DynamicAxis[]);
    }

    getDetailsOnDemand(currentDatasets: Dataset[],
                       eventIds: string[],
                       startRow: number,
                       endRow: number,
                       sortAttrs: SortAttrs[]): Observable<any[]> {
        const path = getServerPath('vitals', 'details-on-demand', 'data');
        const postData: DetailsOnDemandRequest = {
            eventIds: eventIds,
            sortAttrs: sortAttrs,
            datasets: currentDatasets,
            start: startRow,
            end: endRow
        };

        return this.http.post(path, JSON.stringify(postData))
            .map((data: DetailsOnDemandResponse) => data.dodData);
    }

    downloadAllDetailsOnDemandData(currentDatasets: Dataset[]): void {
        const that = this;

        const requestBody = {
            populationFilters: this.populationFiltersModel.transformFiltersToServer(),
            vitalsFilters: this.vitalsFiltersModel.transformFiltersToServer(),
            datasets: currentDatasets
        };

        const path = getServerPath('vitals', 'details-on-demand', 'all-csv');

        this.http.post(path, JSON.stringify(requestBody), {responseType: 'blob'})
            .subscribe(response => {
                downloadData('details_on_demand.csv', response);
            });
    }

    downloadDetailsOnDemandData(currentDatasets: Dataset[], eventIds: string[]): void {
        const that = this;

        const requestBody = {
            eventIds: eventIds,
            datasets: currentDatasets
        };

        const path = getServerPath('vitals', 'details-on-demand', 'selected-csv');

        this.http.post(path, JSON.stringify(requestBody), {responseType: 'blob'})
            .subscribe(response => {
                downloadData('details_on_demand.csv', response);
            });
    }
}
