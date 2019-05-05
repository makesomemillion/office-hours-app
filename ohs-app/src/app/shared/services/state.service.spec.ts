import {TestBed} from '@angular/core/testing';

import {StateService} from './state.service';
import {RouterTestingModule} from '@angular/router/testing';

describe('StateService', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [RouterTestingModule]
        })
    );

    it('should be created', () => {
        const service: StateService = TestBed.get(StateService);
        expect(service).toBeTruthy();
    });
});
