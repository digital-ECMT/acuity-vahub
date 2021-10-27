import {async, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {Map} from 'immutable';

import {
    MockStudyService,
    MockTrellising,
    MockTrellisingDispatcher,
    MockTrellisingObservables
} from '../../../../common/MockClasses';
import {CapitalizePipe, SentenceCasePipe, SettingsPipe} from '../../../../common/pipes';
import {TrellisingDispatcher} from '../../../../common/trellising/store/dispatcher/TrellisingDispatcher';
import {TrellisingObservables} from '../../../../common/trellising/store/observable/TrellisingObservables';
import {Trellising} from '../../../../common/trellising/store/Trellising';
import {ListSelectionComponent} from '../../list-selection/ListSelectionComponent';
import {RadioButtonsSettingsComponent} from '../../radioButtons/RadioButtonsSettingsComponent';
import {ExposureSettingsComponent} from './ExposureSettingsComponent';
import {StudyService} from '../../../../common/StudyService';
import {PlotSettings} from '../../../../common/trellising/store';

describe('Given a control component', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            providers: [
                {provide: Trellising, useClass: MockTrellising},
                {provide: TrellisingObservables, useClass: MockTrellisingObservables},
                {provide: TrellisingDispatcher, useClass: MockTrellisingDispatcher},
                {provide: StudyService, useClass: MockStudyService}
            ],
            declarations: [ExposureSettingsComponent, RadioButtonsSettingsComponent, CapitalizePipe,
                SentenceCasePipe, ListSelectionComponent, SettingsPipe]
        });
    });

    describe('WHEN line aggregation selection setting is applied', () => {
        it('THEN trellising is updated correctly',
            async(() => {
                TestBed.compileComponents().then(() => {
                    const component = TestBed.createComponent(ExposureSettingsComponent);
                    spyOn(component.componentInstance.trellisingMiddleware, 'updatePlotSettings');
                    const currentSelectedErrorBars = Map({STANDARD_DEVIATION: false});
                    const currentPlotSettings = Map({
                        trellisedBy: 'FIRST_TRELLISING',
                        category: 'NON_MANDATORY_SERIES',
                        trellisOptions: ['d', 'e', 'f'],
                        errorBars: currentSelectedErrorBars
                    }) as PlotSettings;
                    component.componentInstance.plotSettings = currentPlotSettings;
                    component.componentInstance.selectedPlotSettings = component.componentInstance.plotSettings;
                    component.componentInstance.selectedErrorBars = currentSelectedErrorBars;
                    const appliedAggregation = 'FIRST_TRELLISING';
                    component.componentInstance.setSelectedAggregation({
                        currentOption: currentPlotSettings,
                        selectedValue: appliedAggregation
                    });
                    component.componentInstance.apply();

                    expect(component.componentInstance.trellisingMiddleware.updatePlotSettings).toHaveBeenCalled();
                });
            }));
    });

});
