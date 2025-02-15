import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ComboCategoria, ICategoria, ISubCategoria } from '../_models/ICategoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  categoriasUrl = `${environment.apiUrl}/categorias`;
  subCategoriasUrl = `${environment.apiUrl}/SubCategorias`;

  constructor(private readonly _http: HttpClient) { }

  getEmptyCategoria(): ICategoria {
    return {
      Id: 0, Nome: '', IndicaReceita: false, SaiNoRelatorio: true, SubCategorias: []
    }
  }

  getCategorias(loadSubs: boolean = false, orderByNome: boolean = false): Observable<ICategoria[]> {
    const url = `${this.categoriasUrl}?loadSubs=${loadSubs}&orderByName=${orderByNome}`;
    return this._http.get<any>(url).pipe(
      map((response: any) => {
        return response;
      }));
  }

  getComboCategorias(): Observable<ComboCategoria[]> {
    return this.getCategorias(true).pipe(
      map((categorias: ICategoria[]) => {
        return categorias.map(categoria => new ComboCategoria(categoria));
      })
    );
  }

  getCategoriaById(id: number): Observable<ICategoria> {
    return this._http.get<any>(`${this.categoriasUrl}/${id}`).pipe(
      map((response: any) => {
        return response;
      }));
  }

  inserirCategoria(nome: string): Observable<ICategoria> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const body = {
      Nome: nome
    };

    return this._http.post<ICategoria>(this.categoriasUrl, body, { headers });
  }

  editarCategoria(categoria: ICategoria): Observable<number> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const body = {
      Id: categoria.Id,
      Nome: categoria.Nome,
      IndicaReceita: categoria.IndicaReceita,
      SaiNoRelatorio: categoria.SaiNoRelatorio
    };

    return this._http.put<number>(this.categoriasUrl, body, { headers });
  }

  excluirCategoria(id: number): Observable<number> {
    return this._http.delete<number>(`${this.categoriasUrl}/${id}`);
  }

  inserirSubCategoria(idCategoria: number, nomeSubCategoria: string): Observable<ISubCategoria> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const body = {
      idCategoria,
      nome: nomeSubCategoria
    };
    return this._http.post<ISubCategoria>(this.subCategoriasUrl, body, { headers });
  }

  editarSubCategoria(subcategoria: ISubCategoria): Observable<number> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this._http.put<any>(this.subCategoriasUrl, subcategoria, { headers });
  }

  excluirSubCategoria(idCategoria: number, id: number): Observable<any> {
    return this._http.delete<any>(`${this.subCategoriasUrl}/${idCategoria}/${id}`);
  }
}
