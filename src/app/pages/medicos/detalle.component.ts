import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Hospital } from '../../models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { MedicoService } from '../../services/medico/medico.service';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../componentes/modal-upload/modal-upload.service';

@Component({
    selector: 'app-detalle',
    templateUrl: './detalle.component.html',
    styles: []
})
export class MedicoDetalleComponent implements OnInit {
    hospitales: Hospital[] = [];
    hospital: Hospital = new Hospital('');
    medico: Medico = new Medico('', '', '', '', '');

    constructor(
        private hospitalService: HospitalService,
        private medicoService: MedicoService,
        private route: Router,
        private activatedRoute: ActivatedRoute,
        private modalUploadService: ModalUploadService
    ) {
        this.activatedRoute.params.subscribe(params => {
            const id = params['id'];
            if (id !== 'nuevo') {
                this.cargarMedico(id);
            }
        });
    }

    ngOnInit() {
        this.hospitalService
            .cargarHospitales()
            .subscribe((resp: any) => (this.hospitales = resp.hospitales));

        this.modalUploadService.notificacion.subscribe(resp => {
            this.medico.img = resp.medicoActualizado.img;
        });
    }

    cargarMedico(id: string) {
        this.medicoService.obtenerMedicoPorId(id).subscribe((resp: any) => {
            this.medico = resp.medico;
            this.medico.hospital = resp.medico.hospital._id;
            this.cambioHospital(this.medico.hospital);
        });
    }

    guardarMedico(f: NgForm) {
        console.log(f);
        if (f.invalid) {
            return;
        }
        if (this.medico._id) {
            console.log('actualizar medico');
            this.medicoService
                .actualizarMedico(this.medico)
                .subscribe((resp: any) => {
                    Swal.fire(
                        'Médico actualizado',
                        'Se ha actualizado al médico ' + this.medico.nombre,
                        'success'
                    );
                    this.route.navigate(['/medicos']);
                });
        } else {
            console.log('crear nuevo medico');

            this.medicoService
                .guardarMedico(this.medico)
                .subscribe((resp: any) => {
                    Swal.fire(
                        'Médico creado',
                        'Se ha registrado al médico ' + this.medico.nombre,
                        'success'
                    );
                    this.route.navigate(['/medico', resp.medico._id]);
                });
        }
    }

    cambioHospital(id: string) {
        if (id !== '') {
            this.hospitalService.obtenerHospital(id).subscribe((resp: any) => {
                this.hospital = resp.hospital;
            });
        }
    }

    cambiarFoto() {
        this.modalUploadService.mostrarModal('medicos', this.medico._id);
    }
}
