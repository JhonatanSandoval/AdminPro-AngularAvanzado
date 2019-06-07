import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styles: []
})
export class ProfileComponent implements OnInit {
    usuario: Usuario;
    imagenSubir: File;
    imagenTemp: string | ArrayBuffer;

    constructor(private usuarioService: UsuarioService) {}

    ngOnInit() {
        this.usuario = this.usuarioService.usuario;
    }

    guardar(usuario: Usuario) {
        this.usuario.nombre = usuario.nombre;
        if (!this.usuario.google) {
            this.usuario.email = usuario.email;
        }
        this.usuarioService.actualizarUsuario(this.usuario);
    }

    seleccionImagen(file: File) {
        if (file) {
            this.imagenSubir = file;

            if (file.type.indexOf('image/') < 0) {
                Swal.fire(
                    'Solo imágenes',
                    'El archivo seleccionado no es una imagen',
                    'error'
                );
                return;
            }

            const reader = new FileReader();
            const urlImagenTemp = reader.readAsDataURL(file);

            reader.onloadend = () => (this.imagenTemp = reader.result);
        }
    }

    cambiarImagen() {
        this.usuarioService.cambiarImagen(this.imagenSubir, this.usuario._id);
    }
}
