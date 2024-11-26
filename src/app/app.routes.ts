import { Routes } from '@angular/router';
import { ContainerComponent } from './container/container.component';
import { ScanerComponent } from './scaner/scaner.component';
import { ReporteFacultadComponent } from './reporte-facultad/reporte-facultad.component';
import { ReporteGeneralComponent } from './reporte-general/reporte-general.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './guard/auth.guard';
import { NotFoundComponent } from './not-found/not-found.component';


export const routes: Routes = [
    {path: '', component: LoginComponent },
    { path: 'home', component: ContainerComponent,
      canActivate:[authGuard],
        children: [
            {
                path: 'scaner',
                providers:[], //CiudadanoService
                component: ScanerComponent, 
              },
              {
                path: 'facultad',
                providers:[], //CiudadanoService
                component: ReporteFacultadComponent, 
              },
              {
                path: 'general',
                providers:[], //CiudadanoService
                component: ReporteGeneralComponent, 
              }
         ]},
         { path: '**', component: NotFoundComponent }
];
