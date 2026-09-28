import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.getAccessToken()) {
    return true;
  }

  // chưa login → đá về trang login, kèm returnUrl để redirect lại sau khi login xong
  router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  return false;
};