import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/medico/medico.service';
import { ModalUploadService } from '../../componentes/modal-upload/modal-upload.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-medicos',
    templateUrl: './medicos.component.html',
    styles: []
})
export class MedicosComponent implements OnInit {
    medicos: Medico[] = [];
    totalRegistros = 0;
    cargando = false;

    constructor(
        private medicoService: MedicoService,
        private modalUploadService: ModalUploadService
    ) {}

    ngOnInit() {
        this.cargarMedicos();
        this.modalUploadService.notificacion.subscribe(() =>
            this.cargarMedicos()
        );
    }

    buscarMedicos(termino: string) {
        if (termino && termino.length > 0) {
            this.cargando = true;
            this.medicoService.buscarMedicos(termino).subscribe((resp: any) => {
                this.medicos = resp.medicos;
                this.totalRegistros = resp.medicos.length;
                this.cargando = false;
            });
        } else {
            this.cargarMedicos();
        }
    }

    mostrarModal(id: string) {
        this.modalUploadService.mostrarModal('medicos', id);
    }

    cargarMedicos() {
        this.cargando = true;
        this.medicoService.cargarMedicos().subscribe((resp: any) => {
            console.log(resp);

            this.medicos = resp.medicos;
            this.totalRegistros = resp.total;
            this.cargando = false;
        });
    }

    borrarMedico(medico: Medico) {
        Swal.fire({
            title: '¿Está seguro?',
            text: 'Esta a apunto de eliminar a ' + medico.nombre,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'Cancelar'
        }).then(result => {
            if (result.value) {
                this.medicoService.borrarMedico(medico._id).then(() => {
                    this.cargarMedicos();
                });
            }
        });
    }
}
