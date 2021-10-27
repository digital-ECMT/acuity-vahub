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

import {IChartPlotConfigService} from '../IChartPlotConfigService';
import {Injectable} from '@angular/core';
import {ScaleTypes, TabId} from '../../../../store';
import {AbstractPlotConfigService} from '../AbstractPlotConfigService';
import {CustomPlotConfig, UserOptions} from '../../../../../../../vahub-charts/types/interfaces';

@Injectable()
export class LinePlotConfigService extends AbstractPlotConfigService implements IChartPlotConfigService {

    createPlotConfig(title: string, xAxisLabel: string, globalXAxisLabel: string,
                     yAxisLabel: string, globalYAxisLabel: string, height: number, tabId: TabId): UserOptions {
        const customConfig: CustomPlotConfig = {
            chart: {
                type: 'line',
                animationTime: 500
            },
            xAxis: [{
                title: {
                    text: xAxisLabel
                },
                type: ScaleTypes.CATEGORY_SCALE
            }],
            yAxis: [{
                title: {
                    text: yAxisLabel
                }
            }],
            tooltip: {
                formatter: function (): string {
                    if (!this) {
                        return null;
                    }
                    return 'Series: ' + this.series.name + '<br/>'
                        + globalYAxisLabel + ': ' + this.y + '<br/>'
                        + 'Time point: ' + this.category;
                }
            }
        };
        return super.createDefaultPlotConfig(customConfig, height, title);
    }
}
