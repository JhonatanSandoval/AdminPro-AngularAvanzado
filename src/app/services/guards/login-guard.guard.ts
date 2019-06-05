import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {
  constructor(public usuarioService: UsuarioService, private router: Router) {}

  canActivate() {
    if (this.usuarioService.isLogged()) {
      console.log('pasó por el guard');
      return true;
    } else {
      console.log('protegido por el guard');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
