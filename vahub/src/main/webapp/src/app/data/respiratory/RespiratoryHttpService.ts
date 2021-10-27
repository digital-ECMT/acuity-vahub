import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {DynamicAxis} from '../../common/trellising/store';
import {downloadData, getServerPath} from '../../common/utils/Utils';
import {BaseChartsHttpService} from '../BaseChartsHttpService';
import {LungFunctionFiltersModel, PopulationFiltersModel} from '../../filters/dataTypes/module';
import Dataset = Request.Dataset;
import SortAttrs = Request.SortAttrs;
import DetailsOnDemandRequest = Request.DetailsOnDemandRequest;

@Injectable()
export class RespiratoryHttpService extends BaseChartsHttpService {

    API = getServerPath('respiratory', 'lung-function', 'measurements-over-time-chart');

    constructor(protected http: HttpClient,
                protected populationFiltersModel: PopulationFiltersModel,
                protected lungFunctionFiltersModel: LungFunctionFiltersModel) {
        super();
    }

    getXAxisOptions(currentDatasets: Request.AcuityObjectIdentityWithPermission[]): Observable<DynamicAxis[]> {
        const path = `${this.API}/x-axis`;
        const postData: any = {
            populationFilters: this.populationFiltersModel.transformFiltersToServer(),
            lungFunctionFilters: this.lungFunctionFiltersModel.transformFiltersToServer(),
            datasets: currentDatasets
        };
        return this.http.post(path, JSON.stringify(postData)).map(res => res as DynamicAxis[]);
    }

    getSubjectsInFilters(currentDatasets: Request.AcuityObjectIdentityWithPermission[]): Observable<string[]> {
        const path = getServerPath('respiratory', 'lung-function', 'filtered-subjects');

        const postData: any = {
            populationFilters: this.populationFiltersModel.transformFiltersToServer(),
            lungFunctionFilters: this.lungFunctionFiltersModel.transformFiltersToServer(),
            datasets: currentDatasets
        };

        return this.http.post(path, JSON.stringify(postData)).map(res => res as string[]);
    }

    getDetailsOnDemand(currentDatasets: Dataset[],
                       eventIds: any[],
                       startRow: number,
                       endRow: number,
                       sortAttrs: SortAttrs[]): Observable<any[]> {
        const path = getServerPath('respiratory', 'lung-function', 'details-on-demand', 'data');
        const postData: DetailsOnDemandRequest = {
            eventIds: eventIds,
            sortAttrs: sortAttrs,
            datasets: currentDatasets,
            start: startRow,
            end: endRow
        };

        return this.http.post(path, JSON.stringify(postData))
            .map((data: any) => data.dodData);
    }

    downloadAllDetailsOnDemandData(currentDatasets: Request.AcuityObjectIdentityWithPermission[]): void {

        const requestBody = {
            populationFilters: this.populationFiltersModel.transformFiltersToServer(),
            lungFunctionFilters: this.lungFunctionFiltersModel.transformFiltersToServer(),
            datasets: currentDatasets
        };

        const path = getServerPath('respiratory', 'lung-function', 'details-on-demand', 'all-csv');

        this.http.post(path, JSON.stringify(requestBody), {responseType: 'blob'})
            .subscribe(response => {
                downloadData('details_on_demand.csv', response);
            });
    }

    downloadDetailsOnDemandData(currentDatasets: Request.AcuityObjectIdentityWithPermission[], eventIds: string[]): void {

        const requestBody = {
            eventIds: eventIds,
            datasets: currentDatasets
        };

        const path = getServerPath('respiratory', 'lung-function', 'details-on-demand', 'selected-csv');

        this.http.post(path, JSON.stringify(requestBody), {responseType: 'blob'})
            .subscribe(response => {
                downloadData('details_on_demand.csv', response);
            });
    }
}
