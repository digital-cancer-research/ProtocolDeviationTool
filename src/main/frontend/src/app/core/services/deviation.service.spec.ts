import { TestBed } from '@angular/core/testing';

import { DeviationService } from './deviation.service';

describe('DeviationService', () => {
  let service: DeviationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeviationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
