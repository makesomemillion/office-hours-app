export interface MeetingModel {
    _id: string;
    start: Date;
    duration: number;
    isCancelled: boolean;
    teachingStaff: Array<string>;
    students: Array<string>;
    courseSection: string;
    comments: Array<string>;
    notes: Array<string>;
}
