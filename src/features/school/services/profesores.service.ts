import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProfesorDto } from '../dtos/profesor.dto';
import { CrearProfesorDto } from '../dtos/creat-profesor.dto';

@Injectable({
  providedIn: 'root',
})
export class ProfesoresService {
  private readonly _baseUri: string = 'https://localhost:7197/api';
  constructor(private readonly _http: HttpClient) {}
  getAll(): Observable<ProfesorDto[]> {
    const uri: string = `${this._baseUri}/Profesor`;
    return this._http.get<ProfesorDto[]>(uri);
  }

  getById(id: number): Observable<ProfesorDto> {
    const uri: string = `${this._baseUri}/Profesor/${id}`;
    return this._http.get<ProfesorDto>(uri);
  }

  update(dto: ProfesorDto): Observable<ProfesorDto> {
    const uri: string = `${this._baseUri}/Profesor`;
    return this._http.put<ProfesorDto>(uri, dto);
  }

  create(dto: CrearProfesorDto): Observable<ProfesorDto> {
    const uri: string = `${this._baseUri}/Profesor`;
    return this._http.post<ProfesorDto>(uri, dto);
  }

  delete(id: number): Observable<boolean> {
    const uri: string = `${this._baseUri}/Profesor/${id}`;
    return this._http.delete<boolean>(uri);
  }
}
