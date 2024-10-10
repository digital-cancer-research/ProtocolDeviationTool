import { TestBed } from '@angular/core/testing';

import { StudyDataService } from './study-data.service';

describe('StudyDataService', () => {
  let service: StudyDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudyDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
