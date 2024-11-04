import { TestBed } from '@angular/core/testing';

import { DvdecodGraphService } from './dvdecod-graph.service';

describe('DvdecodGraphService', () => {
  let service: DvdecodGraphService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DvdecodGraphService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
