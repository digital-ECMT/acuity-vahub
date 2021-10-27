import {Component, OnInit, OnDestroy, AfterViewInit, Output, EventEmitter} from '@angular/core';
import {CvotFiltersModel} from './CvotFiltersModel';
import {FilterEventService} from '../../event/FilterEventService';
import {SessionEventService} from '../../../session/module';
import {AbstractDataTypeFilter} from '../AbstractDataTypeFilter';

@Component({
    selector: 'cvotfilter',
    templateUrl: 'CvotFilterComponent.html'
})
export class CvotFilterComponent extends AbstractDataTypeFilter implements OnInit, OnDestroy, AfterViewInit {
    @Output()
    public clearAll = new EventEmitter<void>();
    @Output()
    public exportFilters = new EventEmitter<MouseEvent>();

    constructor(
        public filtersModel: CvotFiltersModel,
        protected filterEventService: FilterEventService,
        protected sessionEventService: SessionEventService
    ) {
        super();
        this.subKey = 'CvotFilterComponent';
    }

    ngAfterViewInit(): void {
        this.afterViewInit();
    }

    ngOnInit(): void {
        this.onInit();
    }

    ngOnDestroy(): void {
        this.onDestroy();
    }
}
