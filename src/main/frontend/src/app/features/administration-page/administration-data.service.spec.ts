import { TestBed } from '@angular/core/testing';

import { AdministrationDataService } from './administration-data.service';

describe('AdministrationDataService', () => {
  let service: AdministrationDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdministrationDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
