import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ICategoria, ISubCategoria } from '../_models/ICategoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  categoriasUrl = `${environment.apiUrl}/categorias`;
  subCategoriasUrl = `${environment.apiUrl}/SubCategorias`;

  constructor(private _http: HttpClient) { }

  getEmptyCategoria(): ICategoria {
    return {
      Id: 0, Nome: '', SubCategorias: []
    }
  }

  getCategorias(): Observable<ICategoria[]> {
    return this._http.get<any>(this.categoriasUrl).pipe(
      map((response: any) => {
        return response;
      }));
  }

  getCategoriaById(id: number): Observable<ICategoria> {
    return this._http.get<any>(`${this.categoriasUrl}/${id}`).pipe(
      map((response: any) => {
        return response;
      }));
  }

  inserirSubCategoria(idCategoria: number, nomeSubCategoria: string): Observable<ISubCategoria> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const body = {
      idCategoria,
      nome: nomeSubCategoria
    };
    return this._http.post<any>(this.subCategoriasUrl, body, { headers });
  }
}
