import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {fromJS, List} from 'immutable';

import {IPlot, ISelectionDetail, PlotType} from '../../common/trellising/store';
import {getServerPath} from '../../common/utils/Utils';
import {PopulationFiltersModel, VitalsFiltersModel} from '../../filters/dataTypes/module';
import {VitalsHttpService} from './VitalsHttpService';
import Dataset = Request.Dataset;
import TrellisedBoxPlot = InMemory.TrellisedBoxPlot;
import ChartGroupByOptionsFiltered = Request.ChartGroupByOptionsFiltered;
import Vital = Request.Vital;
import VitalsTrellisRequest = Request.VitalsTrellisRequest;
import VitalsValuesRequest = Request.VitalsValuesRequest;
import TrellisOptions = Request.TrellisOptions;
import VitalGroupByOptions = InMemory.VitalGroupByOptions;

@Injectable()
export class VitalsBoxPlotHttpService extends VitalsHttpService {

    constructor(protected http: HttpClient,
                protected populationFiltersModel: PopulationFiltersModel,
                protected vitalsFiltersModel: VitalsFiltersModel) {
        super(http, populationFiltersModel, vitalsFiltersModel);
    }

    getPlotData(datasets: Dataset[],
                countType,
                settings: any): Observable<any> {
        const postData: VitalsValuesRequest = {
            datasets, settings,
            populationFilters: this.populationFiltersModel.transformFiltersToServer(),
            vitalsFilters: this.vitalsFiltersModel.transformFiltersToServer()
        };

        return this.http.post(getServerPath('vitals', 'measurements-over-time-chart', 'values'), JSON.stringify(postData))
            .map((data: TrellisedBoxPlot<Vital, string>[]) => {
                return <List<IPlot>>fromJS(data.map((value: TrellisedBoxPlot<Vital, VitalGroupByOptions>) => {
                    return {
                        plotType: PlotType.BOXPLOT,
                        trellising: value.trellisedBy,
                        data: value.stats
                    };
                }));
            });
    }

    getSelection(datasets: Dataset[],
                 selectionItems: any,
                 settings: ChartGroupByOptionsFiltered<string, string>): Observable<ISelectionDetail> {

        const path = getServerPath('vitals', 'measurements-over-time-chart', 'selection');

        const postData: any = {
            datasets,
            populationFilters: this.populationFiltersModel.transformFiltersToServer(),
            vitalsFilters: this.vitalsFiltersModel.transformFiltersToServer(),
            selection: {
                selectionItems,
                settings: settings.settings
            }
        };

        return this.http.post(path, JSON.stringify(postData))
            .map((response) => {
                return <ISelectionDetail>response;
            });
    }

    getTrellisOptions(currentDatasets: Dataset[], yAxisOption: any):
        Observable<TrellisOptions<VitalGroupByOptions>[]>  {

        const path = getServerPath('vitals', 'measurements-over-time-chart', 'trellising');
        const postData: VitalsTrellisRequest = {
            populationFilters: this.populationFiltersModel.transformFiltersToServer(),
            vitalsFilters: this.vitalsFiltersModel.transformFiltersToServer(),
            datasets: currentDatasets,
            yAxisOption: yAxisOption.get('groupByOption')
        };
        return this.http.post(path, JSON.stringify(postData))
            .map(response => {
                return response as TrellisOptions<VitalGroupByOptions>[];
            });
    }

}
