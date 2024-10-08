import { TestBed } from '@angular/core/testing';

import { TeamPdDvdecodGraphService } from './team-pd-dvdecod-graph.service';

describe('TeamPdDvdecodGraphService', () => {
  let service: TeamPdDvdecodGraphService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamPdDvdecodGraphService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
