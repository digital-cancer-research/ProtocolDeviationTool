import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { deactivatedUserGuard } from './deactivated-user.guard';

describe('deactivatedUserGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => deactivatedUserGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
