import { TestBed } from '@angular/core/testing';

import { DvdecodBarGraphService } from './dvdecod-bar-graph.service';

describe('DvdecodBarGraphService', () => {
  let service: DvdecodBarGraphService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DvdecodBarGraphService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
