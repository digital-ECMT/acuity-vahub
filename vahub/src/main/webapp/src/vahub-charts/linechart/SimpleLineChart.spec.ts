import {SimpleLineChart} from './SimpleLineChart';
import * as d3 from 'd3';
import createSpy = jasmine.createSpy;
import {getAllElementsBySelector, getTestOptions} from '../utils/test-utils';
import {fakeAsync, tick} from '@angular/core/testing';

const renderTo = document.createElement('div');

const click = createSpy('');
const select = createSpy('');

const testLineData = {
    type: 'simple-line',
    name: 'some name',
    color: 'red',
    data: [
        {
            x: 1,
            y: 1.0,
            color: 'red',
            category: 1
        }
    ]
};
const testTwoDotsLineData = {
    type: 'simple-line',
    name: 'some name',
    color: 'red',
    data: [
        {
            x: 1,
            y: 1.0,
            color: 'red',
            category: 1
        },
        {
            x: 2,
            y: 2,
            color: 'blue',
            category: 2
        }
    ]
};

describe('Simple-line chart', function () {
    let testChart;
    beforeEach(function () {
        const testOptions = getTestOptions('simple-line', renderTo, click, select);
        testChart = new SimpleLineChart(testOptions);
    });

    afterEach(function () {
        d3.selectAll('svg').remove();
    });

    describe('create chart', function () {
        it('should render svg', function () {
            const svg = d3.select(renderTo).select('#svg_test_id');
            expect(svg._groups[0].length).toEqual(1);
            expect(svg.attr('height')).toEqual('400');
            expect(svg.attr('width')).toEqual('100%');
        });

        it('should render title', function () {
            const title = renderTo.querySelector('.chart-title');
            expect(title).not.toBeNull();
            expect(title.innerHTML).toEqual('test title');
        });

        it('should render export button', function () {
            const btn = renderTo.querySelector('.custom-export');
            expect(btn).not.toBeNull();
        });
    });

    describe('create axis', function () {
        it('should render xAxis', function () {
            testChart.addSeries(testLineData);
            testChart.redraw();
            expect(getAllElementsBySelector('.x-axis', renderTo).length).toBe(1);
        });

        it('should render yAxis', function () {
            testChart.addSeries(testLineData);
            testChart.redraw();
            expect(getAllElementsBySelector('.y-axis', renderTo).length).toBe(1);
        });
    });

    describe('create chart elements', function () {
        describe('create dots', function () {
            it('should render one dot', function () {
                testChart.addSeries(testLineData);
                testChart.redraw();
                expect(getAllElementsBySelector('.marker', renderTo).length).toBe(1);
            });

            it('should render two dots', function () {
                testChart.addSeries(testTwoDotsLineData);
                testChart.redraw();
                expect(getAllElementsBySelector('.marker', renderTo).length).toBe(2);
            });
        });

        describe('create lines', function () {
            it('should render line', function () {
                testChart.addSeries(testTwoDotsLineData);
                testChart.redraw();
                expect(getAllElementsBySelector('.line-with-points', renderTo).length).toBe(1);
            });
        });
    });

    describe('dot selection', function () {
        it('should call select when bar is selected', fakeAsync(function () {
            testChart.addSeries(testLineData);
            testChart.redraw();
            const dot = d3.select(renderTo).select('.marker');
            dot.node().dispatchEvent(new MouseEvent('click', {}));
            tick(500);
            expect(select).toHaveBeenCalledTimes(1);
        }));
    });
});