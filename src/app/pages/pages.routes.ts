import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard } from '../services/guards/login-guard.guard';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoDetalleComponent } from './medicos/detalle.component';

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuardGuard],
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent,
                data: { titulo: 'Dashboard' }
            },
            {
                path: 'profile',
                component: ProfileComponent,
                data: { titulo: 'Profile ' }
            },
            {
                path: 'progress',
                component: ProgressComponent,
                data: { titulo: 'Progress' }
            },
            {
                path: 'graficas1',
                component: Graficas1Component,
                data: { titulo: 'Gráficas' }
            },
            {
                path: 'promesas',
                component: PromesasComponent,
                data: { titulo: 'Promesas' }
            },
            {
                path: 'rxjs',
                component: RxjsComponent,
                data: { titulo: 'RxJs' }
            },
            {
                path: 'account-settings',
                component: AccountSettingsComponent,
                data: { titulo: 'Ajustes del Tema' }
            },

            // Mantenimientos
            {
                path: 'usuarios',
                component: UsuariosComponent,
                data: { titulo: 'Mantenimiento de Usuarios ' }
            },
            {
                path: 'hospitales',
                component: HospitalesComponent,
                data: { titulo: 'Mantenimiento de Hospitales ' }
            },
            {
                path: 'medicos',
                component: MedicosComponent,
                data: { titulo: 'Mantenimiento de Médicos ' }
            },
            {
                path: 'medico/:id',
                component: MedicoDetalleComponent,
                data: { titulo: 'Detalle del Médico ' }
            },

            { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
