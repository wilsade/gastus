import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map, Observable } from 'rxjs';
import { ITipoTransacao } from '../_models/ITipoTransacao';

@Injectable({
  providedIn: 'root'
})
export class TipoTransacaoService {
  tiposTransacaoUrl = `${environment.apiUrl}/tipostransacao`;

  constructor(private readonly _http: HttpClient) { }

  /**
   * Listar os Tipos de transação
   * @returns Tipos de transação cadastrados
   */
  getTiposTransacao(): Observable<ITipoTransacao[]> {
    return this._http.get<any>(this.tiposTransacaoUrl).pipe(
      map((response: any) => {
        return response;
      }));
  }
}
