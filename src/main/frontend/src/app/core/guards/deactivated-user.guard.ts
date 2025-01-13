import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserService } from '../services/user.service';
import { map } from 'rxjs';

export const deactivatedUserGuard: CanActivateFn = () => {
 
  const userService = inject(UserService);

  return userService.currentUser$.pipe(
    map(user => {
      if (user !== null) {
        if (user.roleId === 3) {
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
    })
  );
};
