import {IZoom} from '../../index';
import {
    Component,
    ChangeDetectionStrategy,
    SimpleChanges,
    OnInit,
    OnChanges,
    EventEmitter,
    Input,
    Output
} from '@angular/core';
import 'wnumb';
import * as _ from 'lodash';

@Component({
    selector: 'trellis-x-text-zoom',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: 'XTextZoomComponent.html',
    styleUrls: ['./XTextZoomComponent.css']
})
export class XTextZoomComponent implements OnInit, OnChanges {
    @Input() zoom: IZoom;
    @Output() update: EventEmitter<IZoom> = new EventEmitter<IZoom>();

    public inputValues = {zoomMin: 1, zoomMax: 1, absMin: 1, absMax: 1};

    constructor() {
    }

    public ngOnInit(): void {
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (this.zoom) {
            this.inputValues = _.cloneDeep(this.zoom.toJS());
            _.forEach(['zoomMin', 'zoomMax', 'absMin', 'absMax'], (property) => {
                this.inputValues[property]++;
            });
        }
    }

    updateMinValue(): void {
        if (this.inputValues.zoomMin >= this.inputValues.absMax) {
            this.inputValues.zoomMin = this.inputValues.absMax - 1;
        }
        if (this.inputValues.zoomMin < this.inputValues.absMin) {
            this.inputValues.zoomMin = this.inputValues.absMin;
        }
        if (this.isCloserThanMargin()) {
            this.inputValues.zoomMin = this.inputValues.zoomMax - 6;
        }
        this.updateValues();
    }

    updateMaxValue(): void {
        if (this.inputValues.zoomMax > this.inputValues.absMax) {
            this.inputValues.zoomMax = this.inputValues.absMax;
        }
        if (this.inputValues.zoomMax <= this.inputValues.absMin) {
            this.inputValues.zoomMax = this.inputValues.absMin + 1;
        }
        if (this.isCloserThanMargin()) {
            this.inputValues.zoomMax = this.inputValues.zoomMin + 6;
        }
        this.updateValues();
    }

    private isCloserThanMargin(): boolean {
        return this.inputValues.zoomMin > this.inputValues.zoomMax - 6
            && this.inputValues.absMin < this.inputValues.absMax - 6;
    }

    private updateValues(): void {
        if (this.inputValues.zoomMax <= this.inputValues.zoomMin) {
            this.inputValues.zoomMax = this.inputValues.zoomMin + 1;
        }
        if (this.inputValues.absMin >= this.inputValues.absMax - 6) {
            this.inputValues.zoomMax = this.inputValues.absMax;
            this.inputValues.zoomMin = this.inputValues.absMin;
        }
        this.update.emit(<IZoom>{
            absMin: this.inputValues.absMin - 1,
            absMax: this.inputValues.absMax - 1,
            zoomMin: this.inputValues.zoomMin - 1,
            zoomMax: this.inputValues.zoomMax - 1
        });
    }
}
