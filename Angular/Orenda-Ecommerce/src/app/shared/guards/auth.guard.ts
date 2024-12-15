import { CanMatchFn, Router } from '@angular/router';
import { of } from 'rxjs';
import { getCookie } from '../../helpers/helpers';
import { inject } from '@angular/core';

export const authCanMatchGuard: CanMatchFn = (route, state) => {
  const router = inject(Router);
  if (!isAuthenticated()) {
    router.navigate(['/login']);
  }
  return of(true);
};

function isAuthenticated(): boolean {
  const token = getCookie('token');
  return !!token;
}
