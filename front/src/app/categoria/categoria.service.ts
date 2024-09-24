import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ICategoria } from '../_models/ICategoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  categoriasUrl = `${environment.apiUrl}/categorias`;

  constructor(private _http: HttpClient) { }

  getEmptyCategoria(): ICategoria {
    return {
      Id: 0, Nome: ''
    }
  }

  getCategorias(): Observable<ICategoria[]> {
    return this._http.get<any>(this.categoriasUrl).pipe(
      map((response: any) => {
        return response;
      }));
  }
}
