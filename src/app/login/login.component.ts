import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../models/usuario.model';
import Swal from 'sweetalert2';
import { element } from 'protractor';

declare function init_plugins();
declare const gapi: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  recuerdame: boolean = false;
  auth2: any;

  constructor(public router: Router, private usuarioService: UsuarioService) {}

  ngOnInit() {
    init_plugins();
    this.googleInit();

    this.email = localStorage.getItem('email') || '';
    if (this.email !== '') {
      this.recuerdame = true;
    }
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id:
          '523933149088-p7o3mvrsdd8e6vpmv7hg3fsdqknp2v8d.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignIn(document.getElementById('btnGoogle'));
    });
  }

  attachSignIn(element: any) {
    this.auth2.attachClickHandler(element, {}, googleUser => {
      const token = googleUser.getAuthResponse().id_token;
      this.usuarioService.loginGoogle(token);
    });
  }

  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('token', token);
    localStorage.setItem('_id', id);
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  ingresar(forma: NgForm) {
    if (forma.invalid) {
      return;
    }
    const usuario = new Usuario(null, forma.value.email, forma.value.password);
    this.usuarioService.login(usuario, this.recuerdame);
  }
}
