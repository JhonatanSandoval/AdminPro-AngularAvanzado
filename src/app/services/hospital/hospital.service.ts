import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Hospital } from 'src/app/models/hospital.model';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class HospitalService {
    token: string;

    constructor(private http: HttpClient) {
        if (localStorage.getItem('token')) {
            this.token = localStorage.getItem('token');
        } else {
            this.token = '';
        }
    }

    cargarHospitales() {
        return this.http.get(`${URL_SERVICIOS}/hospitales?token=${this.token}`);
    }

    obtenerHospital(id: string) {
        return this.http.get(
            `${URL_SERVICIOS}/hospitales/${id}?token=${this.token}`
        );
    }

    buscarHospital(termino: string) {
        return this.http.get(
            `${URL_SERVICIOS}/busqueda/coleccion/hospitales/${termino}`
        );
    }

    agregarHospital(hospital: Hospital) {
        return this.http.post(
            `${URL_SERVICIOS}/hospitales/agregar?token=${this.token}`,
            hospital
        );
    }

    actualizarHospital(hospital: Hospital) {
        return this.http
            .put(
                `${URL_SERVICIOS}/hospitales/actualizar?token=${this.token}`,
                hospital
            )
            .pipe(
                map(() =>
                    Swal.fire(
                        'Hospital actualizado',
                        hospital.nombre,
                        'success'
                    )
                )
            )
            .toPromise();
    }

    borrarHospital(id: string) {
        return this.http
            .delete(
                `${URL_SERVICIOS}/hospitales/eliminar/${id}/?token=${
                    this.token
                }`
            )
            .pipe(
                map(resp => {
                    Swal.fire(
                        'Hospital borrado',
                        'El hospital ha sido eliminado correctamente'
                    );
                })
            )
            .toPromise();
    }
}
