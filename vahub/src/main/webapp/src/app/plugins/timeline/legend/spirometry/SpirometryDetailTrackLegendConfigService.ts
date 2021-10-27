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
import {TrackLegendConfig, TrackLegendType} from '../track/ITrackLegend';
import {ITrackLegendConfigService} from '../ITrackLegendConfigService';
import {SpirometryTrackUtils} from '../../track/spirometry/SpirometryTrackUtils';
import {SpirometryYAxisValue} from '../../store/ITimeline';

@Injectable()
export class SpirometryDetailTrackLegendConfigService implements ITrackLegendConfigService {

    getTrackLegendConfig(): TrackLegendConfig {
        return <TrackLegendConfig> {
            title: 'Spirometry detail',
            items: [
                {
                    type: TrackLegendType.CIRCLE,
                    text: 'Spirometry Measurement',
                    height: '10',
                    width: '10',
                    color: SpirometryTrackUtils.SPIROMETRY_MEASUREMENT_COLOUR
                },
                {
                    type: TrackLegendType.DASH_LINE,
                    text: 'Spirometry Baseline',
                    height: '10',
                    width: '10',
                    color: SpirometryTrackUtils.BASELINE_COLOUR
                }
            ]
        };
    }
}
