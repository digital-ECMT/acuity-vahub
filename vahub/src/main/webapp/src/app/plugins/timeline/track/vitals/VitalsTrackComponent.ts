import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChange
} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

import {VitalsSummaryTrackModel} from './VitalsSummaryTrackModel';
import {VitalsMeasurementTrackModel} from './VitalsMeasurementTrackModel';
import {VitalsDetailTrackModel} from './VitalsDetailTrackModel';
import {AbstractTrackComponent} from '../AbstractTrackComponent';
import {VitalsTrackUtils} from './VitalsTrackUtils';
import {IHighlightedPlotArea, ITrack, IZoom, VitalsYAxisValue} from '../../store/ITimeline';
import {List} from 'immutable';

@Component({
    selector: 'vitals-track',
    templateUrl: 'VitalsTrackComponent.html',
    styleUrls: ['../TimelineTrackComponent.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VitalsTrackComponent extends AbstractTrackComponent implements OnInit, OnChanges, OnDestroy {
    @Input() track: ITrack;
    @Input() subjectId: string;
    @Input() subjectHighlighted: boolean;
    @Input() zoom: IZoom;
    @Input() vitalsYAxisValue: VitalsYAxisValue;
    @Input() plotBands: List<IHighlightedPlotArea>;
    @Output() expandOrCollapseTrack = new EventEmitter(false);
    @Output() cursorXCoordinate = new EventEmitter<number>();

    private vitalsYAxisValueSubscription: Subscription;

    constructor(private vitalsSummaryTrackModel: VitalsSummaryTrackModel,
                private vitalsMeasurementTrackModel: VitalsMeasurementTrackModel,
                private vitalsDetailTrackModel: VitalsDetailTrackModel) {
        super();
    }

    ngOnInit(): void {
        if (this.vitalsYAxisValue) {
            this.vitalsDetailTrackModel.setYAxisPlotValue(this.vitalsYAxisValue);
        }
    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }): void {
        if (changes['vitalsYAxisValue']) {
            this.vitalsDetailTrackModel.setYAxisPlotValue(this.vitalsYAxisValue);
            this.updateComponent(changes);
        }

        super.ngOnChanges(changes);
    }

    ngOnDestroy(): void {
        if (this.vitalsYAxisValueSubscription) {
            this.vitalsYAxisValueSubscription.unsubscribe();
        }
    }

    canExpand(): boolean {
        if (this.track.expansionLevel === VitalsTrackUtils.SUMMARY_SUB_TRACK_EXPANSION_LEVEL) {
            return this.vitalsSummaryTrackModel.canExpand();
        } else if (this.track.expansionLevel === VitalsTrackUtils.MEASUREMENT_SUB_TRACK_EXPANSION_LEVEL) {
            return this.vitalsMeasurementTrackModel.canExpand();
        } else if (this.track.expansionLevel === VitalsTrackUtils.DETAIL_SUB_TRACK_EXPANSION_LEVEL) {
            return this.vitalsDetailTrackModel.canExpand();
        } else {
            return false;
        }
    }

    canCollapse(): boolean {
        if (this.track.expansionLevel === VitalsTrackUtils.SUMMARY_SUB_TRACK_EXPANSION_LEVEL) {
            return this.vitalsSummaryTrackModel.canCollapse();
        } else if (this.track.expansionLevel === VitalsTrackUtils.MEASUREMENT_SUB_TRACK_EXPANSION_LEVEL) {
            return this.vitalsMeasurementTrackModel.canCollapse();
        } else if (this.track.expansionLevel === VitalsTrackUtils.DETAIL_SUB_TRACK_EXPANSION_LEVEL) {
            return this.vitalsDetailTrackModel.canCollapse();
        } else {
            return false;
        }
    }

    canExpandAll(): boolean {
        return this.canExpand();
    }

    canCollapseAll(): boolean {
        return this.canCollapse();
    }

    protected updatePlotData(): void {
        if (this.track.expansionLevel === VitalsTrackUtils.SUMMARY_SUB_TRACK_EXPANSION_LEVEL) {
            this.trackPlotDetails = this.vitalsSummaryTrackModel.createTrackPlotDetail(this.subjectId, this.track);
        } else if (this.track.expansionLevel === VitalsTrackUtils.MEASUREMENT_SUB_TRACK_EXPANSION_LEVEL) {
            this.trackPlotDetails = this.vitalsMeasurementTrackModel.createTrackPlotDetail(this.subjectId, this.track);
        } else if (this.track.expansionLevel === VitalsTrackUtils.DETAIL_SUB_TRACK_EXPANSION_LEVEL) {
            this.trackPlotDetails = this.vitalsDetailTrackModel.createTrackPlotDetail(this.subjectId, this.track);
        }
    }
}