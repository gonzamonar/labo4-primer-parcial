import { Routes } from '@angular/router';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { AltasRepartidorComponent } from './pages/altas-repartidor/altas-repartidor.component';
import { loggedGuardGuard } from './guards/logged-guard.guard';


export const routes: Routes = [
    {
        path: '',
        component: WelcomeComponent
    },
    {
        path: 'repartidor/alta',
        component: AltasRepartidorComponent,
        canActivate: [loggedGuardGuard]
    }
];
