import {
    Component,
    ChangeDetectionStrategy,
    OnChanges,
    SimpleChange,
    AfterViewInit,
    OnDestroy,
    OnInit,
    Input,
    Output,
    EventEmitter
} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {SpirometrySummaryTrackModel} from './SpirometrySummaryTrackModel';
import {SpirometryCategoryTrackModel} from './SpirometryCategoryTrackModel';
import {SpirometryDetailTrackModel} from './SpirometryDetailTrackModel';
import {AbstractTrackComponent} from '../AbstractTrackComponent';
import {SpirometryTrackUtils} from './SpirometryTrackUtils';
import {SpirometryYAxisValue, ITrack, IZoom, IHighlightedPlotArea} from '../../store/ITimeline';
import {List} from 'immutable';

@Component({
    selector: 'spirometry-track',
    templateUrl: 'SpirometryTrackComponent.html',
    styleUrls: ['../TimelineTrackComponent.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpirometryTrackComponent extends AbstractTrackComponent implements OnInit, OnChanges, OnDestroy {
    @Input() track: ITrack;
    @Input() subjectId: string;
    @Input() subjectHighlighted: boolean;
    @Input() zoom: IZoom;
    @Input() spirometryYAxisValue: SpirometryYAxisValue;
    @Input() plotBands: List<IHighlightedPlotArea>;
    @Output() expandOrCollapseTrack = new EventEmitter(false);
    @Output() cursorXCoordinate = new EventEmitter<number>();

    private spirometryYAxisValueSubscription: Subscription;

    constructor(private spirometrySummaryTrackModel: SpirometrySummaryTrackModel,
                private spirometryCategoryTrackModel: SpirometryCategoryTrackModel,
                private spirometryDetailTrackModel: SpirometryDetailTrackModel) {
        super();
    }

    ngOnInit(): void {
        if (this.spirometryYAxisValue) {
            this.spirometryDetailTrackModel.setYAxisPlotValue(this.spirometryYAxisValue);
        }
    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }): void {
        if (changes['spirometryYAxisValue']) {
            this.spirometryDetailTrackModel.setYAxisPlotValue(this.spirometryYAxisValue);
            this.updateComponent(changes);
        }

        super.ngOnChanges(changes);
    }

    ngOnDestroy(): void {
        if (this.spirometryYAxisValueSubscription) {
            this.spirometryYAxisValueSubscription.unsubscribe();
        }
    }

    canExpand(): boolean {
        if (this.track.expansionLevel === SpirometryTrackUtils.SUMMARY_SUB_TRACK_EXPANSION_LEVEL) {
            return this.spirometrySummaryTrackModel.canExpand();
        } else if (this.track.expansionLevel === SpirometryTrackUtils.CATEGORY_SUB_TRACK_EXPANSION_LEVEL) {
            return this.spirometryCategoryTrackModel.canExpand();
        } else if (this.track.expansionLevel === SpirometryTrackUtils.DETAIL_SUB_TRACK_EXPANSION_LEVEL) {
            return this.spirometryDetailTrackModel.canExpand();
        } else {
            return false;
        }
    }

    canCollapse(): boolean {
        if (this.track.expansionLevel === SpirometryTrackUtils.SUMMARY_SUB_TRACK_EXPANSION_LEVEL) {
            return this.spirometrySummaryTrackModel.canCollapse();
        } else if (this.track.expansionLevel === SpirometryTrackUtils.CATEGORY_SUB_TRACK_EXPANSION_LEVEL) {
            return this.spirometryCategoryTrackModel.canCollapse();
        } else if (this.track.expansionLevel === SpirometryTrackUtils.DETAIL_SUB_TRACK_EXPANSION_LEVEL) {
            return this.spirometryDetailTrackModel.canCollapse();
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
        if (this.track.expansionLevel === SpirometryTrackUtils.SUMMARY_SUB_TRACK_EXPANSION_LEVEL) {
            this.trackPlotDetails = this.spirometrySummaryTrackModel.createTrackPlotDetail(this.subjectId, this.track);
        } else if (this.track.expansionLevel === SpirometryTrackUtils.CATEGORY_SUB_TRACK_EXPANSION_LEVEL) {
            this.trackPlotDetails = this.spirometryCategoryTrackModel.createTrackPlotDetail(this.subjectId, this.track);
        } else if (this.track.expansionLevel === SpirometryTrackUtils.DETAIL_SUB_TRACK_EXPANSION_LEVEL) {
            this.trackPlotDetails = this.spirometryDetailTrackModel.createTrackPlotDetail(this.subjectId, this.track);
        }
    }
}