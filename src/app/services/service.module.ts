import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService } from './settings/settings.service';
import { SidebarService } from './shared/sidebar.service';
import { SharedService } from './shared/shared.service';
import { UsuarioService } from './usuario/usuario.service';
import { LoginGuardGuard } from './guards/login-guard.guard';
import { SubirArchivoService } from './subir-archivo/subir-archivo.service';
import { ModalUploadService } from '../componentes/modal-upload/modal-upload.service';
import { HospitalService } from './hospital/hospital.service';
import { MedicoService } from './medico/medico.service';
import { AdminGuard } from './guards/admin.guard';
import { VerificaTokenGuard } from './guards/verifica-token.guard';

@NgModule({
    declarations: [],
    imports: [CommonModule],
    providers: [
        SettingsService,
        SidebarService,
        SharedService,
        UsuarioService,
        HospitalService,
        MedicoService,
        SubirArchivoService,
        LoginGuardGuard,
        AdminGuard,
        ModalUploadService,
        VerificaTokenGuard
    ]
})
export class ServiceModule {}
