import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { DxButtonModule, DxDataGridComponent, DxDataGridModule } from 'devextreme-angular';
import { AlertsService } from '../../../../core/services/alerts.service';
import { GradoDto } from '../../dtos/grado.dto';
import { of, Observable } from 'rxjs';
import { GradosService } from '../../services/grados.service';
import { ProfesorDto } from '../../dtos/profesor.dto';
import { ProfesoresService } from '../../services/profesores.service';

@Component({
  selector: 'app-grados-listado',
  imports: [CommonModule, DxDataGridModule, DxButtonModule],
  providers: [AlertsService],
  templateUrl: './grados-listado.component.html',
  styleUrl: './grados-listado.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GradosListadoComponent implements OnInit{

  grados$: Observable<GradoDto[]> = of([]);
  profesores$: Observable<ProfesorDto[]> = of([]);

  @ViewChild("dxGrados") dgGrados!: DxDataGridComponent;


  constructor(
    private readonly _alertsService: AlertsService,
    private readonly _gradosService: GradosService,
    private readonly _profesorService: ProfesoresService,
    private readonly cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.cargarGrados();
    this.cargarProfesores();
  }

  cargarGrados() {
    this._alertsService.SwalLoading('Información', 'Estamos cargando la información, por favor espere.');
    this.grados$ = this._gradosService.getAll(); 
    this._alertsService.SwalClose();
  }

  cargarProfesores() {
    this.profesores$ = this._profesorService.getAll(); 
  }

  async onDeleting(e: any) {
    e.cancel = true;
    this._alertsService.SwalQuestion('Información', '¿Estás seguro de eliminar este registro? Esta acción es irreversible.', () => {

      this._alertsService.SwalLoading('Información', 'Estamos procesando la solicitud . . .');
      const dto: GradoDto = e.data as GradoDto;
      
      this._gradosService.delete(dto.id).subscribe({
        next: (res: any) => {
          this.dgGrados.instance.cancelEditData();
          this.cargarGrados();
          this.cdr.markForCheck();
          this._alertsService.SwalSuccess('Información', 'Se ha eliminado el registro.');
        },
        error: (err: any) => {
          this.dgGrados.instance.cancelEditData();
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
      const dto: GradoDto = { ...e.oldData, ...e.newData };
      
      this._gradosService.update(dto).subscribe({
        next: (res: any) => {
          this.dgGrados.instance.cancelEditData();
          this.cargarGrados();
          this.cdr.markForCheck();
          this._alertsService.SwalSuccess('Información', 'Se ha eliminado el registro.');
        },
        error: (err: any) => {
          this.dgGrados.instance.cancelEditData();
          this.cargarGrados();
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
      const dto: GradoDto = e.data as GradoDto;
      this._gradosService.create(dto).subscribe({
        next: (res: any) => {
          this.dgGrados.instance.cancelEditData();
          this.cargarGrados();
          this.cdr.markForCheck();
          this._alertsService.SwalSuccess('Información', 'Se ha creado el registro.');
        },
        error: (err: any) => {
          this.dgGrados.instance.cancelEditData();
          this._alertsService.SwalError('Información', 'Se ha producido un error al intentar crear el registro.');
        }
      }
      );
      
    });
  }

}
