import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Medico } from '../../models/medico.model';

@Injectable({
    providedIn: 'root'
})
export class MedicoService {
    token: string = '';
    constructor(private http: HttpClient) {
        if (localStorage.getItem('token')) {
            this.token = localStorage.getItem('token');
        }
    }

    cargarMedicos() {
        return this.http.get(`${URL_SERVICIOS}/medicos?token=`);
    }

    obtenerMedicoPorId(id: string) {
        return this.http.get(
            `${URL_SERVICIOS}/medicos/${id}?token=${this.token}`
        );
    }

    buscarMedicos(termino: string) {
        return this.http.get(
            `${URL_SERVICIOS}/busqueda/coleccion/medicos/${termino}`
        );
    }

    borrarMedico(id: string) {
        return this.http
            .delete(
                `${URL_SERVICIOS}/medicos/eliminar/${id}?token=${this.token}`
            )
            .pipe(
                map(resp => {
                    Swal.fire(
                        'Médico borrado',
                        'El médico ha sido eliminado correctamente'
                    );
                })
            )
            .toPromise();
    }

    guardarMedico(medico: Medico) {
        return this.http.post(
            `${URL_SERVICIOS}/medicos/agregar?token=${this.token}`,
            {
                nombre: medico.nombre,
                hospital_id: medico.hospital
            }
        );
    }

    actualizarMedico(medico: Medico) {
        return this.http.put(
            `${URL_SERVICIOS}/medicos/actualizar?token=${this.token}`,
            medico
        );
    }
}
