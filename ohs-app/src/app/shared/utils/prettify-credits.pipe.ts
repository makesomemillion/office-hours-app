import { Pipe, PipeTransform } from '@angular/core';
import { Credits } from 'src/app/shared/models/course-offering.model';

@Pipe({ name: 'prettifyCredits' })
export class PrettifyCreditsPipe implements PipeTransform {
    transform(credits: Credits): string {
        switch (credits) {
            case Credits.HALF_CREDIT:
                return 'Half-credit (0.5)';
            case Credits.FULL_CREDIT:
                return 'Full-credit (1.0)';
        }
    }
}
