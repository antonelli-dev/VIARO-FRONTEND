import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { DxDataGridModule, DxButtonModule, DxDataGridComponent } from 'devextreme-angular';
import { AlertsService } from '../../../../core/services/alerts.service';
import { Observable, of } from 'rxjs';
import { AlumnoGradoDto } from '../../dtos/alumno-grado.dto';
import { AlumnoDto } from '../../dtos/alumno.dto';
import { GradoDto } from '../../dtos/grado.dto';
import { GradosService } from '../../services/grados.service';
import { AlumnosService } from '../../services/alumnos.service';
import { AlumnoGradoService } from '../../services/alumno-grado.service';

@Component({
  selector: 'app-alumnogrado-listado', 
   imports: [CommonModule, DxDataGridModule, DxButtonModule],
   providers: [AlertsService],
  templateUrl: './alumnogrado-listado.component.html',
  styleUrl: './alumnogrado-listado.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlumnogradoListadoComponent implements OnInit{
alumnoGrado$: Observable<AlumnoGradoDto[]> = of([]);
alumnos$: Observable<AlumnoDto[]> = of([]);
grados$: Observable<GradoDto[]> = of([]);

@ViewChild("dxAlumnoGrado") dgAlumnoGrado! : DxDataGridComponent;

constructor(
  private readonly _alertsService: AlertsService,
  private readonly _gradosService: GradosService,
  private readonly _alumnosService: AlumnosService,
  private readonly _alumnoGradosService: AlumnoGradoService,
  private readonly cdr: ChangeDetectorRef
){}

ngOnInit(): void {
    this.cargarAlumnoGrado();
    this.cargarAlumnos();
    this.cargarGrados();
}


cargarAlumnos() {
  this.alumnos$ = this._alumnosService.getAll(); 
}


cargarGrados() {
  this.grados$ = this._gradosService.getAll(); 
}

cargarAlumnoGrado(){
this.alumnoGrado$ = this._alumnoGradosService.getAll();
}


async onDeleting(e: any) {
  e.cancel = true;
  this._alertsService.SwalQuestion('Información', '¿Estás seguro de eliminar este registro? Esta acción es irreversible.', () => {

    this._alertsService.SwalLoading('Información', 'Estamos procesando la solicitud . . .');
    const dto: AlumnoGradoDto = e.data as AlumnoGradoDto;
    
    this._alumnoGradosService.delete(dto.id).subscribe({
      next: (res: any) => {
        this.dgAlumnoGrado.instance.cancelEditData();
        this.cargarAlumnoGrado();
        this.cdr.markForCheck();
        this._alertsService.SwalSuccess('Información', 'Se ha eliminado el registro.');
      },
      error: (err: any) => {
        this.dgAlumnoGrado.instance.cancelEditData();
        this._alertsService.SwalError('Información', 'Se ha producido un error al intentar eliminar el registro.');
      }
    }
    );
    
  });
}


async onUpdating(e: any) {
  e.cancel = true;
  this._alertsService.SwalQuestion('Información', '¿Estás seguro de actualizar este registro?', () => {

    this._alertsService.SwalLoading('Información', 'Estamos procesando la solicitud . . .');
    const dto: AlumnoGradoDto = { ...e.oldData, ...e.newData };
    
    this._alumnoGradosService.update(dto).subscribe({
      next: (res: any) => {
        this.dgAlumnoGrado.instance.cancelEditData();
        this.cargarAlumnoGrado();
        this.cdr.markForCheck();
        this._alertsService.SwalSuccess('Información', 'Se ha eliminado el registro.');
      },
      error: (err: any) => {
        this.dgAlumnoGrado.instance.cancelEditData();
        this.cargarAlumnoGrado();
        this.cdr.markForCheck();
        this._alertsService.SwalError('Información', 'Se ha producido un error al intentar eliminar el registro.');
      }
    }
    );
    
  });
}


async onInserting(e: any) {
  e.cancel = true;
  this._alertsService.SwalQuestion('Información', '¿Estás seguro de crear un nuevo registro?', () => {

    this._alertsService.SwalLoading('Información', 'Estamos procesando la solicitud . . .');
    const dto: AlumnoGradoDto = e.data as AlumnoGradoDto;
    this._alumnoGradosService.create(dto).subscribe({
      next: (res: any) => {
        this.dgAlumnoGrado.instance.cancelEditData();
        this.cargarAlumnoGrado();
        this.cdr.markForCheck();
        this._alertsService.SwalSuccess('Información', 'Se ha creado el registro.');
      },
      error: (err: any) => {
        this.dgAlumnoGrado.instance.cancelEditData();
        this._alertsService.SwalError('Información', 'Se ha producido un error al intentar crear el registro.');
      }
    }
    );
    
  });
}

}
