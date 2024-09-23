import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  categoriasUrl = `${environment.apiUrl}/categorias` ;

  constructor(private _http: HttpClient) { }

  getCategorias() {
    return this._http.get<any>(this.categoriasUrl).pipe(
      map((response: any) => {
        return response;
      }));
  }
}
