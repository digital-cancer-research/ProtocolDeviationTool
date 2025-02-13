import { TestBed } from '@angular/core/testing';

import { DataTrailService } from './data-trail.service';

describe('DataTrailService', () => {
  let service: DataTrailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataTrailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
