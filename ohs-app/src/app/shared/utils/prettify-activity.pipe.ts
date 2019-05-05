import { Pipe, PipeTransform } from '@angular/core';
import { Activity } from 'src/app/shared/models/course-section.model';

@Pipe({ name: 'prettifyActivity' })
export class PrettifyActivityPipe implements PipeTransform {
    transform(activity: Activity): string {
        switch (activity) {
            case Activity.LECTURE:
                return 'Lecture (LEC)';
            case Activity.PRACTICAL:
                return 'Practical (PRA)';
            case Activity.TUTORIAL:
                return 'Tutorial (TUT)';
        }
    }
}
