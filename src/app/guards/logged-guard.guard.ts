import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionService } from '../services/session.service';

export const loggedGuardGuard: CanActivateFn = (route, state) => {
  const session = inject(SessionService);
  const router = inject(Router);

  if(!session.isSessionActive()){
    router.navigateByUrl("/");
  }

  return session.isSessionActive();
};
