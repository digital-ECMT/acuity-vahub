/*
 * Copyright 2021 The University of Manchester
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {SubjectSummaryTabComponent} from './SubjectSummaryTabComponent';
import {SubjectSummaryComponent} from './SubjectSummaryComponent';
import {SubjectSummarySectionComponent} from './summary-section/SubjectSummarySectionComponent';
import {SubjectInfoComponent} from './summary-section/subject-info/SubjectInfoComponent';
import {ProgressComponentModule} from '../../../../common/loading/ProgressComponent.module';
import {CommonPipesModule} from '../../../../common/pipes/CommonPipes.module';
import {SubjectSummaryTableComponent} from './summary-section/summary-table/SubjectSummaryTableComponent';
import {AgGridModule} from 'ag-grid-angular/main';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ProgressComponentModule,
        CommonPipesModule,
        AgGridModule.withComponents([
            SubjectSummaryTableComponent
        ])
    ],
    declarations: [
        SubjectSummaryTabComponent,
        SubjectSummaryComponent,
        SubjectSummarySectionComponent,
        SubjectInfoComponent,
        SubjectSummaryTableComponent
    ],
    exports: [SubjectSummaryTabComponent],
    providers: [

    ]
})
export class SubjectSummaryTabComponentModule {

}
