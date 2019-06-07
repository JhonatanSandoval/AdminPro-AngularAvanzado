import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Usuario } from '../../models/usuario.model';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../componentes/modal-upload/modal-upload.service';

@Component({
    selector: 'app-usuarios',
    templateUrl: './usuarios.component.html',
    styles: []
})
export class UsuariosComponent implements OnInit {
    usuarios: Usuario[] = [];
    desde = 0;
    totalRegistros = 0;
    cargando: boolean = true;

    constructor(
        private usuarioService: UsuarioService,
        private modalUploadService: ModalUploadService
    ) {}

    ngOnInit() {
        this.cargarUsuarios();
        this.modalUploadService.notificacion.subscribe(() => {
            this.cargarUsuarios();
        });
    }

    mostrarModal(id: string) {
        this.modalUploadService.mostrarModal('usuarios', id);
    }

    cargarUsuarios() {
        this.usuarioService
            .cargarUsuarios(this.desde)
            .subscribe((resp: any) => {
                this.usuarios = resp.usuarios;
                this.totalRegistros = resp.total;
                this.cargando = false;
            });
    }

    cambiarDesde(valor: number) {
        const desde = this.desde + valor;
        if (desde >= this.totalRegistros) {
            return;
        }
        if (desde < 0) {
            return;
        }
        this.desde += valor;
        this.cargarUsuarios();
    }

    buscarUsuario(termino: string) {
        if (termino && termino.length > 0) {
            this.usuarioService
                .buscarUsuarios(termino)
                .subscribe((resp: any) => {
                    console.log(resp);

                    this.usuarios = resp.usuarios;
                    this.totalRegistros = resp.usuarios.length;
                    this.cargando = false;
                });
        } else {
            this.cargarUsuarios();
        }
    }

    borrarUsuario(usuario: Usuario) {
        if (usuario._id === this.usuarioService.usuario._id) {
            Swal.fire(
                'No puede borrar usuario',
                'No se puede borrar a sí mismo',
                'error'
            );
            return;
        }
        Swal.fire({
            title: '¿Está seguro?',
            text: 'Esta a apunto de eliminar a ' + usuario.nombre,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'Cancelar'
        }).then(result => {
            if (result.value) {
                this.usuarioService.borrarUsuario(usuario._id).then(() => {
                    this.cargarUsuarios();
                    window.location.reload();
                });
            }
        });
    }

    guardarUsuario(usuario: Usuario) {
        this.usuarioService.actualizarUsuario(usuario);
    }
}
