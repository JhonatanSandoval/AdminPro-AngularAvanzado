import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';

declare function init_plugins();
@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    forma: FormGroup;

    constructor(
        private usuarioServie: UsuarioService,
        private router: Router
    ) {}

    ngOnInit() {
        init_plugins();

        this.forma = new FormGroup(
            {
                nombre: new FormControl(null, [Validators.required]),
                email: new FormControl(null, [
                    Validators.required,
                    Validators.email
                ]),
                password: new FormControl(null, [Validators.required]),
                password2: new FormControl(null, [Validators.required]),
                condiciones: new FormControl(false)
            },
            { validators: this.sonIguales('password', 'password2') }
        );

        this.forma.setValue({
            nombre: 'Test',
            email: 'test@test.com',
            password: '123',
            password2: '123',
            condiciones: false
        });
    }

    sonIguales(campo1: string, campo2: string) {
        return (group: FormGroup) => {
            const pass1 = group.controls[campo1].value;
            const pass2 = group.controls[campo2].value;

            if (pass1 === pass2) {
                return null;
            }

            return {
                sonIguales: true
            };
        };
    }

    registrarUsuario() {
        if (this.forma.invalid) {
            return;
        }

        if (!this.forma.value.condiciones) {
            Swal.fire(
                'Importante',
                'Debe de aceptar las condiciones',
                'warning'
            );
            return;
        }

        const usuario = new Usuario(
            this.forma.value.nombre,
            this.forma.value.email,
            this.forma.value.password
        );
        this.usuarioServie.crearUsuario(usuario);
    }
}
