import {Pipe, PipeTransform} from '@angular/core';
import { Semester } from 'src/app/shared/models/course-offering.model';

@Pipe({name: 'prettifySemester'})
export class PrettifySemesterPipe implements PipeTransform {
    transform(semester: Semester): string {
        switch (semester) {
            case Semester.FALL:
                return 'Fall';
            case Semester.WINTER:
                return 'Winter';
            case Semester.FULL_YEAR:
                return 'Full year';
            case Semester.SUMMER_FIRST_TERM:
                return 'Summer – first term';
            case Semester.SUMMER_SECOND_TERM:
                return 'Summer – second term';
            case Semester.FULL_SUMMER:
                return 'Full summer';
        }
    }
}
