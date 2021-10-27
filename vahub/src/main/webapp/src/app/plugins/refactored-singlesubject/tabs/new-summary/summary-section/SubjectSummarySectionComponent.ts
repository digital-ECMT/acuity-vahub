import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {DatasetViews} from '../../../../../security/DatasetViews';
import {ColDef} from 'ag-grid/main';
import {List} from 'immutable';
import {SentenceCasePipe} from '../../../../../common/pipes/SentenceCasePipe';
import * as  _ from 'lodash';

@Component({
    templateUrl: 'SubjectSummarySectionComponent.html',
    styleUrls: ['SubjectSummarySectionComponent.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'summary-section'
})
export class SubjectSummarySectionComponent implements OnInit {
    @Input() section: any;
    @Input() columnDefs: any;
    @Input() sectionHeader: string;
    @Input() header: any;

    isSubHeaderCollapsed = {};
    isHeaderCollapsed = true;
    columnDefsCollection = {};

    constructor(private datasetViews: DatasetViews, private sentenceCasePipe: SentenceCasePipe) {}

    ngOnInit(): void {
        this.section.map((value, subheader) => {
            this.isSubHeaderCollapsed[subheader] = true;
        });
    }

    getColumnDefs(subheader, tableName: string): List<ColDef> {
        if (this.columnDefsCollection.hasOwnProperty(tableName)) {
            return this.columnDefsCollection[tableName];
        }
        const columnDefs = [];
        const sectionColumnsData = this.section.get(subheader).get(tableName).columnDefs;
        _.forOwn(sectionColumnsData, (displayName, column) => {
            columnDefs.push({
                field: column,
                headerName: displayName
            });
        });
        this.columnDefsCollection[tableName] = List(columnDefs);
        return this.columnDefsCollection[tableName];
    }

    toogleSubheaderCollapsed(subheader: string): void {
        this.isSubHeaderCollapsed[subheader] = !this.isSubHeaderCollapsed[subheader];
    }
}
