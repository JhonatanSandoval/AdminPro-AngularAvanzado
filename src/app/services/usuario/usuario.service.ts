import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {
    usuario: Usuario;
    token: string;
    menu: any = [];

    constructor(
        private http: HttpClient,
        private router: Router,
        private subirArhivoService: SubirArchivoService
    ) {
        this.cargarStorage();
        console.log('Servicio de usuario listo !');
    }

    renuevaToken() {
        return this.http
            .get(`${URL_SERVICIOS}/login/renueva-token?token=${this.token}`)
            .pipe(
                map((resp: any) => {
                    console.log('token renovado', resp);

                    this.token = resp.token;
                    localStorage.setItem('token', this.token);
                    return true;
                }),
                catchError(err => {
                    Swal.fire(
                        'No se pudo renovar token',
                        'No fue posible renovar el token',
                        'error'
                    );
                    this.router.navigate(['/login']);
                    throw err;
                })
            )
            .toPromise();
    }

    logout() {
        this.usuario = null;
        this.token = null;
        this.menu = [];

        localStorage.removeItem('token');
        localStorage.removeItem('_id');
        localStorage.removeItem('usuario');
        localStorage.removeItem('menu');

        this.router.navigate(['/login']);
    }

    isLogged() {
        return this.token !== null && this.token.length > 5 ? true : false;
    }

    cargarStorage() {
        if (localStorage.getItem('token')) {
            this.token = localStorage.getItem('token');
            this.usuario = JSON.parse(localStorage.getItem('usuario'));
            this.menu = JSON.parse(localStorage.getItem('menu'));
        } else {
            this.token = '';
            this.usuario = null;
            this.menu = [];
        }
    }

    loginGoogle(token: string) {
        return this.http
            .post(`${URL_SERVICIOS}/login/google`, { token })
            .pipe(
                map(
                    (response: any) => {
                        this.guardarStorage(
                            response.usuario._id,
                            response.token,
                            response.usuario,
                            response.menu
                        );
                        this.cargarStorage();

                        Swal.fire('Bienvenido', '', 'success');
                        window.location.href = '#/dashboard';
                    },
                    (err: any) =>
                        Swal.fire('Oopss... !!', err.error.mensaje, 'error')
                )
            )
            .toPromise();
    }

    login(usuario: Usuario, recordar: boolean) {
        return this.http
            .post(`${URL_SERVICIOS}/login`, usuario)
            .pipe(
                map(
                    (response: any) => {
                        if (recordar) {
                            localStorage.setItem('email', usuario.email);
                        }
                        this.guardarStorage(
                            response.usuario._id,
                            response.token,
                            response.usuario,
                            response.menu
                        );
                        this.cargarStorage();
                        Swal.fire('Bienvenido', '', 'success');
                        this.router.navigate(['/dashboard']);
                    },
                    (err: any) =>
                        Swal.fire('Oopss... !!', err.error.mensaje, 'error')
                ),
                catchError(error => {
                    Swal.fire(
                        'Error en el acceso',
                        error.error.mensaje,
                        'error'
                    );
                    throw error;
                })
            )
            .toPromise();
    }

    guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {
        localStorage.setItem('token', token);
        localStorage.setItem('_id', id);
        localStorage.setItem('usuario', JSON.stringify(usuario));
        localStorage.setItem('menu', JSON.stringify(menu));
    }

    crearUsuario(usuario: Usuario) {
        return this.http
            .post(`${URL_SERVICIOS}/usuarios/agregar`, usuario)
            .pipe(
                map((response: any) => {
                    Swal.fire(
                        'Bienvenido',
                        'Usuario creado correctamente',
                        'success'
                    );
                    this.router.navigate(['/login']);
                }),
                catchError(err => {
                    console.log(err.error.err.message);

                    Swal.fire(
                        err.error.mensaje,
                        err.error.err.message,
                        'error'
                    );
                    throw err;
                })
            )
            .toPromise();
    }

    actualizarUsuario(usuario: Usuario) {
        return this.http
            .put(
                `${URL_SERVICIOS}/usuarios/actualizar?token=${this.token}`,
                usuario
            )
            .pipe(
                map((response: any) => {
                    Swal.fire('Usuario actualizado', usuario.nombre, 'success');
                    if (usuario._id == this.usuario._id) {
                        this.guardarStorage(
                            usuario._id,
                            this.token,
                            response.usuario,
                            this.menu
                        );
                    }
                })
            )
            .toPromise();
    }

    cambiarImagen(imagen: File, id: string) {
        return this.subirArhivoService
            .subirArchivo(imagen, 'usuarios', id)
            .then((resp: any) => {
                this.usuario.img = resp.usuarioActualizado.img;
                Swal.fire('Imagen actualizado', this.usuario.nombre, 'success');
                this.guardarStorage(
                    this.usuario._id,
                    this.token,
                    this.usuario,
                    this.menu
                );
            })
            .catch((err: any) => {
                console.log(err);
            });
    }

    cargarUsuarios(desde: number) {
        return this.http.get(`${URL_SERVICIOS}/usuarios?desde=${desde}`);
    }

    buscarUsuarios(termino: string) {
        return this.http.get(
            `${URL_SERVICIOS}/busqueda/coleccion/usuarios/${termino}`
        );
    }

    borrarUsuario(id: string) {
        return this.http
            .delete(
                `${URL_SERVICIOS}/usuarios/eliminar/${id}/?token=${this.token}`
            )
            .pipe(
                map(resp => {
                    Swal.fire(
                        'Usuario borrado',
                        'El usuario ha sido eliminado correctamente'
                    );
                })
            )
            .toPromise();
    }
}
