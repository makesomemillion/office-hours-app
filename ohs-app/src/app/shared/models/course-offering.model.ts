export interface CourseOfferingModel {
    _id: string;
    course: string;
    year: number;
    semester: Semester;
    credits: Credits;
}

export enum Semester {
    WINTER = 'winter',
    FALL = 'fall',
    FULL_YEAR = 'fullYear',
    SUMMER_FIRST_TERM = 'summerFirstTerm',
    SUMMER_SECOND_TERM = 'summerSecondTerm',
    FULL_SUMMER = 'fullTerm'
}

export enum Credits {
    HALF_CREDIT = 'halfCredit',
    FULL_CREDIT = 'fullCredit'
}
