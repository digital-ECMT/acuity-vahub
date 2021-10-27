import {TestBed} from '@angular/core/testing';
import {fromJS} from 'immutable';
import {TabId, TrellisCategory} from '../ITrellising';
import {ChordDiagramUtilsService} from './ChordDiagramUtilsService';

describe('GIVEN ChordDiagramUtilsService', () => {
    let service;
    const plots = fromJS([
        {
            data: [{
                'PT': {
                    colorBook: {
                        a: 'red',
                        b: 'blue',
                        c: 'pink'
                    },
                    data: [
                        {start: 'a', end: 'b', width: 2, contributors: {subject1: 1, subject2: 1}},
                        {start: 'a', end: 'c', width: 2, contributors: {subject1: 1, subject2: 1}},
                        {start: 'b', end: 'c', width: 2, contributors: {subject1: 1, subject2: 1}}
                    ]
                },
                'SOC': {
                    colorBook: {
                        a: 'black',
                        b: 'orange',
                        c: 'yellow'
                    },
                    data: [
                        {start: 'x', end: 'y', width: 3, contributors: {subject1: 2, subject2: 1}},
                        {start: 'x', end: 'z', width: 10, contributors: {subject1: 8, subject2: 3}},
                        {start: 'y', end: 'z', width: 15, contributors: {subject1: 10, subject2: 5}}
                    ]
                }
            }]
        }
    ]);
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ChordDiagramUtilsService],
        });

        service = TestBed.get(ChordDiagramUtilsService);
    });

    describe('WHEN extracting legend', () => {
        it('THEN SHOULD extract legend', () => {
            const trellises = fromJS([{
                category: TrellisCategory.NON_MANDATORY_SERIES,
                trellisedBy: 'PT'
            }]);
            expect(service.extractLegend(plots, TabId.AES_CHORD_DIAGRAM, trellises)).toEqual([
                {
                    title: 'PT',
                    entries: [
                        {
                            label: 'a',
                            color: 'red',
                            symbol: 'CIRCLE'
                        },
                        {
                            label: 'b',
                            color: 'blue',
                            symbol: 'CIRCLE'
                        },
                        {
                            label: 'c',
                            color: 'pink',
                            symbol: 'CIRCLE'
                        }
                    ]
                }]);
        });
    });
});
