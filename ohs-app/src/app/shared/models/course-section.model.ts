export interface CourseSectionModel {
    _id: string;
    courseOffering: string;
    activity: Activity;
    number: string;
    instructorsIds: Array<string>;
    teachingAssistantsIds: Array<string>;
    studentsIds: Array<string>;
}

export enum Activity {
    LECTURE = 'lecture',
    PRACTICAL = 'practical',
    TUTORIAL = 'tutorial'
}
