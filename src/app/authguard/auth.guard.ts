import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AdminService } from '../services/admin/admin.service';

export const authGuard: CanActivateFn = (route, state) => {
  let admin = inject(AdminService);
  let router = inject(Router);
  if (admin.iadminloggedin()) {
    return true;
  }
  alert('You are not logged in as admin redirecting to home page');
  router.navigate(['']);
  return admin.iadminloggedin();
};
