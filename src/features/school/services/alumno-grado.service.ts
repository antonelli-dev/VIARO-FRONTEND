import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlumnoGradoDto } from '../dtos/alumno-grado.dto';
import { Observable } from 'rxjs';
import { CrearAlumnoGradoDto } from '../dtos/crear-alumno-grado.dto';

@Injectable({
  providedIn: 'root'
})
export class AlumnoGradoService {
  private readonly _baseUri: string = 'https://localhost:7197/api';

  constructor(private readonly _http: HttpClient) {}

  getAll(): Observable<AlumnoGradoDto[]> {
    const uri: string = `${this._baseUri}/AlumnoGrado`;
    return this._http.get<AlumnoGradoDto[]>(uri);
  }

  getById(id: number): Observable<AlumnoGradoDto> {
    const uri: string = `${this._baseUri}/AlumnoGrado/${id}`;
    return this._http.get<AlumnoGradoDto>(uri);
  }

  update(dto: AlumnoGradoDto): Observable<AlumnoGradoDto> {
    const uri: string = `${this._baseUri}/AlumnoGrado`;
    return this._http.put<AlumnoGradoDto>(uri, dto);
  }

  create(dto: CrearAlumnoGradoDto): Observable<AlumnoGradoDto> {
    const uri: string = `${this._baseUri}/AlumnoGrado`;
    return this._http.post<AlumnoGradoDto>(uri, dto);
  }

  delete(id: number): Observable<boolean> {
    const uri: string = `${this._baseUri}/AlumnoGrado/${id}`;
    return this._http.delete<boolean>(uri);
  }

}
