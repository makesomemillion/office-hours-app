import { TestBed, async, inject } from '@angular/core/testing';

import { InstructorGuard } from './instructor.guard';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('InstructorGuard', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [InstructorGuard],
            imports: [HttpClientModule, RouterTestingModule]
        });
    });

    it('should ...', inject([InstructorGuard], (guard: InstructorGuard) => {
        expect(guard).toBeTruthy();
    }));
});
