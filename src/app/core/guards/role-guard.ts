
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const userRole = authService.getRole();
  const allowedRoles = route.data['roles'] as string[] | undefined;

  if (!authService.isAuthenticated()) {
    return router.createUrlTree(['/login']);
  }

  if (userRole && allowedRoles?.includes(userRole)) {
    return true;
  }

  switch (userRole) {
    case 'INQUILINO':
      return router.createUrlTree(['/inquilino/dashboard']);

    case 'CASERO':
      return router.createUrlTree(['/casero/dashboard']);

    case 'ADMIN':
      // Se definirá el destino cuando conectemos las rutas de administración.
      return router.createUrlTree(['/']);

    default:
      authService.logout();
      return router.createUrlTree(['/login']);
  }
};
