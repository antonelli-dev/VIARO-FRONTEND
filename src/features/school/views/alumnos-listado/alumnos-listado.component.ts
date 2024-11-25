import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent, DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxButtonModule } from 'devextreme-angular';
import { AlertsService } from '../../../../core/services/alerts.service';
import { AlumnosService } from '../../services/alumnos.service';
import { AlumnoDto } from '../../dtos/alumno.dto';
import { GeneroDto } from '../../../../core/dto/genero.dto';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-alumnos-listado',
  imports: [
    CommonModule,
    DxDataGridModule,
    DxButtonModule,
    
  ],
  providers: [AlertsService],
  templateUrl: './alumnos-listado.component.html',
  styleUrl: './alumnos-listado.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlumnosListadoComponent implements OnInit {

  alumnos$: Observable<AlumnoDto[]> = of([]);
  generos: GeneroDto[] = [
    {
      nombre: 'Masculino',
      abreviacion: 'M'
    },
    {
      nombre: 'Femenino',
      abreviacion: 'F'
    }
  ];
  @ViewChild("dxAlumnos") dgAlumnos!: DxDataGridComponent;

  constructor(
    private readonly _alertsService: AlertsService,
    private readonly _alumnosService: AlumnosService,
    private readonly cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.cargarAlumnos();
  }

  cargarAlumnos() {
    this._alertsService.SwalLoading('Información', 'Estamos cargando la información, por favor espere.');
    this.alumnos$ = this._alumnosService.getAll(); 
    this._alertsService.SwalClose();
  }

  async onDeleting(e: any) {
    e.cancel = true;
    this._alertsService.SwalQuestion('Información', '¿Estás seguro de eliminar este registro? Esta acción es irreversible.', () => {

      this._alertsService.SwalLoading('Información', 'Estamos procesando la solicitud . . .');
      const dto: AlumnoDto = e.data as AlumnoDto;
      
      this._alumnosService.delete(dto.id).subscribe({
        next: (res: any) => {
          this.dgAlumnos.instance.cancelEditData();
          this.cargarAlumnos();
          this.cdr.markForCheck();
          this._alertsService.SwalSuccess('Información', 'Se ha eliminado el registro.');
        },
        error: (err: any) => {
          this.dgAlumnos.instance.cancelEditData();
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
      const dto: AlumnoDto = { ...e.oldData, ...e.newData };
      
      this._alumnosService.update(dto).subscribe({
        next: (res: any) => {
          this.dgAlumnos.instance.cancelEditData();
          this.cargarAlumnos();
          this.cdr.markForCheck();
          this._alertsService.SwalSuccess('Información', 'Se ha eliminado el registro.');
        },
        error: (err: any) => {
          this.dgAlumnos.instance.cancelEditData();
          this.cargarAlumnos();
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
      const dto: AlumnoDto = e.data as AlumnoDto;
      this._alumnosService.create(dto).subscribe({
        next: (res: any) => {
          this.dgAlumnos.instance.cancelEditData();
          this.cargarAlumnos();
          this.cdr.markForCheck();
          this._alertsService.SwalSuccess('Información', 'Se ha creado el registro.');
        },
        error: (err: any) => {
          this.dgAlumnos.instance.cancelEditData();
          this._alertsService.SwalError('Información', 'Se ha producido un error al intentar crear el registro.');
        }
      }
      );
      
    });
  }
}
