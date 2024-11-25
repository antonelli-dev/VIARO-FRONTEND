import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent, DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxButtonModule } from 'devextreme-angular';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { ProfesorDto } from '../../dtos/profesor.dto';
import { GeneroDto } from '../../../../core/dto/genero.dto';
import { ProfesoresService } from '../../services/profesores.service';
import { AlertsService } from '../../../../core/services/alerts.service';

@Component({
  selector: 'app-profesores-listado',
  imports: [
    CommonModule,
    DxDataGridModule,
    DxButtonModule,
  ],
  templateUrl: './profesores-listado.component.html',
  styleUrl: './profesores-listado.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfesoresListadoComponent implements OnInit {

  
  profesores$: Observable<ProfesorDto[]> = of([]);
  generos$: GeneroDto[] = [
    {
      nombre: 'Masculino',
      abreviacion: 'M'
    },
    {
      nombre: 'Femenino',
      abreviacion: 'F'
    }
  ];
  @ViewChild("dxProfesores") dgProfesores!: DxDataGridComponent;

  constructor(
    private readonly _alertsService: AlertsService,
    private readonly _profesoresService: ProfesoresService,
    private readonly cdr: ChangeDetectorRef,

  ) {}

  ngOnInit(): void {
    this.cargarProfesores();
  }

  cargarProfesores() {
    this._alertsService.SwalLoading('Información', 'Estamos cargando la información, por favor espere.');
    this.profesores$ = this._profesoresService.getAll(); 
    this._alertsService.SwalClose();
  }
  async onDeleting(e: any) {
    e.cancel = true;
    this._alertsService.SwalQuestion('Información', '¿Estás seguro de eliminar este registro? Esta acción es irreversible.', () => {

      this._alertsService.SwalLoading('Información', 'Estamos procesando la solicitud . . .');
      const dto: ProfesorDto = e.data as ProfesorDto;
      
      this._profesoresService.delete(dto.id).subscribe({
        next: (res: any) => {
          this.dgProfesores.instance.cancelEditData();
          this.cargarProfesores();
          this.cdr.markForCheck();
          this._alertsService.SwalSuccess('Información', 'Se ha eliminado el registro.');
        },
        error: (err: any) => {
          this.dgProfesores.instance.cancelEditData();
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
      const dto: ProfesorDto = { ...e.oldData, ...e.newData };
      
      this._profesoresService.update(dto).subscribe({
        next: (res: any) => {
          this.dgProfesores.instance.cancelEditData();
          this.cargarProfesores();
          this.cdr.markForCheck();
          this._alertsService.SwalSuccess('Información', 'Se ha eliminado el registro.');
        },
        error: (err: any) => {
          this.dgProfesores.instance.cancelEditData();
          this.cargarProfesores();
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
      const dto: ProfesorDto = e.data as ProfesorDto;
      this._profesoresService.create(dto).subscribe({
        next: (res: any) => {
          this.dgProfesores.instance.cancelEditData();
          this.cargarProfesores();
          this.cdr.markForCheck();
          this._alertsService.SwalSuccess('Información', 'Se ha creado el registro.');
        },
        error: (err: any) => {
          this.dgProfesores.instance.cancelEditData();
          this._alertsService.SwalError('Información', 'Se ha producido un error al intentar crear el registro.');
        }
      }
      );
      
    });
  }

 }
