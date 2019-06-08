import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/hospital/hospital.service';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../componentes/modal-upload/modal-upload.service';

@Component({
    selector: 'app-hospitales',
    templateUrl: './hospitales.component.html',
    styles: []
})
export class HospitalesComponent implements OnInit {
    cargando = false;
    desde = 0;
    totalRegistros = 0;

    hospitales: Hospital[] = [];

    constructor(
        private hospitalService: HospitalService,
        private modalUploadService: ModalUploadService
    ) {}

    ngOnInit() {
        this.cargarHospitales();
        this.modalUploadService.notificacion.subscribe(() => {
            this.cargarHospitales();
        });
    }

    cargarHospitales() {
        this.hospitalService.cargarHospitales().subscribe((resp: any) => {
            this.hospitales = resp.hospitales;
            this.totalRegistros = resp.total;
        });
    }

    agregarHospital() {
        Swal.fire({
            title: 'Agregar Hospital',
            text: 'Ingrese el nombre del hospital',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
            showLoaderOnConfirm: false,
            allowOutsideClick: () => !Swal.isLoading()
        }).then(result => {
            if (result.value) {
                const hospital = new Hospital(result.value);
                this.hospitalService
                    .agregarHospital(hospital)
                    .subscribe(resp => this.cargarHospitales());
            }
        });
    }

    buscarHospital(termino: string) {
        if (termino && termino.length > 0) {
            this.hospitalService
                .buscarHospital(termino)
                .subscribe((resp: any) => {
                    this.hospitales = resp.hospitales;
                    this.totalRegistros = resp.hospitales.length;
                    this.cargando = false;
                });
        } else {
            this.cargarHospitales();
        }
    }

    guardarHospital(hospital: Hospital) {
        this.hospitalService.actualizarHospital(hospital);
    }

    borrarHospital(hospital: Hospital) {
        Swal.fire({
            title: '¿Está seguro?',
            text: 'Esta a apunto de eliminar a ' + hospital.nombre,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'Cancelar'
        }).then(result => {
            if (result.value) {
                this.hospitalService.borrarHospital(hospital._id).then(() => {
                    this.cargarHospitales();
                });
            }
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
        this.cargarHospitales();
    }

    mostrarModal(id: string) {
        this.modalUploadService.mostrarModal('hospitales', id);
    }
}
