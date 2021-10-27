import {StackedBarChart} from './barchart/StackedBarChart';
import {UserOptions} from './types/interfaces';
import {GroupedBarChart} from './barchart/GroupedBarChart';
import {ColumnRangeChart} from './barchart/ColumnRangeChart';
import {TimelineBarChart} from './timeline/TimelineBarChart';
import {ScatterChart} from './scatterchart/ScatterChart';
import {TimelineLineChart} from './timeline/TimelineLineChart';
import {TimelineAxis} from './timeline/TimelineAxis';
import {HeatMapChart} from './heatmap/HeatMapChart';
import {RangeChart} from './linechart/RangeChart';
import {SimpleLineChart} from './linechart/SimpleLineChart';
import {ShiftChart} from './shiftchart/ShiftChart';
import {LineChart} from './linechart/LineChart';
import {BoxPlot} from './boxplot/BoxPlot';
import {ChordDiagram} from './chord/ChordDiagram';
import {BarLineChart} from './barchart/BarLineChart';

export * from './Chart';

export type VahubChart =
    ColumnRangeChart
    | StackedBarChart
    | GroupedBarChart
    | ScatterChart
    | HeatMapChart
    | TimelineBarChart
    | TimelineLineChart
    | RangeChart
    | SimpleLineChart
    | ShiftChart
    | LineChart
    | BoxPlot
    | ChordDiagram
    | BarLineChart
    | TimelineAxis;


export const chart = (options: UserOptions) => {
    switch (options.chart.type) {
        case 'stacked-bar-plot':
        case 'waterfall':
            return new StackedBarChart(options);
        case 'grouped-bar-plot':
            return new GroupedBarChart(options);
        case 'columnrange':
            return new ColumnRangeChart(options);
        case 'scatter':
            return new ScatterChart(options);
        case 'heatmap':
            return new HeatMapChart(options);
        case 'timeline-barchart':
            return new TimelineBarChart(options);
        case 'timeline-linechart':
            return new TimelineLineChart(options);
        case 'timeline-xaxis':
            return new TimelineAxis(options);
        case 'range':
            return new RangeChart(options);
        case 'boxplot':
            return new BoxPlot(options);
        case 'simple-line':
            return new SimpleLineChart(options);
        case 'errorbar':
            return new ShiftChart(options);
        case 'line':
            return new LineChart(options);
        case 'chord':
            return new ChordDiagram(options);
        case 'barline':
            return new BarLineChart(options);
        default:
            return null;
    }
};
