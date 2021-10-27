import {Injectable} from '@angular/core';
import {ITrackDataPoint} from '../../store/ITimeline';
import {RawEvent} from '../../chart/IChartEvent';
import {BarChartEventService} from '../../chart/bar/BarChartEventService';
import {EcgTrackUtils} from './EcgTrackUtils';
import {AbstractEcgTrackModel} from './AbstractEcgTrackModel';

@Injectable()
export class EcgMeasurementTrackModel extends AbstractEcgTrackModel {

    constructor(protected barChartPlotEventService: BarChartEventService) {
        super(barChartPlotEventService);
    }

    canExpand(): boolean {
        return true;
    }

    canCollapse(): boolean {
        return true;
    }

    protected createPlotConfig(subjectId: string): any {
        const plotConfig: any = {};
        plotConfig.id = {
            subject: subjectId,
            track: EcgTrackUtils.ECG_TRACK_NAME,
            level: EcgTrackUtils.MEASUREMENT_SUB_TRACK_EXPANSION_LEVEL,
        };

        return plotConfig;
    }

    protected transformNoneDurationalDataPoint(dataPoint: ITrackDataPoint): RawEvent {
        const event = super.transformNoneDurationalDataPoint(dataPoint);
        event.plotOptions = EcgTrackUtils.assignMeasurementTrackSymbol(dataPoint.metadata);
        event.group = dataPoint.metadata.testName;
        event.metadata.tooltip = this.createTooltip(dataPoint);
        return event;
    }

    protected createTooltip(dataPoint: ITrackDataPoint): string {
        let tooltip = super.createTooltip(dataPoint);
        tooltip += 'Test name: <b>' + dataPoint.metadata.testName + '</b><br/>';

        const baseline = (dataPoint.metadata.baselineValue || dataPoint.metadata.baselineValue === 0) ? (dataPoint.metadata.baselineValue + ' ' + dataPoint.metadata.unitRaw) : 'N/A';
        tooltip += 'Baseline value: <b>' + baseline + '</b><br />';

        const changeFromBaseline = (dataPoint.metadata.valueChangeFromBaseline || dataPoint.metadata.valueChangeFromBaseline === 0) ? (dataPoint.metadata.valueChangeFromBaseline + ' ' + dataPoint.metadata.unitChangeFromBaseline) : 'N/A';
        tooltip += 'Change from baseline: <b>' + changeFromBaseline + '</b><br />';

        const percentChangeFromBaseline = (dataPoint.metadata.valuePercentChangeFromBaseline || dataPoint.metadata.valuePercentChangeFromBaseline === 0)  ? (dataPoint.metadata.valuePercentChangeFromBaseline + ' ' + dataPoint.metadata.unitPercentChangeFromBaseline) : 'N/A';
        tooltip += '% change from baseline: <b>' + percentChangeFromBaseline + '</b><br />';

        const raw = dataPoint.metadata.valueRaw ? (dataPoint.metadata.valueRaw + ' ' + dataPoint.metadata.unitRaw) : 'N/A';
        tooltip += 'Raw value: <b>' + raw + '</b>';

        return tooltip;
    }

}
