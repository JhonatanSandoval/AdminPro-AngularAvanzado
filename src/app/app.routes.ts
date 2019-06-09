import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotfoundpageComponent } from './notfoundpage/notfoundpage.component';
import { RegisterComponent } from './register/register.component';
import { LoginGuardGuard } from './services/guards/login-guard.guard';
import { PagesComponent } from './pages/pages.component';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {
        path: '',
        canActivate: [LoginGuardGuard],
        component: PagesComponent,
        loadChildren: './pages/pages.module#PagesModule' // LazyLoad
    },
    { path: '**', component: NotfoundpageComponent }
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes, { useHash: true });
