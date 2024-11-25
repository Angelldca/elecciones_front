import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

import { Router } from '@angular/router';
import { AuthService } from '../oauth.service';


export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router)
  const requiredPermissions = route.data['expectedRoles'] as string[];
  const token = localStorage.getItem('Token')

  if(token){
    authService.validateToken(token).subscribe({
      next(data) {
      
      },
      error(err) {
        router.navigate(['/unauthorized']);
        return false
      },
    })
  }
  if (!authService.isAuthenticated()) {
    console.log("Usuario no autenticado")
    router.navigate(['/']);
    return false;
  }
  return true;
};
