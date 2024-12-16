import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { of } from 'rxjs';
import { getCookie } from '../../helpers/helpers';
import { inject } from '@angular/core';

export const authCanMatchGuard: CanMatchFn = (route, state) => {
  const router = inject(Router);
  if (!isAuthenticated()) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};

export const authConfirmOTP: CanActivateFn = (route, state) => {
  const email = route.queryParams['email'];
  if (!email) {
    const router = inject(Router);
    router.navigate(['/forgot-password']);
    return false;
  }
  return true;
};

function isAuthenticated(): boolean {
  const token = getCookie('token');
  return !!token;
}
