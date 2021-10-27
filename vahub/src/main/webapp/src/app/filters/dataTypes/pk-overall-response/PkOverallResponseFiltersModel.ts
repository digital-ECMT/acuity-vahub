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

import {DatasetViews} from '../../../security/DatasetViews';
import {UserPermissions} from '../../../security/UserPermissions';
import {ListFilterItemModel} from '../../components/module';
import {FilterEventService} from '../../event/FilterEventService';
import {FilterHttpService} from '../../http/FilterHttpService';

import {AbstractEventFiltersModel} from '../AbstractEventFiltersModel';
import {PopulationFiltersModel} from '../population/PopulationFiltersModel';

@Injectable()
export class PkOverallResponseFiltersModel extends AbstractEventFiltersModel {

    constructor(populationFiltersModel: PopulationFiltersModel,
                filterHttpService: FilterHttpService,
                filterEventService: FilterEventService,
                datasetViews: DatasetViews,
                protected userPermissions: UserPermissions) {
        super(populationFiltersModel, filterHttpService, filterEventService, datasetViews);

        this.itemsModels.push(new ListFilterItemModel('analyte', 'Analyte'));
    }

    emitEvent(serverModel: any): void {
        this.filterEventService.setPkResultOverallResponseFilter(serverModel);
    }

    getName(): string {
        return 'pkResultWithResponse';
    }

    getDisplayName(): string {
        return 'PK Response';
    }

    getModulePath(): string {
        return 'pkresultwithresponse';
    }

    isVisible(): boolean {
        return this.datasetViews ? this.datasetViews.hasPkResultWithResponseData()
            && this.userPermissions.hasViewOncologyPackagePermission() : false;
    }
}
