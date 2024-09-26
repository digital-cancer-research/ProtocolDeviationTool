import { TestBed } from '@angular/core/testing';

import { DataVisualisationService } from './data-visualisation.service';

describe('DataVisualisationService', () => {
  let service: DataVisualisationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataVisualisationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
