export interface EventMarker {
    symbol: string;
    fillColor: string;
    height?: number;
    width?: number;
}

export interface PlotOptions {
    color?: string;
    markerSymbol?: string;
    fillColor?: string;
    lineColor?: string;
    height?: number;
    width?: number;
    radius?: number;
}

export interface RawEventDate {
    date: number;
    dayHour: number;
    dayHourAsString: string;
    studyDayHourAsString: string;
    doseDayHour: number;
}

export interface RawEvent {
    group: string;
    type: string;
    start: RawEventDate;
    end?: RawEventDate;
    plotOptions?: PlotOptions;
    metadata?: any;
}

export interface PlotLine {
    value: number;
    color: string;
    zIndex?: number;
    width?: number;
    dashStyle?: string;
}

export interface PlotExtreme {
    min: number;
    max: number;
}

export interface BarChartSeriesOptions {
    name: string;
    data: any[];
    color?: string;
    type?: string;
}

export enum EventDateType {
    RUN_IN = 'Run-in',
    RANDOMIZED_DRUG = 'Randomised drug',
    ON_STUDY_DRUG = 'On study',
    INFORMED_CONSENT = 'Informed consent',
    SCREENING_VISIT = 'Screening visit (Labs)',
    LAST_VISIT = 'Last visit (Labs)',
    FIRST_DOSE = 'First dose',
    LAST_DOSE = 'Last dose',
    WITHDRAWAL_COMPLETION = 'Withdrawal/Completion',
    DEATH = 'Death',
    ONGOING = 'Ongoing',
    STEP3_ONGOING = 'Step3-Ongoing',
    RANDOMISATION = 'Randomisation',
    LAST_VISIT_END = 'Last visit'
}
