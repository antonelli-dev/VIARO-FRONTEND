import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GradoDto } from '../dtos/grado.dto';
import { CrearGradoDto } from '../dtos/crear-grado.dto';

@Injectable({
  providedIn: 'root'
})
export class GradosService {
  private readonly _baseUri: string = 'https://localhost:7197/api';
  constructor(private readonly _http: HttpClient) { }
  getAll(): Observable<GradoDto[]> {
    const uri: string = `${this._baseUri}/Grado`;
    return this._http.get<GradoDto[]>(uri);
  }

  getById(id: number): Observable<GradoDto> {
    const uri: string = `${this._baseUri}/Grado/${id}`;
    return this._http.get<GradoDto>(uri);
  }

  update(dto: GradoDto): Observable<GradoDto> {
    const uri: string = `${this._baseUri}/Grado`;
    return this._http.put<GradoDto>(uri, dto);
  }

  create(dto: CrearGradoDto): Observable<GradoDto> {
    const uri: string = `${this._baseUri}/Grado`;
    return this._http.post<GradoDto>(uri, dto);
  }

  delete(id: number): Observable<boolean> {
    const uri: string = `${this._baseUri}/Grados/${id}`;
    return this._http.delete<boolean>(uri);
  }
}
