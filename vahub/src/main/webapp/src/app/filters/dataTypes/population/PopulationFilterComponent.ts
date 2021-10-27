import {Component, OnInit, OnDestroy, AfterViewInit, Output, EventEmitter, Input} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {PopulationFiltersModel} from './PopulationFiltersModel';
import {BaseFilterItemModel} from '../../components/BaseFilterItemModel';
import {SessionEventService} from '../../../session/module';
import {AbstractDataTypeFilter} from '../AbstractDataTypeFilter';

@Component({
    selector: 'populationfilter',
    templateUrl: 'PopulationFilterComponent.html',
    styleUrls: ['../../filters.css']
})
export class PopulationFilterComponent extends AbstractDataTypeFilter implements OnInit, OnDestroy, AfterViewInit {

    @Input() isCohortFilter: boolean;
    @Output() clearAll = new EventEmitter<void>();
    @Output() exportFilters = new EventEmitter<MouseEvent>();

    private studySelectionSubscription: Subscription;

    constructor(public filtersModel: PopulationFiltersModel,
                protected sessionEventService: SessionEventService) {
        super();
        this.subKey = 'PopulationFilterComponent';

        // only do this once
        if (!filtersModel.hasInitData) {
            filtersModel.getFilters(true);
        }
    }

    ngAfterViewInit(): void {
        this.afterViewInit();
    }

    ngOnInit(): void {
        this.filtersModel.firstEventEmitted = false;
        console.log('PopulationFilterComponent ngOnInit');
    }

    ngOnDestroy(): void {
        if (this.studySelectionSubscription) {
            this.studySelectionSubscription.unsubscribe();
        }
    }

    openContent($event): void {
        const filterTitleParent = $($event.target).parent();
        filterTitleParent.siblings().toggle();
        filterTitleParent.siblings().removeClass('active');

        if (filterTitleParent.hasClass('active')) {
            filterTitleParent.removeClass('active');
            filterTitleParent.siblings().show();
            $($event.target).parents().children('.filter-list__content').hide();
            $($event.target).parents().children('.filter-list__content').find('.filter-list__content').hide();
        } else {
            filterTitleParent.addClass('active');
            filterTitleParent.siblings().hide();
            $($event.target).parents().children('.filter-list__content').show();
            $($event.target).parents().children('.filter-list__content').find('.filter-list__content').show();
        }
    }

    onApply(): void {
        this.filtersModel.getFilters();
    }

    onClear(modelToClear: BaseFilterItemModel): void {
        modelToClear.clear();
    }
}
