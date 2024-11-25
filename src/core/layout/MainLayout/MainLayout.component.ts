import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  imports: [
    RouterOutlet,
    CommonModule,
    RouterModule
  ],
  templateUrl: './MainLayout.component.html',
  styleUrl: './MainLayout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent { 
  isOpen = true;

  menuItems = [
    { label: 'Alumnos', link: '/alumnos' },
    { label: 'Profesores', link: '/profesores' },
    { label: 'Grados', link: '/grados' },
    {label:'Alumno-grado', link:'/alumnogrado'},
];

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }
}
