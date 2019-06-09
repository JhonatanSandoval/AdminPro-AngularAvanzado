import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { SubirArchivoService } from '../../services/subir-archivo/subir-archivo.service';
import { ModalUploadService } from '../../componentes/modal-upload/modal-upload.service';

@Component({
    selector: 'app-modal-upload',
    templateUrl: './modal-upload.component.html',
    styles: []
})
export class ModalUploadComponent implements OnInit {
    imagenSubir: File;
    imagenTemp: string | ArrayBuffer;

    constructor(
        private subirArchivoService: SubirArchivoService,
        public modalUploadService: ModalUploadService
    ) {}

    ngOnInit() {}

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

    subirImagen() {
        this.subirArchivoService
            .subirArchivo(
                this.imagenSubir,
                this.modalUploadService.tipo,
                this.modalUploadService.id
            )
            .then(resp => {
                console.log(resp);
                this.modalUploadService.notificacion.emit(resp);
                this.cerrarModal();
            })
            .catch(err => console.log(err));
    }

    cerrarModal() {
        this.imagenTemp = null;
        this.imagenSubir = null;
        this.modalUploadService.ocultarModal();
    }
}
