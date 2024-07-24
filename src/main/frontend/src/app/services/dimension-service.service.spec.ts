import { TestBed } from '@angular/core/testing';

import { DimensionService } from './dimension-service.service';

describe('DimensionServiceService', () => {
  let service: DimensionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DimensionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
