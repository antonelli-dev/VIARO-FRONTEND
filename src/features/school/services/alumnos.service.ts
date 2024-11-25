import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlumnoDto } from '../dtos/alumno.dto';
import { Observable } from 'rxjs';
import { CrearAlumnoDto } from '../dtos/crear-alumno.dto';

@Injectable({
  providedIn: 'root',
})
export class AlumnosService {
  private readonly _baseUri: string = 'https://localhost:7197/api';

  constructor(private readonly _http: HttpClient) {}

  getAll(): Observable<AlumnoDto[]> {
    const uri: string = `${this._baseUri}/Alumno`;
    return this._http.get<AlumnoDto[]>(uri);
  }

  getById(id: number): Observable<AlumnoDto> {
    const uri: string = `${this._baseUri}/Alumno/${id}`;
    return this._http.get<AlumnoDto>(uri);
  }

  update(dto: AlumnoDto): Observable<AlumnoDto> {
    const uri: string = `${this._baseUri}/Alumno`;
    return this._http.put<AlumnoDto>(uri, dto);
  }

  create(dto: CrearAlumnoDto): Observable<AlumnoDto> {
    const uri: string = `${this._baseUri}/Alumno`;
    return this._http.post<AlumnoDto>(uri, dto);
  }

  delete(id: number): Observable<boolean> {
    const uri: string = `${this._baseUri}/Alumno/${id}`;
    return this._http.delete<boolean>(uri);
  }
}
