import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  baseUrl = 'http://localhost:5177';

  constructor(private _http: HttpClient) { }

  getCategorias() {
    return this._http.get<any>(`${this.baseUrl}/categorias`).pipe(
      map((response: any) => {
        return response;
      }));
  }
}
