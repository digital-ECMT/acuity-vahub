import {Injectable} from '@angular/core';

@Injectable()
export class PatientDataTrackUtils {

    public static PATIENTDATA_TRACK_NAME = 'Patient data';
    public static PATIENTDATA_SUMMARY_SUB_TRACK_NAME = 'Summary';

    // COLOURS
    public static ONE_EVENT_COLOUR = '#99D9EA';
    public static TWO_TO_FIVE_EVENT_COLOR = '#00A2E8';
    public static SIX_TO_TEN_EVENT_COLOR = '#3030DC';
    public static TEN_EVENT_COLOR = '#05076B';
    public static LINECHART_LEVEL_COLOR = '#7CB5EC';

    // Expansion level
    public static TIMELINE_LEVEL_TRACK_EXPANSION_LEVEL = 1;
    public static LINECHART_LEVEL_TRACK_EXPANSION_LEVEL = 2;

    static assignColour(numberOfEvents: number, trackLevel: number): string {
        if (trackLevel === PatientDataTrackUtils.LINECHART_LEVEL_TRACK_EXPANSION_LEVEL) {
            return PatientDataTrackUtils.LINECHART_LEVEL_COLOR;
        }
        if (numberOfEvents <= 1) {
            return PatientDataTrackUtils.ONE_EVENT_COLOUR;
        }
        if (numberOfEvents > 1 && numberOfEvents <= 5) {
            return PatientDataTrackUtils.TWO_TO_FIVE_EVENT_COLOR;
        }
        if (numberOfEvents > 5 && numberOfEvents <= 10) {
            return PatientDataTrackUtils.SIX_TO_TEN_EVENT_COLOR;
        }
        if (numberOfEvents > 10) {
            return PatientDataTrackUtils.TEN_EVENT_COLOR;
        }

    }
}
