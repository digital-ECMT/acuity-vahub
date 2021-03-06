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

import {includes, isNumber, startsWith} from 'lodash';

export class CommonChartUtils {
    public static EXPAND = 'Expand';
    public static COLLAPSE = 'Collapse';
    public static TOOLTIP_MARGIN_HEIGHT = 16;
    public static TOOLTIP_MARGIN_WIDTH = 8;
}

export function labelFormatter(value: any, numOfDigits: number): string {
    return value && isNumber(value) ?
        parseFloat(value.toFixed(numOfDigits)).toString() :
        value;
}

export function drawStar(centerX, centerY, rOuter, rInner, nPoints = 5): Array<string> {
    // Adaptation of Smiffy's SVG Star Path Generator by Matthew Smith
    // https://www.smiffysplace.com/stars.html

    const result = [];
    const baseAngle = Math.PI / nPoints;

    for (let i = 0, counter = 0; i <= Math.PI * 2; i += baseAngle, counter++) {
      const r = counter % 2 === 0 ? rInner : rOuter;
      const cmd = counter === 0 ? 'M' : 'L';

      const xresult = ((r * Math.sin(i)) + parseFloat(centerX)).toFixed(3);
      const yresult = ((r * Math.cos(i)) + parseFloat(centerY)).toFixed(3);

      result.push(cmd, xresult, yresult);
    }

    if (nPoints % 2 === 0) {
      result.push('z');
    }

    return result;
}

export function hexToRgba(hex: string, opacity: string): string {
    hex = hex.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

export function handleYAxisOptions(yAxisOptions: string): any {
    const weekSelected = startsWith(yAxisOptions, 'Week');
    return {
        groupByOption: 'PERCENTAGE_CHANGE',
        params: weekSelected ? {
            ASSESSMENT_TYPE: yAxisOptions.split(' ')[0].toUpperCase(),
            WEEK_NUMBER: parseInt(yAxisOptions.split(' ')[1], 10)
        } : {
            ASSESSMENT_TYPE: yAxisOptions,
            WEEK_NUMBER: 0
        }
    };
}

export function handleXAxisOptions(xAxisOptions: string): any {
    const weekSelected = includes(xAxisOptions, 'week');
    return {
        groupByOption: 'OVERALL_RESPONSE',
        params: weekSelected ? {
            ASSESSMENT_TYPE: 'WEEK',
            WEEK_NUMBER: parseInt(xAxisOptions.match(/\d+$/)[0], 10)
        } : {
            ASSESSMENT_TYPE: 'BEST_CHANGE',
            WEEK_NUMBER: 0
        }
    };
}

/**
 * Here is base64 encoded down arrow png.
 * Static definition of image source is required because load image from network takes much more time then from a constant
 * In addition during scaling procedure image loaded on each redraw action which in case of hosting image on server
 * led to arrow blinking.
 **/
export const LEFT_ARROW_BASE64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAwsAAAMLCAYAAAABpgu6AAAABHNCSVQICAgIfAhk' +
    'iAAAAAFzUkdCAK7OHOkAAAAEZ0FNQQAAsY8L/GEFAAAACXBIWXMAACsiAAArIgH+ETDeAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+4' +
    '8GgAANOdJREFUeF7t3Qd8JHd5N3CNVqeTtDOSz/i4YCAUm95Dc8VgU2xsbGN6J7TQEhIIhE6AUAOhhBKKIVQbTLHBYDDFxricCSUEAiGYGtMPc7ot8q' +
    'nsvM9o5n1fIAtuJ2l35/v9fP6f//M8pvj2tDPzW+3OjgEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
    'AAAAAAAAAAAAAAAAAAAAAAwQpJqB6AG5ubm9uv1eofleX5gtDeMdf1iHGsmZpcmSbIr6h/GflH022N9sdPpfCNmANSQsAAw4rIsu1psj4oL/wfHfuvV' +
    '4RXzvVgnraysvGVhYeHicgRAHQgLACOqCgnPjpDw+NhnVodXzVKSJO9fXl5+foSGH1czAEZYo9oBGCERFB4dIeHjUR4ea9Pq8Korzhm3Hh8ff/zk5OT' +
    'Y4uLiBdH3Vv8JACPJbxYARsheYXl5+V1RHltO1k6EkQt7vd79/ZYBYHQJCwAjYnZ2dv+4eD89yhuVk3Xxi/Hx8eN27dp1YdUDMEKEBYAREEHhBhEUzo' +
    '5y33KyrlpJkhzVarXOq3oARoSwADDkpqenr91oNM6P8lrlZEO0IqzcpdvtfqXqARgB49UOwHCaiqBwWuwbGRQK2fj4+Klpmm6tegBGgLAAMMSyLPuH2' +
    'G5TdhuuCCxvK0sARoFbpwIMqQgKB+Z5XlycD9JbSm+8adOmi5aWlnzrM8AI8JsFgOGU9Hq918Q+cMfxJEleHtue+BI4ADaYsAAwhLIsOzYuyu9YtYPm' +
    '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' +
    'AAGEFjY/8HMiY8SXt55/UAAAAASUVORK5CYII=';
