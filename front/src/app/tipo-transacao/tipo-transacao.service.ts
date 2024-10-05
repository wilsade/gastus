import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  getEmptyTipoTransacao(): ITipoTransacao {
    return { Id: 0, Nome: '' }
  }

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

  inserirTipoTransacao(nome: string): Observable<ITipoTransacao> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const body = {
      Nome: nome
    };

    return this._http.post<ITipoTransacao>(this.tiposTransacaoUrl, body, { headers });
  }

  excluirTipoTransacao(id: number): Observable<number> {
    return this._http.delete<number>(`${this.tiposTransacaoUrl}/${id}`);
  }

  getTipoTransacaoById(id: number): Observable<ITipoTransacao> {
    return this._http.get<any>(`${this.tiposTransacaoUrl}/${id}`).pipe(
      map((response: any) => {
        return response;
      }));
  }

  editarTipoTransacao(tipoTransacao: ITipoTransacao): Observable<number> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this._http.put<any>(this.tiposTransacaoUrl, tipoTransacao, { headers });
  }


}
