import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {
    constructor(
        private usuarioServicio: UsuarioService,
        private router: Router
    ) {}

    canActivate(): Promise<boolean> | boolean {
        console.log('inicio VerificaTokenGuard');

        const token = this.usuarioServicio.token;
        const payload = JSON.parse(atob(token.split('.')[1]));

        if (this.expirado(payload.exp)) {
            this.router.navigate(['/login']);
            return false;
        }

        return this.verificaRenueva(payload.exp);
    }

    verificaRenueva(fechaExp: number): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const tokenExp = new Date(fechaExp * 1000);
            const ahora = new Date();

            const horasMinima = 4;
            ahora.setTime(ahora.getTime() + horasMinima * 60 * 60 * 1000);

            if (tokenExp.getTime() > ahora.getTime()) {
                resolve(true);
            } else {
                this.usuarioServicio
                    .renuevaToken()
                    .then((resp: any) => {
                        resolve(true);
                    })
                    .catch(() => reject(false));
            }

            resolve(true);
        });
    }

    expirado(fechaExp: number) {
        const ahora = new Date().getTime() / 1000;
        if (fechaExp < ahora) {
            return true;
        }
        return false;
    }
}
