import { TestBed } from '@angular/core/testing';

import { StudyBarGraphService } from './study-bar-graph.service';

describe('StudyBarGraphService', () => {
  let service: StudyBarGraphService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudyBarGraphService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
