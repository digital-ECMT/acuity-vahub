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

import {
    CvotComponent
} from '../module';
import {
    CvotFiltersModel,
    PopulationFiltersModel
} from '../../filters/module';
import {CanDeactivateBase} from './CanDeactivateBase';
import {FiltersService} from '../../data/FiltersService';
import {FilterId} from '../../common/module';
import {CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {TimelineConfigService} from '../../common/trellising/store/services/TimelineConfigService';

@Injectable()
export class CanDeactivateCvot extends CanDeactivateBase implements CanDeactivate<CvotComponent> {

    constructor(cvotFiltersModel: CvotFiltersModel,
                protected filtersService: FiltersService,
                protected populationFiltersModel: PopulationFiltersModel,
                protected router: Router,
                protected timelineConfigService: TimelineConfigService) {
        super(cvotFiltersModel, FilterId.CVOT, filtersService, populationFiltersModel, router, timelineConfigService);
    }

    canDeactivate(component: CvotComponent,
                  route: ActivatedRouteSnapshot,
                  state: RouterStateSnapshot): Observable<boolean> | boolean {
        return this.canDeactivateBase();
    }
}
