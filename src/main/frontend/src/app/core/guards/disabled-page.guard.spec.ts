import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { disabledPageGuard } from './disabled-page.guard';

describe('disabledPageGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => disabledPageGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
