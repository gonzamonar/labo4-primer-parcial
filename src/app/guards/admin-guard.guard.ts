import { CanActivateFn, Router } from '@angular/router';
import { SessionService } from '../services/session.service';
import { inject } from '@angular/core';

export const adminGuardGuard: CanActivateFn = (route, state) => {
  const session = inject(SessionService);
  const router = inject(Router);

  if(!session.isAdminLevelSession()){
    router.navigateByUrl("/");
  }

  return session.isAdminLevelSession();
};
