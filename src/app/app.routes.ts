import { Routes } from '@angular/router';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { AltasRepartidorComponent } from './pages/altas-repartidor/altas-repartidor.component';
import { loggedGuardGuard } from './guards/logged-guard.guard';
import { RepartidorDetalleComponent } from './pages/repartidor-detalle/repartidor-detalle.component';
import { SalenHeladosComponent } from './pages/salen-helados/salen-helados.component';


export const routes: Routes = [
    {
        path: '',
        component: WelcomeComponent
    },
    {
        path: 'repartidor/alta',
        component: AltasRepartidorComponent,
        // canActivate: [loggedGuardGuard]
    },
    {
        path: 'repartidor/detalle',
        component: RepartidorDetalleComponent,
        // canActivate: [loggedGuardGuard]
    },
    {
        path: 'helados',
        component: SalenHeladosComponent,
        // canActivate: [adminGuardGuard]
    },
];
