import { Routes } from '@angular/router';
import { MainLayoutComponent } from '../core/layout/MainLayout/MainLayout.component';
import { AlumnosListadoComponent } from '../features/school/views/alumnos-listado/alumnos-listado.component';
import { ProfesoresListadoComponent } from '../features/school/views/profesores-listado/profesores-listado.component';
import { GradosListadoComponent } from '../features/school/views/grados-listado/grados-listado.component';
import { AlumnogradoListadoComponent } from '../features/school/views/alumnogrado-listado/alumnogrado-listado.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'alumnos',
        component: AlumnosListadoComponent,
      },
      {
        path: 'profesores',
        component: ProfesoresListadoComponent,
      },
      {
        path: 'grados',
        component: GradosListadoComponent,
      }, {
        path: 'alumnogrado',
        component: AlumnogradoListadoComponent,
      },
    ],
  },
];
