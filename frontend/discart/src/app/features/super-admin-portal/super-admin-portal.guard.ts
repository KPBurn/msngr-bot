import { CanActivateFn } from '@angular/router';

export const superAdminPortalGuard: CanActivateFn = (route, state) => {
  return true;
};
