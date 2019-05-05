export interface BlockModel {
    _id: string;
    start: Date;
    duration: number;
    meetingDuration: number;
    courseSections: Array<string>;
    repeating: RepetitionInterval;
    end: Date;
    exceptions: Array<Date>;
}

export enum RepetitionInterval {
    NONE = 'none',
    WEEKLY = 'weekly',
    BIWEEKLY = 'biweekly'
}
