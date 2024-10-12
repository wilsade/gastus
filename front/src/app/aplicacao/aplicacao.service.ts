import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map, Observable } from 'rxjs';
import { IAplicacao } from '../_models/IAplicacao';

@Injectable({
  providedIn: 'root'
})
export class AplicacaoService {

  aplicacaoUrl = `${environment.apiUrl}/aplicacoes`;

  constructor(private readonly _http: HttpClient) { }

  /**
   * Listar todas as aplicações
   * @returns Aplicações com seus respectivos lançametnos
   */
  getAplicacoes(): Observable<IAplicacao[]> {
    return this._http.get<IAplicacao>(this.aplicacaoUrl).pipe(
      map((response: any) => {
        return response;
      }));
  }

  inserirAplicacao(nome: string): Observable<IAplicacao> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const body = {
      Nome: nome
    };

    return this._http.post<IAplicacao>(this.aplicacaoUrl, body, { headers });
  }

  excluirAplicacao(id: number): Observable<number> {
    return this._http.delete<number>(`${this.aplicacaoUrl}/${id}`);
  }
}
