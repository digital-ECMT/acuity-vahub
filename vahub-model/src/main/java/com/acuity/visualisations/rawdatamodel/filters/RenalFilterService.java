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

package com.acuity.visualisations.rawdatamodel.filters;

import com.acuity.visualisations.rawdatamodel.service.filters.AbstractEventFilterService;
import com.acuity.visualisations.rawdatamodel.statistics.filters.FilterSummaryStatisticsCollector;
import com.acuity.visualisations.rawdatamodel.statistics.filters.RenalFilterSummaryStatistics;
import com.acuity.visualisations.rawdatamodel.vo.FilterResult;
import com.acuity.visualisations.rawdatamodel.vo.wrappers.Renal;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
public class RenalFilterService extends AbstractEventFilterService<Renal, Filters<Renal>> {
    @Override
    protected Filters<Renal> getAvailableFiltersImpl(FilterResult<Renal> filteredResult) {
        Collection<Renal> filteredRenalEvents = filteredResult.getFilteredResult();

        return filteredRenalEvents.parallelStream()
                .collect(new FilterSummaryStatisticsCollector<>(RenalFilterSummaryStatistics.class))
                .getFilters();
    }

}
