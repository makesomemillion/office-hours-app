export interface PersonModel {
    _id: string;
    firstName: string;
    lastName: string;
    accessLevel: AccessLevel;
    username: string;
    password: string;
    email: string;
    token: string;
}

export enum AccessLevel {
    STUDENT = 'student',
    TEACHING_ASSISTANT = 'teachingAssistant',
    INSTRUCTOR = 'instructor'
}
