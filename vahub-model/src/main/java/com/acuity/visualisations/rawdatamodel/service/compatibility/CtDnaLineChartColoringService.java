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

package com.acuity.visualisations.rawdatamodel.service.compatibility;

import org.apache.commons.lang3.tuple.Triple;
import org.springframework.stereotype.Service;

@Service
public class CtDnaLineChartColoringService extends CategoryColoringService {

    @Override
    protected boolean isValid(Triple<Integer, Integer, Integer> rgb) {
        return super.isValid(rgb) && isNotGreen(rgb) && isNotRed(rgb);
    }

    @Override
    protected String[] getStandardColors() {
        return COLORS_NO_GREEN;
    }
}
