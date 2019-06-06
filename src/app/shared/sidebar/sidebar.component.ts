import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/shared/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {
  usuario: Usuario;

  constructor(
    public sidebarService: SidebarService,
    public usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    this.usuario = this.usuarioService.usuario;
  }
}
