import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { map } from 'rxjs';
import { UserService } from '../new/services/user.service';
import { Role } from '../new/services/models/user/role.enum';

export const deactivatedUserGuard: CanActivateFn = () => {
 
  const userService = inject(UserService);

  return userService.currentUser$.pipe(
    map(user => {
      if (user !== null) {
        if (user.role === Role.DEACTIVATED) {
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
