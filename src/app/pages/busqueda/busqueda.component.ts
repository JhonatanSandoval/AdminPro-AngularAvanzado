import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Usuario } from 'src/app/models/usuario.model';
import { Medico } from '../../models/medico.model';
import { Hospital } from '../../models/hospital.model';

@Component({
    selector: 'app-busqueda',
    templateUrl: './busqueda.component.html',
    styles: []
})
export class BusquedaComponent implements OnInit {
    usuarios: Usuario[] = [];
    medicos: Medico[] = [];
    hospitales: Hospital[] = [];

    constructor(
        private activatedRoute: ActivatedRoute,
        private http: HttpClient
    ) {
        this.activatedRoute.params.subscribe(params => {
            this.buscar(params['termino']);
        });
    }

    ngOnInit() {}

    buscar(termino: string) {
        this.http
            .get(`${URL_SERVICIOS}/busqueda/todo/${termino}`)
            .subscribe((resp: any) => {
                this.usuarios = resp.usuarios;
                this.medicos = resp.medicos;
                this.hospitales = resp.hospitales;
            });
    }
}
