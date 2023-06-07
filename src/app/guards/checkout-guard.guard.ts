import { CanActivateFn, Router } from '@angular/router';
import { AppService } from '../app.service';
import { inject } from '@angular/core';

export const checkoutGuard: CanActivateFn = (childRoute, state) => {
  const appService = inject(AppService);
  const router = inject(Router);

  if (appService.getCartTotal() === 0) {
    return router.parseUrl('/');
  }
  return true;
};
