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

package com.acuity.visualisations.rawdatamodel.vo.timeline.lungfunction;

import com.acuity.visualisations.rawdatamodel.vo.timeline.day.hour.DateDayHour;
import lombok.Builder;
import lombok.Data;
import lombok.ToString;

import java.io.Serializable;

@Data
@Builder
@ToString(callSuper = true)
public class LungFunctionDetailsEvent implements Serializable {
    private DateDayHour start;
    private Double visitNumber;

    private Double baselineValue;
    private Double valueRaw;
    private String unitRaw;

    // second series (optional)
    private Double valueChangeFromBaseline;
    private String unitChangeFromBaseline;

    // third series (optional)
    private Double valuePercentChangeFromBaseline;
    private String unitPercentChangeFromBaseline;

    private boolean baselineFlag;
}
