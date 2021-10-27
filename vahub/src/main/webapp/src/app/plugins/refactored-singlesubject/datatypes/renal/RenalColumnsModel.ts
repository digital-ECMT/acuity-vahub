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

import {Injectable} from '@angular/core';
import {ColDef} from 'ag-grid/main';
import {List} from 'immutable';
import {AbstractColumnModel} from '../AbstractColumnModel';

@Injectable()
export class RenalColumnsModel extends AbstractColumnModel {
    _columnDefs: List<ColDef> = List([
        {field: 'studyId'},
        {field: 'studyPart'},
        {field: 'subjectId'},
        {field: 'measurementName', enableRowGroup: true},
        {field: 'measurementTimePoint', enableRowGroup: true},
        {field: 'daysOnStudy', enableRowGroup: true, enableValue: true, filter: 'number'},
        {field: 'analysisVisit', enableRowGroup: true, enableValue: true, filter: 'number'},
        {field: 'visitNumber', enableRowGroup: true, enableValue: true, filter: 'number'},
        {field: 'resultValue', enableValue: true, filter: 'number'},
        {field: 'resultUnit', enableRowGroup: true},
        {field: 'timesLowerRef', enableRowGroup: true, filter: 'number'},
        {field: 'timesUpperRef', enableRowGroup: true, enableValue: true, filter: 'number'},
        {field: 'upperRefRangeValue', enableRowGroup: true, enableValue: true, filter: 'number'},
        {field: 'ckdStage', enableRowGroup: true}
    ]);
}
