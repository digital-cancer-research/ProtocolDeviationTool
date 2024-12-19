import { CanActivateFn } from '@angular/router';

export const disabledPageGuard: CanActivateFn = () => {
  return false;
};
